import { PrismaClient, Prisma } from "@prisma/client";

const storyWithTopics = Prisma.validator<Prisma.StoryArgs>()({
  include: {
    topics: true,
  },
});
export type StoryWithTopics = Prisma.StoryGetPayload<typeof storyWithTopics>;

export * from "@prisma/client";
export const db = new PrismaClient();
