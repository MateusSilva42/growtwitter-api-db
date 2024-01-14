import { userRoutes } from './user.routes';
import { tweetRoutes } from './tweet.routes';
import { likeRoutes } from './like.routes';
import { followerRoutes } from './follower.routes';
import { replyRoutes } from './reply.routes';
import { Router } from 'express';

const router = Router()

router.use('/users', userRoutes())
router.use('/tweets', tweetRoutes())
router.use('/likes', likeRoutes())
router.use('/followers', followerRoutes())
router.use('/replies', replyRoutes())

export default { router }