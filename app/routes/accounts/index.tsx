import React from "react";
import { ActionFunction, redirect } from "remix";
import { signUp } from "../../lib/sessions.server";
import Button from "../../components/Button";

// TODO: In loader, check for user existence. If user, redirect.

export const action: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());
  await signUp(body.get("email")!, body.get("password")!);

  return redirect("/");
};

export default function () {
  return (
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
        />
      </div>
      <div>
        <Button type="submit">Sign Up</Button>
      </div>
    </form>
  );
}
