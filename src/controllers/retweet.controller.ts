import { Request, Response } from 'express';

export class RetweetController {
    public async retweet(req: Request, res: Response) {
        const { idTweet } = req.params;
        const { idUsuario } = req.body;

        res.json({ idTweet, idUsuario });
    }

    public async unretweet(req: Request, res: Response) {
        const { idTweet } = req.params;
        const { idUsuario } = req.body;

        res.json({ idTweet, idUsuario });
    }
}