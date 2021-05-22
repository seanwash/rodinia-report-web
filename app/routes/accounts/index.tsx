import { ActionFunction, Form, redirect } from "remix";
import { signUp } from "../../lib/sessions.server";

// TODO: In loader, check for user existence. If user, redirect.

export const action: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());
  await signUp(body.get("email")!, body.get("password")!);

  return redirect("/");
};

export default function SignUp() {
  return (
    <Form method="post" className="space-y-4">
      <div>
        <input
          type="email"
          name="email"
          aria-label="Email Address"
          placeholder="Email Address"
          required
          autoComplete="email"
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
          Sign Up
        </button>
      </div>
    </Form>
  );
}
