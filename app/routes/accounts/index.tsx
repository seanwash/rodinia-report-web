import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
  useRouteData,
} from "remix";
import {
  commitSession,
  getSession,
  getUser,
  signUp,
} from "../../lib/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (user) return redirect("/");

  const session = await getSession(request);

  return json(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const body = new URLSearchParams(await request.text());
    await signUp(body.get("email")!, body.get("password")!);
    const session = await getSession(request);
    session.flash(
      "success",
      "Your account has been created! Please sign in to continue.",
    );

    return redirect("/sessions", {
      headers: {
        "Set-cookie": await commitSession(session),
      },
    });
  } catch (err) {
    const session = await getSession(request);
    session.flash("error", err.toString());

    return redirect("accounts", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

interface SignUpParams {
  error?: string;
}

export default function SignUp() {
  const { error } = useRouteData<SignUpParams>();

  return (
    <>
      <h2 className="text-2xl leading-7 mb-4">Create an Account</h2>

      {error && (
        <div className="p-3 bg-red-600 text-white rounded-sm shadow-sm mb-4">
          {error}
        </div>
      )}

      <form method="post" className="space-y-4">
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
      </form>
    </>
  );
}
