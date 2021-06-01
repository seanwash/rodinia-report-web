import type { MetaFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { ClockIcon, GlobeAltIcon } from "../components/icons";
import { db, StoryWithTopics } from "../lib/db";

export const meta: MetaFunction = () => {
  return {
    title: "The Rodinia Report",
    description:
      "The Rodinia Report is a public curation of environmentally focused articles that helps individuals easily stay up to date on the most recent and most inspiring undertakings around the world.",
  };
};

export const loader: LoaderFunction = async () => {
  const stories = await db.story.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      topics: true,
    },
  });

  return { stories };
};

interface IndexRouteData {
  stories: StoryWithTopics[];
}

export default function Index() {
  const { stories } = useRouteData<IndexRouteData>();

  const storyRenderData = stories.map((story) => {
    const sourceUrl = new URL(story.sourceUrl);
    sourceUrl.searchParams.append("utm_source", "rodinia_report");
    sourceUrl.searchParams.append("ref", "rodinia_report");

    const createdAt = new Intl.DateTimeFormat().format(
      new Date(story.createdAt),
    );

    return {
      ...story,
      createdAt,
      sourceUrl: sourceUrl.toString(),
      sourceHostname: new URL(story.sourceUrl).hostname,
    };
  });

  return (
    <ul className="bg-alabaster-300 shadow-sm rounded-sm divide-y divide-alabaster">
      {storyRenderData?.map((story) => (
        <li key={story.sourceTitle}>
          <div className="flex items-center space-x-4">
            <div className="p-4">
              <h3>
                <a
                  href={story.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {story.sourceTitle}
                </a>
              </h3>

              <div className="flex items-center mt-2 space-x-4 leading-5 text-gray-500">
                <div className="flex items-center text-sm">
                  <ClockIcon className="h-5 w-5 stroke-current mr-2" />
                  <span>{story.createdAt}</span>
                </div>
                <div className="flex items-center text-sm">
                  <GlobeAltIcon className="h-5 w-5 stroke-current mr-2" />
                  <span>{story.sourceHostname}</span>
                </div>
                {story.topics.length > 0 && (
                  <ul>
                    {story.topics.map((topic) => (
                      <li key={topic.id}>{topic.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
