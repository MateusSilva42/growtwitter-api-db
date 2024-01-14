import { Router } from 'express';
import { ReplyController } from '../controllers';
import { auth } from '../middlewares/Auth';

export function replyRoutes(){
    const router = Router();
    const controller = new ReplyController();

    router
    .get('/:tweet_id', auth, controller.getReplies)

    router.post('/:tweet_id', auth, controller.createReply)
    router.delete('/:tweet_id',auth, controller.deleteReply)

    return router;
}