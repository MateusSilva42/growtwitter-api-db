import { Router } from 'express';
import { FollowerController } from '../controllers/index';

export function followerRoutes(){
    const router = Router();
    const controller = new FollowerController();

    router.get('/')
    router.post('/', controller.follow)

    return router;
}