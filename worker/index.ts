const ALLOWED_ORIGIN = "https://samarchie.dev";
const TURNSTILE_ACTION = "contact";

export interface Env {
  ASSETS: Fetcher;
  STATICFORMS_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/contact" && request.method === "POST") {
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

async function handleContact(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin");
  const selfOrigin = new URL(request.url).origin;
  if (origin !== ALLOWED_ORIGIN && origin !== selfOrigin && !origin?.startsWith("http://localhost:")) {
    return forbidden();
  }

  const formData = await request.formData();

  const turnstileToken = formData.get("cf-turnstile-response");
  if (typeof turnstileToken !== "string" || !(await verifyTurnstile(turnstileToken, request, env))) {
    return forbidden();
  }
  formData.delete("cf-turnstile-response");

  formData.set("apiKey", env.STATICFORMS_API_KEY);

  const response = await fetch("https://api.staticforms.dev/submit", {
    method: "POST",
    headers: { Accept: "application/json", Origin: new URL(request.url).origin },
    body: formData,
  });

  return new Response(await response.text(), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}

function forbidden(): Response {
  return new Response(JSON.stringify({ success: false, message: "Forbidden" }), {
    status: 403,
    headers: { "Content-Type": "application/json" },
  });
}

async function verifyTurnstile(token: string, request: Request, env: Env): Promise<boolean> {
  const expectedHostnames = new Set([
    new URL(ALLOWED_ORIGIN).hostname,
    new URL(request.url).hostname,
    "localhost",
    "127.0.0.1",
  ]);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: request.headers.get("CF-Connecting-IP") ?? "",
      }),
    });
    if (!response.ok) return false;

    const result: { success: boolean; action?: string; hostname?: string } = await response.json();
    return result.success && result.action === TURNSTILE_ACTION && expectedHostnames.has(result.hostname ?? "");
  } catch {
    return false;
  }
}