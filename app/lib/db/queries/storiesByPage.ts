import { db, StoryWithTopics } from "..";

const STORIES_PER_PAGE = 5;

export interface StoriesByPageData {
  stories: StoryWithTopics[];
  currentPage: number;
  totalPages: number;
}

export const getStoriesByPage = async (
  currentPage: number | undefined = 1,
): Promise<StoriesByPageData> => {
  const storiesCount = await db.story.count();
  const totalPages = Math.ceil(storiesCount / STORIES_PER_PAGE);

  const stories = await db.story.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      topics: true,
    },
    skip: (currentPage - 1) * STORIES_PER_PAGE,
    take: STORIES_PER_PAGE,
  });

  return { stories, currentPage, totalPages };
};
