import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class LikeController {
  public async getLikes(req: Request, res: Response) {
    try {
      const { idTweet } = req.params;

      const likes = await prisma.like.count({
        where: {
          tweet_id: idTweet,
        },
      });

      return res
        .status(200)
        .json({ message: "Likes encontrados com sucesso", data: likes });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async like(req: Request, res: Response) {
    try {
      const idTweet = req.params.tweetId;
      const idUsuario = req.body.user_id;

      const like = await prisma.like.create({
        data: {
          tweet: { connect: { id: String(idTweet) } },
          user: { connect: { id: String(idUsuario) } },
        },
      });

      return res
        .status(201)
        .json({ message: "Like criado com sucesso", data: like });
    } catch (error: any) {
      console.log(error);

      res.status(400).json({ message: error.message });
    }
  }

  public async dislike(req: Request, res: Response) {
    try {
      const idTweet = req.params.tweetId;
      const idUsuario = req.body.user_id;

      const dislike = await prisma.like.deleteMany({
        where: {
            tweet_id: idTweet,
            user_id: idUsuario,
        },
      });

      return res
        .status(200)
        .json({ message: "Like excluído com sucesso", data: dislike });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
