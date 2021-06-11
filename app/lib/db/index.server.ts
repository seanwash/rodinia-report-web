import { PrismaClient, Prisma } from "@prisma/client";

const storyWithTopics = Prisma.validator<Prisma.StoryArgs>()({
  include: {
    topics: true,
  },
});
export type StoryWithTopics = Prisma.StoryGetPayload<typeof storyWithTopics>;

// https://github.com/prisma/prisma/issues/5007
let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient();
  }
  // @ts-ignore
  prisma = global.prisma;
}

export const db = prisma;
export * from "@prisma/client";
