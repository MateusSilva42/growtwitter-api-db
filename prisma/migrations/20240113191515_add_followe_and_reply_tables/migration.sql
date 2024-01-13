/*
  Warnings:

  - You are about to drop the `follower` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `following` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `retweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "follower" DROP CONSTRAINT "follower_uuid_fkey";

-- DropForeignKey
ALTER TABLE "following" DROP CONSTRAINT "following_uuid_fkey";

-- DropForeignKey
ALTER TABLE "retweet" DROP CONSTRAINT "retweet_tweet_id_fkey";

-- DropTable
DROP TABLE "follower";

-- DropTable
DROP TABLE "following";

-- DropTable
DROP TABLE "retweet";

-- CreateTable
CREATE TABLE "user_follower" (
    "user_id" UUID NOT NULL,
    "follower_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_follower_pkey" PRIMARY KEY ("user_id","follower_id")
);

-- CreateTable
CREATE TABLE "reply" (
    "id" UUID NOT NULL,
    "tweet_id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reply_pkey" PRIMARY KEY ("id")
);
