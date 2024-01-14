import { Router } from 'express';
import { FollowerController } from '../controllers/index';

export function followerRoutes(){
    const router = Router();
    const controller = new FollowerController();

    router.get('/followers/:userId', controller.getFollowers);
    router.get('/following/:followerId', controller.getFollowing);
    router.post('/follow', controller.follow);
    router.delete('/unfollow', controller.unfollow);
    
    return router;
}