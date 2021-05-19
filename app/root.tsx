import type { LinksFunction, LoaderFunction } from "remix";
import { Meta, Links, Scripts, LiveReload, useRouteData } from "remix";
import { Link, Outlet } from "react-router-dom";
import ButtonLink from "./components/ButtonLink/ButtonLink";

import stylesUrl from "./styles/app.css";
import { getUser } from "./lib/sessions.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  // Only keys that should be publicly visible please.
  const env = {
    SENTRY_DSN: process.env.SENTRY_DSN,
  };

  return { user, env };
};

function Document({ children }: { children: React.ReactNode }) {
  const data = useRouteData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <Meta />
        <Links />
      </head>
      <body className="bg-alabaster">
        <div className="container mx-auto p-4">
          <div className="pb-4 border-b border-el-paso flex items-center justify-between">
            <h1 className="font-bold">
              <a href="/">Rodinia</a>
            </h1>

            <nav>
              {data.user ? (
                <a href="/sessions/signout">Sign Out</a>
              ) : (
                <>
                  <Link to="/accounts">Sign Up</Link> /{" "}
                  <Link to="/sessions">Sign In</Link>
                </>
              )}
            </nav>
          </div>
        </div>

        <div className="container mx-auto sm:flex items-center justify-between p-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl leading-7 text-el-paso sm:text-3xl sm:leading-9 max-w-3xl">
              The <span className="font-bold">Rodinia Report</span> is a
              socially curated collection of environmental and conservation
              based news.
            </h2>
          </div>
          <div className="flex mt-4 sm:mt-0 sm:ml-8">
            <span className="shadow-sm rounded-sm">
              <ButtonLink to="/stories/new">Submit Story</ButtonLink>
            </span>
          </div>
        </div>

        <main className="container mx-auto p-4">{children}</main>

        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(data.env)}`,
          }}
        />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
