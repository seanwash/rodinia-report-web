import express, { json, Request, Response } from "express";
import path from "path";
import compression from "compression";
import morgan from "morgan";
import ogScraper from "open-graph-scraper";
import { createRequestHandler } from "@remix-run/express";

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), "server/build");
const LOG_FORMAT = MODE === "production" ? "combined" : "dev";

const app = express();
app.use(compression());
// @ts-ignore
app.use(json());
// TODO: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/50076
// @ts-ignore
app.use(morgan<Request, Response>(LOG_FORMAT));

// You may want to be more aggressive with this caching
app.use(express.static("public", { maxAge: "1h" }));

// Remix fingerprints its assets so we can cache forever
app.use(express.static("public/build", { immutable: true, maxAge: "1y" }));

app.post("/api/stories/metadata", async (req: Request, resp: Response) => {
  const { url } = req.body;
  if (!url) return resp.sendStatus(400);

  try {
    const { result } = await ogScraper({ url });
    return resp.json(result);
  } catch (error) {
    resp.status(422);
    return resp.json(error);
  }
});

if (MODE === "production") {
  app.all(
    "*",
    createRequestHandler({
      // eslint-disable-next-line global-require
      build: require("./build"),
      getLoadContext() {
        // Whatever you return here will be passed as `context` to your loaders and actions.
      },
    }),
  );
} else {
  app.all("*", (req, res, next) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in require.cache) {
      if (key.startsWith(BUILD_DIR)) {
        delete require.cache[key];
        if (process.env.DEBUG) console.warn("deleted", key);
      }
    }

    return createRequestHandler({
      // eslint-disable-next-line global-require
      build: require("./build"),
      getLoadContext() {
        // Whatever you return here will be passed as `context` to your loaders and actions.
      },
    })(req, res, next);
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${port}`);
});
