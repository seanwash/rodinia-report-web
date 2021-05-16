import React from "react";
import { ActionFunction, LoaderFunction, redirect, useRouteData } from "remix";
import { getUser, sessionCookie, signIn } from "../../lib/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  return { user: user?.user };
};

export const action: ActionFunction = async ({ request }) => {
  const { ok, session } = await signIn(request);

  if (ok) {
    return redirect("/", {
      headers: {
        "Set-Cookie": await sessionCookie.commitSession(session),
      },
    });
  } else {
    return redirect("/");
  }
};

export default function () {
  const data = useRouteData();

  return (
    <>
      {data.user && <div>{data.user.uid}</div>}

      <form method="post">
        <div>
          <input
            type="email"
            name="email"
            aria-label="Email Address"
            placeholder="Email Address"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            aria-label="Password"
            placeholder="Password"
            required
            value="secretsecret"
            onChange={() => {}}
          />
        </div>
        <div>
          <input type="submit" value="Sign In" />
        </div>
      </form>
    </>
  );
}
