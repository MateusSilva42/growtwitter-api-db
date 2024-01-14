-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_tweet_id_fkey";

-- AlterTable
ALTER TABLE "like" ADD COLUMN     "reply_id" UUID,
ALTER COLUMN "tweet_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user_follower" ADD CONSTRAINT "user_follower_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follower" ADD CONSTRAINT "user_follower_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
