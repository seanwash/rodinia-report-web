const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), "server/build");
const LOG_FORMAT = MODE === "production" ? "combined" : "dev";

const app = express();
app.use(compression());
app.use(morgan(LOG_FORMAT));

// You may want to be more aggressive with this caching
app.use(express.static("public", { maxAge: "1h" }));

// Remix fingerprints its assets so we can cache forever
app.use(express.static("public/build", { immutable: true, maxAge: "1y" }));

app.get("/thing", (req, res) => {
  res.json({ ping: "pong" });
});

app.all(
  "*",
  MODE === "production"
    ? // eslint-disable-next-line global-require
      createRequestHandler({ build: require("./build") })
    : (req, res, next) => {
        // eslint-disable-next-line no-use-before-define
        purgeRequireCache();
        // eslint-disable-next-line global-require
        const build = require("./build");
        return createRequestHandler({ build, mode: MODE })(req, res, next);
      },
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${port}`);
});

/// /////////////////////////////////////////////////////////////////////////////
function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, we prefer the DX of this though, so we've included it
  // for you by default
  // eslint-disable-next-line no-restricted-syntax
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
