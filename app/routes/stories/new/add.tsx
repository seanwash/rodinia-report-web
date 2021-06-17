import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
  useRouteData,
} from "remix";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  commitSession,
  getSession,
  getUser,
} from "../../../lib/sessions.server";
import { db, Topic } from "../../../lib/db/index.server";

export const meta: MetaFunction = () => {
  return {
    title: "Submit Story",
    description: "Share a new story",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return redirect("/sessions");

  const session = await getSession(request);
  const sourceUrl = session.get("storyForm_sourceUrl")!;
  const title = session.get("storyForm_title");
  const error = session.get("error");

  const topics = await db.topic.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return json(
    { topics, title, sourceUrl, error },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
};

export const action: ActionFunction = async ({ request }) => {
  const params = new URLSearchParams(await request.text());
  const sourcePaywalled = params.get("sourcePaywalled") === "on";

  const user = await getUser(request);
  if (!user) return redirect("/sessions");

  const session = await getSession(request);

  // TODO: Error handling?
  try {
    await db.story.create({
      data: {
        sourceTitle: params.get("title")!,
        sourceUrl: params.get("sourceUrl")!,
        sourcePaywalled,
        userId: user.user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        topics: {
          connect: params.getAll("topicId").map((id) => ({ id: Number(id) })),
        },
      },
    });
  } catch (e) {
    session.flash("error", "Story could not be saved");
    session.flash("storyForm_title", params.get("title"));
    session.flash("storyForm_sourceUrl", params.get("sourceUrl"));

    return redirect("/stories/new/add", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

interface NewStoryRouteData {
  topics: Topic[];
  title?: string;
  sourceUrl?: string;
  error?: string;
}

export default function NewStory() {
  const { topics, title, sourceUrl, error } = useRouteData<NewStoryRouteData>();
  const [titleField, setTitleField] = useState(title);
  const [sourceUrlField, setSourceUrlField] = useState(sourceUrl);

  return (
    <>
      <h2 className="text-2xl leading-7 mb-4">Submit Story</h2>

      {error && (
        <div className="p-3 bg-red-600 text-white rounded-sm shadow-sm mb-4">
          {error}
        </div>
      )}

      <form method="post" className="space-y-4">
        <div>
          <input
            name="title"
            placeholder="Title"
            aria-label="Title"
            type="text"
            required
            className="twc-input"
            value={titleField || ""}
            onChange={(e) => setTitleField(e.target.value)}
          />
        </div>
        <div>
          <input
            name="sourceUrl"
            placeholder="Source URL"
            aria-label="Source URL"
            type="url"
            required
            className="twc-input"
            value={sourceUrlField || ""}
            onChange={(e) => setSourceUrlField(e.target.value)}
          />
        </div>
        <div className="relative flex items-center">
          <select
            name="topicId"
            multiple
            aria-label="Related Topics"
            id="topicId"
            className="twc-input"
            required
            defaultValue={[]}
          >
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="flex items-center">
            <label htmlFor="sourcePaywalled" className="flex items-center">
              <input
                id="sourcePaywalled"
                name="sourcePaywalled"
                type="checkbox"
                className="twc-checkbox"
              />

              <span className="ml-2 inline-block text-sm">
                Is this story behind a paywall?
              </span>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <button className="twc-button" type="submit">
            Submit
          </button>
          <Link className="inline-block ml-4 hover:underline" to="/">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
