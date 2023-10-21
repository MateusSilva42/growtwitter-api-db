import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

interface AuthenticatedRequest extends Request {
  user: User;
}

function auth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  const secret = process.env.SECRET;
  console.log(secret)

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, 'secret', (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.user = user;
    next();
  });
}

export { auth };
