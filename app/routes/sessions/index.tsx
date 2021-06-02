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
  signIn,
} from "../../lib/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (user) return redirect("/");

  const session = await getSession(request);

  return json(
    { success: session.get("success"), error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const session = await signIn(request);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (err) {
    const session = await getSession(request);
    session.flash("error", "Error: Invalid username or password.");

    return redirect("/sessions", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

interface SignInParams {
  success?: string;
  error?: string;
}

export default function SignIn() {
  const { error, success } = useRouteData<SignInParams>();

  return (
    <>
      <h2 className="text-2xl leading-7 mb-4">Sign In</h2>

      {success && (
        <div className="p-3 bg-green-700 text-white rounded-sm shadow-sm mb-4">
          {success}
        </div>
      )}

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
      </form>
    </>
  );
}
