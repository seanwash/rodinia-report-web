import type { MetaFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { ClockIcon, GlobeAltIcon } from "@heroicons/react/outline";
import { firestore } from "../lib/fire";

export const meta: MetaFunction = () => {
  return {
    title: "The Rodinia Report",
    description:
      "The Rodinia Report is a public curation of environmentally focused articles that helps individuals easily stay up to date on the most recent and most inspiring undertakings around the world.",
  };
};

export const loader: LoaderFunction = async () => {
  const response = await firestore
    .collection("stories")
    .orderBy("createdAt", "desc")
    .get();
  const stories = response.docs.map((doc) => doc.data());

  return { stories };
};

export default function Index() {
  let { stories } = useRouteData();

  // TODO: No any here.
  stories = stories.map((story: any) => {
    const sourceUrl = new URL(story.sourceUrl);
    sourceUrl.searchParams.append("utm_source", "rodinia_report");
    sourceUrl.searchParams.append("ref", "rodinia_report");

    const createdAt = new Intl.DateTimeFormat().format(
      new Date(story.createdAt.seconds * 1000),
    );

    return {
      ...story,
      sourceUrl,
      createdAt,
      sourceHostname: new URL(story.sourceUrl).hostname,
    };
  });

  return (
    <ul className="bg-alabaster-300 shadow-sm rounded-sm divide-y divide-alabaster">
      {stories?.map((story: any) => (
        <li key={story.title}>
          <div className="flex items-center space-x-4">
            <div className="p-4">
              <h3>
                <a
                  href={story.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {story.title}
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
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
