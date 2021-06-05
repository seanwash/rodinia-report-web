import { ClockIcon, GlobeAltIcon } from "../icons";
import { StoryWithTopics } from "../../lib/db";

interface StoryListItemProps {
  story: StoryWithTopics;
}

const StoryListItem: React.FC<StoryListItemProps> = ({ story }) => {
  const sourceUrl = new URL(story.sourceUrl);
  sourceUrl.searchParams.append("utm_source", "rodinia_report");
  sourceUrl.searchParams.append("ref", "rodinia_report");

  const createdAt = new Intl.DateTimeFormat().format(new Date(story.createdAt));

  const storyData = {
    createdAt,
    sourceUrl: sourceUrl.toString(),
    sourceHostname: new URL(story.sourceUrl).hostname,
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="w-full p-4">
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

        <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:space-x-4 leading-5 text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <ClockIcon className="h-5 w-5 stroke-current mr-2" />
              <span>{storyData.createdAt}</span>
            </div>

            <div className="flex items-center text-sm">
              <GlobeAltIcon className="h-5 w-5 stroke-current mr-2" />
              <span>{storyData.sourceHostname}</span>
            </div>
          </div>

          {story.topics.length > 0 && (
            <ul className="mt-4 sm:mt-0 space-x-2">
              {story.topics.map((topic) => (
                <li
                  className="text-xs text-white bg-el-paso inline-block rounded-full py-1 px-2"
                  key={topic.id}
                >
                  {topic.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryListItem;
