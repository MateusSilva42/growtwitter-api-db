import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export async function validateRegister(){
    return async (req: Request, res: Response, next: NextFunction) => {
        const nome = req.body.nome;
        const email = req.body.email;
        const senha = req.body.senha;
        const user_name = req.body.user_name;

        console.log('XABLAU')

        const exists = await prisma.user.findFirst( {
            where: {
                OR: [
                    {
                        email: email
                    },
                    {
                        user_name: nome
                    },
                ]
            }
        })

        if(!nome || !email || !senha || !user_name || exists){
            return res.status(400).json({ message: 'Dados inválidos ou já existentes, tente novamente.' });
        }

        next();
    }
}

export async function validateLogin(){
    return (req: Request, res: Response, next: NextFunction) => {
        const { email, senha } = req.body;

        if(!email || !senha){
            return res.status(400).json({ message: 'Dados inválidos' });
        }

        next();
    }
}