import { userRoutes } from './user.routes';
import { tweetRoutes } from './tweet.routes';
import { retweetRoutes } from './retweet.routes';
import { likeRoutes } from './like.routes';
import { followerRoutes } from './follower.routes';
import { Router } from 'express';

const router = Router()

router.use('/users', userRoutes())
router.use('/tweets', tweetRoutes())
router.use('/retweets', retweetRoutes())
router.use('/likes', likeRoutes())
router.use('/followers', followerRoutes())

export default { router }