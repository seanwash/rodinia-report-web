import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
  useRouteData,
} from "remix";
import { Link } from "react-router-dom";
import {
  commitSession,
  getSession,
  getUser,
} from "../../../lib/sessions.server";
import { scrape } from "../../../lib/story-scraper.server";

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
  const error = session.get("error");

  return json(
    {
      error,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return redirect("/sessions");

  const params = new URLSearchParams(await request.text());
  const sourceUrl = params.get("sourceUrl")!;
  const session = await getSession(request);

  try {
    const { result } = await scrape(sourceUrl);
    // @ts-ignore
    session.flash("storyForm_title", result.ogTitle);
    session.flash("storyForm_sourceUrl", sourceUrl);

    return redirect("/stories/new/add", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (e) {
    session.flash("error", e.result.error);
    return redirect("/stories/new/url", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

interface NewStoryRouteData {
  error?: string;
}

export default function NewStory() {
  const { error } = useRouteData<NewStoryRouteData>();

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
            name="sourceUrl"
            placeholder="Source URL"
            aria-label="Source URL"
            type="url"
            required
            className="twc-input"
          />
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
