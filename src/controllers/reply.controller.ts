import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ReplyController {
    public async createReply(req: Request, res: Response) {
        const conteudo = req.body.content;
        const user_id = req.body.author_id;
        const {tweet_id} = req.params;

        try {
            const newReply = await prisma.reply.create({
                data: {
                    content: conteudo,
                    author: {
                        connect: {
                            id: user_id,
                        },
                    },
                    tweet: {
                        connect: {
                            id: tweet_id,
                        },
                    },
                },
            });

            return res.status(201).json({ message: 'Reply criado com sucesso', data: newReply });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async getReplies(req: Request, res: Response) {
        const { tweet_id } = req.params;

        try {
            const replies = await prisma.reply.findMany({
                include: {
                    author: {
                        select: {
                            name: true,
                            user_name: true,
                        }
                    },
                    likes: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });

            return res.status(200).json({ message: 'Replies encontrados com sucesso', data: replies });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async deleteReply(req: Request, res: Response) {
        const { idReply } = req.params;

        try {
            await prisma.reply.delete({
                where: {
                    id: idReply,
                },
            });

            return res.status(200).json({ message: 'Reply deletado com sucesso' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}