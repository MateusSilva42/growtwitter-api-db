import { Router } from 'express';
import { LikeController } from '../controllers/index';
import { auth } from '../middlewares/Auth';

export function likeRoutes() {
    const router = Router();
    const controller = new LikeController();

    router.get('/:tweetId', controller.getLikes)
    router.post('/:tweetId', auth, controller.like)
    router.delete('/:tweetId',auth, controller.dislike)

    return router;
}
