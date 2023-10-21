import { Router } from 'express';
import { TweetController } from '../controllers/index';
import { auth } from '../middlewares/Auth';

export function tweetRoutes(){
    const router = Router();
    const controller = new TweetController();

    router.get('/', auth, controller.buscarTodos)
    router.post('/', auth, controller.cadastrar)
    router.delete('/:id',auth, controller.excluir)

    return router;
}