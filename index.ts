import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = { message: "So good to be alive!" };
  return;
});

router.post("/webhook", async (ctx) => {
  console.log("POST to /webhook", ctx.request.headers);
  const body = ctx.request.body();

  if (body.type === "form-data") {
    const value = body.value;
    const formData = await value.read();

    console.log("reading FormData", formData);

    formData?.files?.forEach((file) => {
      console.log(file.filename, file.contentType);
    });
  } else {
    console.log("body type is not form data", body.type);
  }

  ctx.response.body = { message: "OK" };

  return;
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", () => console.log("Up and running!"));

await app.listen({ port: 8080 });
