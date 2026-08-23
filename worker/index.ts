const ALLOWED_ORIGIN = "https://samarchie.dev";

export interface Env {
  ASSETS: Fetcher;
  STATICFORMS_API_KEY: string;
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
  if (origin !== ALLOWED_ORIGIN && !origin?.startsWith("http://localhost:")) {
    return new Response(JSON.stringify({ success: false, message: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const formData = await request.formData();

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