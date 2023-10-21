import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateLogin, validateRegister } from '../middlewares/validateData';
import { auth } from '../middlewares/Auth';

export function userRoutes(){
    const router = Router();
    const controller = new UserController();

    router.route('/')
    .get(auth, controller.buscarTodos)
    .post(controller.cadastrar)

    router.route('/:id')
    .get(auth, controller.buscarPorId)
    .put(auth, controller.alterar)
    .delete(auth, controller.excluir)

    router.route('/login')
    .post(controller.login)

    return router;
}