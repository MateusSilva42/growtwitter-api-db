    import { Router } from 'express';
    import { RetweetController } from '../controllers/index';
    
    export function retweetRoutes(){
        const router = Router();
        const controller = new RetweetController();
    
        router.get('/')
        router.post('/', controller.retweet)
        router.put('/:id')
        router.delete('/:id')
    
        return router;
    }