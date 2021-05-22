import type { LoaderFunction } from "remix";
import { redirect } from "remix";
import { sessionCookie, signOut } from "../../lib/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await sessionCookie.getSession(request.headers.get("cookie"));
  await signOut(session);

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionCookie.commitSession(session),
    },
  });
};

export default function SignOut() {
  return <div>Signing Out...</div>;
}
