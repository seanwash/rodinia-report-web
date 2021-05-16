import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { Link } from "react-router-dom";
import { firestore } from "../lib/fire";

import stylesUrl from "../styles/index.css";
import { getUser } from "../lib/sessions.server";

export let meta: MetaFunction = () => {
  return {
    title: "Rodinia Report",
    description: "Welcome to the Rodinia Report!",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  const response = await firestore
    .collection("stories")
    .orderBy("createdAt", "desc")
    .get();
  const stories = response.docs.map((doc) => doc.data());

  return { stories, user };
};

export default function Index() {
  const data = useRouteData();
  let { stories } = useRouteData();

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>Welcome to Rodinia</h2>

      {data.user ? (
        <div className="mt-4">
          {data.user?.user.uid} <a href="/sessions/signout">Sign Out</a>
        </div>
      ) : (
        <div className="mt-4">
          <a href="/accounts">Sign Up</a> / <a href="/sessions">Sign In</a>
        </div>
      )}

      <div className="mt-4">
        <Link to="/stories/new">New Story</Link>
      </div>

      <ul>
        {stories?.map((story: any) => (
          <li key={story.title}>
            <a href={story.sourceUrl}>{story.title}</a>
            {story.soucePaywalled && <span>Paywall</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
