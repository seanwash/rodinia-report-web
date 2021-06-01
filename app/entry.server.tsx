import ReactDOMServer from "react-dom/server";
import type { EntryContext } from "remix";
import { RemixServer } from "remix";
import * as Sentry from "@sentry/node";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const markup = ReactDOMServer.renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  );

  return new Response(`<!DOCTYPE html> ${markup}`, {
    status: responseStatusCode,
    headers: {
      ...Object.fromEntries(responseHeaders),
      "Content-Type": "text/html",
    },
  });
}
