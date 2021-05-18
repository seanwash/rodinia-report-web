import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
  useRouteData,
} from "remix";
import { Link } from "react-router-dom";
import { firestore } from "../../lib/fire";
import { getUser } from "../../lib/sessions.server";
import firebase from "firebase/app";

export const meta: MetaFunction = () => {
  return {
    title: "New Story",
    description: "Share a new story",
  };
};

export const loader: LoaderFunction = async () => {
  const topicSnapshot = await firestore.collection("topics").get();
  const topics = topicSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { topics };
};

export const action: ActionFunction = async ({ request }) => {
  const params = new URLSearchParams(await request.text());
  const sourcePaywalled = params.get("sourcePaywalled") === "on";

  // TODO: Require auth to post.
  const user = await getUser(request);

  // TODO: Error handling?
  // TODO: Validation?
  await firestore.collection("stories").add({
    title: params.get("title"),
    sourceUrl: params.get("sourceUrl"),
    sourcePaywalled,
    disabled: false,
    createdAt: new Date(),
    userId: user?.user.uid,
    topicIds: params.getAll("topicIds"),
  });

  return redirect("/");
};

interface NewStoryRouteData {
  topics: firebase.firestore.DocumentData[];
}

export default function NewStory() {
  const { topics } = useRouteData<NewStoryRouteData>();

  return (
    <div>
      <Link to="/">Back</Link>

      <form method="post">
        <div>
          <input
            name="title"
            placeholder="Title"
            aria-label="Title"
            type="text"
            required
          />
        </div>
        <div>
          <input
            name="sourceUrl"
            placeholder="Source URL"
            aria-label="Source URL"
            type="url"
            required
          />
        </div>
        <div>
          <select
            name="topicIds"
            aria-label="Topics"
            id="topicIds"
            multiple
            size={3}
          >
            {topics.map((topic) => (
              <option value={topic.id}>{topic.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>
            <input type="checkbox" name="sourcePaywalled" />
            Source Paywalled
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
