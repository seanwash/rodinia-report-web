import React from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useRouteData,
} from "remix";
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
    <Form method="post" className="space-y-4">
      <div>
        <input
          type="email"
          name="email"
          aria-label="Email Address"
          placeholder="Email Address"
          autoComplete="email"
          required
          className="twc-input"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          aria-label="Password"
          placeholder="Password"
          required
          className="twc-input"
        />
      </div>
      <div>
        <button className="twc-button" type="submit">
          Sign In
        </button>
      </div>
    </Form>
  );
}
