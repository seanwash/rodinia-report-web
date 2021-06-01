-- AlterTable
ALTER TABLE "Story" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StoryToTopic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Story.userId_index" ON "Story"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Topic.name_unique" ON "Topic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Topic.slug_unique" ON "Topic"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_StoryToTopic_AB_unique" ON "_StoryToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_StoryToTopic_B_index" ON "_StoryToTopic"("B");

-- AddForeignKey
ALTER TABLE "_StoryToTopic" ADD FOREIGN KEY ("A") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoryToTopic" ADD FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
