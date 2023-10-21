import { Router } from 'express';
import { TweetController } from '../controllers/index';

export function tweetRoutes(){
    const router = Router();
    const controller = new TweetController();

    router.get('/', controller.buscarTodos)
    router.post('/', controller.cadastrar)
    router.delete('/:id', controller.excluir)

    return router;
}