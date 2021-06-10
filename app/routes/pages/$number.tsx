import type { MetaFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { Link } from "react-router-dom";
import { db, StoryWithTopics } from "../../lib/db";
import StoryListItem from "../../components/StoryListItem/StoryListItem";

export const meta: MetaFunction = () => {
  return {
    title: "The Rodinia Report",
    description:
      "The Rodinia Report is a public curation of environmentally focused articles that helps individuals easily stay up to date on the most recent and most inspiring undertakings around the world.",
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const stories = await db.story.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      topics: true,
    },
    skip: (parseInt(params.number)-1) * 2,
  });

  return { stories, pageNumber: params.number };
};

interface IndexRouteData {
  stories: StoryWithTopics[];
  pageNumber: number;
}

export default function Index() {
  const { stories, pageNumber } = useRouteData<IndexRouteData>();

  const previousPagePath = pageNumber > 2 ? `/pages/${pageNumber-1}` : `/`;

  return (
    <>
      <ul className="bg-alabaster-300 shadow-sm rounded-sm divide-y divide-alabaster mt-8">
        {stories?.map((story) => (
          <li key={story.sourceTitle}>
            <StoryListItem story={story} />
          </li>
        ))}
      </ul>
      <Link to={previousPagePath}>Previous Page</Link>
    </>
  );
}
