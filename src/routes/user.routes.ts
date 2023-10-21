import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateLogin, validateRegister } from '../middlewares/validateData';

export function userRoutes(){
    const router = Router();
    const controller = new UserController();

    router.route('/')
    .get(controller.buscarTodos)
    .post(controller.cadastrar)

    router.route('/:id')
    .get(controller.buscarPorId)
    .put(controller.alterar)
    .delete(controller.excluir)

    router.route('/login')
    .post(validateLogin, controller.login)

    return router;
}