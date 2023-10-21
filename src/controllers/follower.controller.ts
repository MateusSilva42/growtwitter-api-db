import { Request, Response } from 'express';

export class FollowerController {
    public async follow(req: Request, res: Response) {
        const { idUsuario } = req.params;
        const { idSeguidor } = req.body;

        res.json({ idUsuario, idSeguidor });
    }

    public async unfollow(req: Request, res: Response) {
        const { idUsuario } = req.params;
        const { idSeguidor } = req.body;

        res.json({ idUsuario, idSeguidor });
    }
}