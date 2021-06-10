import { MetaFunction, LoaderFunction, redirect, useRouteData } from "remix";
import {
  getStoriesByPage,
  StoriesByPageData,
} from "../../lib/db/queries/storiesByPage";
import StoryListItem from "../../components/StoryListItem/StoryListItem";
import Pagination from "../../components/Pagination/Pagination";

export const meta: MetaFunction = () => {
  return {
    title: "The Rodinia Report",
    description:
      "The Rodinia Report is a public curation of environmentally focused articles that helps individuals easily stay up to date on the most recent and most inspiring undertakings around the world.",
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const currentPage = parseInt(params.currentPage, 10);
  const data = await getStoriesByPage(currentPage);

  if (currentPage > data.totalPages) {
    return redirect("/");
  }

  return data;
};

interface IndexRouteData extends StoriesByPageData {}

export default function Index() {
  const { stories, currentPage, totalPages } = useRouteData<IndexRouteData>();

  return (
    <>
      <ul className="bg-alabaster-300 shadow-sm rounded-sm divide-y divide-alabaster mt-8">
        {stories?.map((story) => (
          <li key={story.sourceTitle}>
            <StoryListItem story={story} />
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  );
}
