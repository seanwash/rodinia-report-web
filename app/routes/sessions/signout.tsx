import type { LoaderFunction } from "remix";
import { redirect } from "remix";
import { commitSession, getSession, signOut } from "../../lib/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  await signOut(session);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function SignOut() {
  return <div>Signing Out...</div>;
}
