import type { MetaFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { firestore } from "../lib/fire";

export let meta: MetaFunction = () => {
  return {
    title: "Rodinia Report",
    description: "Welcome to the Rodinia Report!",
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  const response = await firestore
    .collection("stories")
    .orderBy("createdAt", "desc")
    .get();
  const stories = response.docs.map((doc) => doc.data());

  return { stories };
};

export default function Index() {
  let { stories } = useRouteData();

  return (
    <ul>
      {stories?.map((story: any) => (
        <li key={story.title}>
          <a href={story.sourceUrl}>{story.title}</a>
          {story.soucePaywalled && <span>Paywall</span>}
        </li>
      ))}
    </ul>
  );
}
