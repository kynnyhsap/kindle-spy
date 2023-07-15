import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = { message: "So good to be alive!" };
  return;
});

router.post("/webhook", async (ctx) => {
  console.log("POST to /webhook", ctx.request.headers);

  if (ctx.request.hasBody) {
    const result = await ctx.request.body({
      contentTypes: {
        json: ["application/json"],
        form: ["multipart", "urlencoded"],
        text: ["text"],
      },
    });

    console.log(result.type, await result.value);
  } else {
    console.log("no body");
  }

  ctx.response.body = { message: "OK" };

  return;
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", () => console.log("Up and running!"));

await app.listen({ port: 8080 });
