import React from "react";
import type { LoaderFunction } from "remix";
import { sessionCookie, signOut } from "../../lib/sessions.server";
import { redirect } from "remix";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await sessionCookie.getSession(request.headers.get("cookie"));
  await signOut(session);

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionCookie.commitSession(session),
    },
  });
};

export default function () {
  return <div>Signing Out...</div>;
}
