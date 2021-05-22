import ReactDOM from "react-dom";
import { RemixBrowser } from "remix";
import * as Sentry from "@sentry/react";

Sentry.init({
  // @ts-ignore
  dsn: window.env.SENTRY_DSN,
});

ReactDOM.hydrate(<RemixBrowser />, document);
