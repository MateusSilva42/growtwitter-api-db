import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FollowerController {
    public async follow(req: Request, res: Response) {
        const idUsuario = req.body.idUser;
        const idSeguidor = req.body.idFollower;

        try {
            const newFollow = await prisma.user_follower.create({
                data: {
                    user: {
                        connect: {
                            id: idUsuario,
                        },
                    },
                    follower: {
                        connect: {
                            id: idSeguidor,
                        },
                    },
                },
            });

            return res.status(201).json({ message: 'Seguido com sucesso', data: newFollow });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }

        res.json({ idUsuario, idSeguidor });
    }

    public async getFollowers(req: Request, res: Response) {
        const { userId } = req.params;

        try {
            const followers = await prisma.user_follower.findMany({
                where: {
                    user_id: userId,
                },
            });

            return res.status(200).json({ message: 'Seguidores encontrados com sucesso', data: followers });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async getFollowing(req: Request, res: Response) {
        const { followerId } = req.params;

        try {
            const following = await prisma.user_follower.findMany({
                where: {
                    follower_id: followerId,
                },
            });

            return res.status(200).json({ message: 'Seguindo encontrados com sucesso', data: following });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async unfollow(req: Request, res: Response) {
        const { user_id, follower_id } = req.params;
        
        try {
            const tweet = await prisma.user_follower.delete({
                where: {
                    user_id_follower_id: {
                        user_id: String(user_id),
                        follower_id: String(follower_id),
                    },
                },
            });

            return res.status(200).json({ message: 'Desseguido com sucesso', data: tweet });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}