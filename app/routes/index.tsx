import type { MetaFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { Link } from "react-router-dom";
import { db, StoryWithTopics } from "../lib/db/index.server";
import StoryListItem from "../components/StoryListItem/StoryListItem";

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

  return (
    <>
      <div className="container mx-auto sm:flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl leading-7 text-el-paso sm:text-3xl sm:leading-9 max-w-4xl">
            The <span className="font-bold">Rodinia Report</span> is a public
            curation of environmentally focused articles that helps individuals
            easily stay up to date on the most recent and most inspiring
            undertakings around the world.
          </h2>
        </div>
        <div className="flex mt-4 sm:mt-0 sm:ml-8">
          <span className="shadow-sm rounded-sm">
            <Link className="twc-button" to="/stories/new/url">
              Submit Story
            </Link>
          </span>
        </div>
      </div>

      <ul className="bg-alabaster-300 shadow-sm rounded-sm divide-y divide-alabaster mt-8">
        {stories?.map((story) => (
          <li key={story.id}>
            <StoryListItem story={story} />
          </li>
        ))}
      </ul>
    </>
  );
}
