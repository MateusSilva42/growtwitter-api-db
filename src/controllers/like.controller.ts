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
      let liked = false;

      console.log(idTweet, idUsuario);
      

      const alreadyLiked: Array<object> = await prisma.like.findMany({
        where: {
          tweet_id: idTweet,
          user_id: idUsuario,
        },
      });

      if (alreadyLiked.length > 0) {
          await prisma.like.deleteMany({
          where: {
              tweet_id: idTweet,
              user_id: idUsuario,
          },
        });
        liked = false;
      } else {
          await prisma.like.create({
          data: {
            tweet: { connect: { id: String(idTweet) } },
            user: { connect: { id: String(idUsuario) } },
          },
        });
        liked = true;
      }
      

      return res
        .status(201)
        .json({ message: "Like criado com sucesso", data: liked });
    } catch (error: any) {
      console.log(error);

      res.status(400).json({ message: error.message });
    }
  }

}
