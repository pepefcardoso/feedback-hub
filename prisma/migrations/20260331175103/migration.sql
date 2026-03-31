/*
  Warnings:

  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,feedbackId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Vote` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `type` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_feedbackId_fkey";

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "voteCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "type" "VoteType" NOT NULL,
ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Feedback_category_createdAt_idx" ON "Feedback"("category", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Feedback_category_voteCount_idx" ON "Feedback"("category", "voteCount" DESC);

-- CreateIndex
CREATE INDEX "Vote_feedbackId_idx" ON "Vote"("feedbackId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_feedbackId_key" ON "Vote"("userId", "feedbackId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;
