import { Request, Session } from "remix";
import { createCookieSessionStorage } from "@remix-run/node";
import { auth, admin, firestore } from "./fire";

let secret;
if (process.env.SESSION_SECRET) {
  secret = process.env.SESSION_SECRET;
} else {
  throw new Error("Must set SESSION_SECRET");
}

/**
 * Utility used for operating on the user session cookie.
 */
export const sessionCookie = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: [secret],
    sameSite: "lax",
    path: "/",
  },
});

/**
 * Verifies the given credentials and creates a new Firebase Session Cookie.
 */
export async function signIn(request: Request) {
  const body = new URLSearchParams(await request.text());
  const session = await sessionCookie.getSession(request.headers.get("cookie"));
  const userCredential = await auth.signInWithEmailAndPassword(
    body.get("email")!,
    body.get("password")!,
  );
  const userToken = await userCredential?.user?.getIdToken();

  if (userToken) {
    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const cookie = await admin
      .auth()
      .createSessionCookie(userToken, { expiresIn });

    if (cookie) {
      // TODO: Should this just be a token instead? I haven't figured out exactly
      //       how to use a firebase cookie with remix.
      session.set("firebaseCookie", cookie);
      return { ok: true, session };
    }

    return { ok: false, session };
  }
  return { ok: false, session };
}

/**
 * Creates a new Firebase user account.
 */
export async function signUp(email: string, password: string) {
  return await admin.auth().createUser({
    email,
    emailVerified: false,
    password,
  });
}

/**
 * Signs a user out by unsetting the token key set in the cookie.
 *
 * TODO: Take a request and handle the getting of the cookie here?
 */
export async function signOut(session: Session) {
  session.unset("firebaseCookie");
}

/**
 * Attempts to get a user session from a given cookie.
 *
 * TODO: Rename this, it's confusing.
 */
async function getUserSession(request: Request) {
  const cookieSession = await sessionCookie.getSession(
    request.headers.get("cookie"),
  );
  const token = cookieSession.get("firebaseCookie");

  if (!token) return null;

  try {
    return await admin.auth().verifySessionCookie(token);
  } catch {
    return null;
  }
}

/**
 * Gets a user account matching any credentials sent with the request.
 */
export async function getUser(request: Request) {
  const userSession = await getUserSession(request);

  if (!userSession) return null;

  const userRef = firestore.collection("users");
  const userDoc = await userRef.doc(userSession.uid).get();

  const user = { uid: userDoc.id, ...userDoc.data() };
  return { userSession, user, userDoc };
}

// TODO: Route Guard. We need a fn that we can wrap the contents of a loader
//       in to ensure that a user is authed etc before they can access.
