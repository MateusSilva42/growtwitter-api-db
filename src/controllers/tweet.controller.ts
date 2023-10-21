import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TweetController {

        public async cadastrar(req: Request, res: Response) {
            const conteudo = req.body.content;
            const user_id = req.body.author_id;

            try {
                const newTweet = await prisma.tweet.create({
                    data: {
                        content: conteudo,
                        type: 'text',
                        author: { connect: { id: user_id } },
                    },
                });

                return res.status(201).json({ message: 'Tweet criado com sucesso', data: newTweet });
            } catch (error: any) {
                res.status(400).json({ message: error.message });
            }
        }

        public async buscarTodos(req: Request, res: Response) {
        const { id } = req.params;
        
        try {
            const tweets = await prisma.tweet.findMany({});

            return res.status(200).json({ message: 'Tweets encontrados com sucesso', data: tweets });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    public async excluir(req: Request, res: Response) {
        const { id } = req.params;
    
        try {
            const tweet = await prisma.tweet.delete({
                where: {
                    id: String(id),
                },
            });
    
            return res.status(200).json({ message: 'Tweet excluído com sucesso', data: tweet });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}