interface Env {
  FORMSUBMIT_HASH: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const formData = await context.request.formData();

  const response = await fetch(
    `https://formsubmit.co/ajax/${context.env.FORMSUBMIT_HASH}`,
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
};
