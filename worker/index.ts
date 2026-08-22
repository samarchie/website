export interface Env {
  ASSETS: Fetcher;
  FORMSUBMIT_HASH: string;
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
  const formData = await request.formData();

  const response = await fetch(
    `https://formsubmit.co/ajax/${env.FORMSUBMIT_HASH}`,
    {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    },
  );

  return new Response(await response.text(), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}