import { ActionFunction, MetaFunction, redirect } from "remix";
import { Link } from "react-router-dom";
import { firestore } from "../../lib/fire";

export let meta: MetaFunction = () => {
  return {
    title: "New Story",
    description: "Share a new story",
  };
};

export const action: ActionFunction = async ({ request }) => {
  const newStoryParams = new URLSearchParams(await request.text());
  const sourcePaywalled = newStoryParams.get("sourcePaywalled") === "on";

  // TODO: Error handling?
  // TODO: Validation?
  // TODO: Assign to current user, require auth to post.
  await firestore.collection("stories").add({
    title: newStoryParams.get("title"),
    sourceUrl: newStoryParams.get("sourceUrl"),
    sourcePaywalled,
    disabled: false,
    createdAt: new Date(),
  });

  return redirect("/");
};

export default function NewStory() {
  return (
    <div>
      <Link to="/">Back</Link>

      <form method="post">
        <input
          name="title"
          placeholder="Title"
          aria-label="Title"
          type="text"
          disabled
          required
        />
        <input
          name="sourceUrl"
          placeholder="Source URL"
          aria-label="Source URL"
          type="url"
          required
        />
        <label>
          <input type="checkbox" name="sourcePaywalled" />
          Source Paywalled
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
