import { Router } from 'express';
import { ReplyController } from '../controllers';
import { auth } from '../middlewares/Auth';

export function replyRoutes(){
    const router = Router();
    const controller = new ReplyController();

    router
    .get('/', auth, controller.getReplies)

    router.post('/', auth, controller.createReply)
    router.delete('/:id',auth, controller.deleteReply)

    return router;
}