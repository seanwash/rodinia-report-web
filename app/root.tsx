import type { LinksFunction, LoaderFunction } from "remix";
import { Meta, Links, Scripts, LiveReload, useRouteData } from "remix";
import { Link, Outlet } from "react-router-dom";
import { getUser } from "./lib/sessions.server";
import stylesUrl from "./styles/app.css";

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
