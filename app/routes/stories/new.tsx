import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
  useRouteData,
} from "remix";
import { Link } from "react-router-dom";
import { getUser } from "../../lib/sessions.server";
import { db, Topic } from "../../lib/db/index.server";
import useFetchStoryMetadata from "../../hooks/useFetchStoryMetadata";

export const meta: MetaFunction = () => {
  return {
    title: "Submit Story",
    description: "Share a new story",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return redirect("/sessions");

  const topics = await db.topic.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return { topics };
};

export const action: ActionFunction = async ({ request }) => {
  const params = new URLSearchParams(await request.text());
  const sourcePaywalled = params.get("sourcePaywalled") === "on";

  const user = await getUser(request);
  if (!user) return redirect("/sessions");

  // TODO: Error handling?
  // TODO: Validation?
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
    // eslint-disable-next-line no-console
    console.log("-----", "action", e);
    return redirect("/stories/new");
  }

  return redirect("/");
};

interface NewStoryRouteData {
  topics: Topic[];
}

export default function NewStory() {
  const { topics } = useRouteData<NewStoryRouteData>();

  const {
    sourceUrl,
    title,
    isLoading,
    isError,
    error,
    handleSourceUrlChange,
    handleTitleChange,
  } = useFetchStoryMetadata();

  console.log("-----", "NewStory", isError, error);

  return (
    <>
      <h2 className="text-2xl leading-7 mb-4">Submit Story</h2>

      {isError && <div>An error occurred</div>}

      <form method="post" className="space-y-4">
        <div>
          <input
            name="sourceUrl"
            placeholder="Source URL"
            aria-label="Source URL"
            type="url"
            required
            className="twc-input"
            onChange={handleSourceUrlChange}
            value={sourceUrl}
            disabled={isLoading}
          />
        </div>
        <div>
          <input
            name="title"
            placeholder="Title"
            aria-label="Title"
            type="text"
            required
            className="twc-input"
            onChange={handleTitleChange}
            value={title}
            disabled={isLoading}
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
