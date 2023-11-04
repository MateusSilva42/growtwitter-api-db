import jwt, {Secret} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { User } from '@prisma/client';

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.SECRET as Secret, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.user = user; // Adicione o usuário autenticado à solicitação
    next();
  });
}
