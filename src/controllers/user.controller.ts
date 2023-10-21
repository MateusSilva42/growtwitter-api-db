import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const prisma = new PrismaClient();

export class UserController {
    public async cadastrar(req: Request, res: Response) {
        try{
            const nome = req.body.name;
            const userName = req.body.user_name;
            const email = req.body.email;
            const senha = req.body.password;

            const userData = {
                name: nome,
                email: email,
                password: senha,
                user_name: userName,
            }

            const newUser = await prisma.user.create({
                data: userData
            })

            return res.status(201).json({message: 'Usuário criado com sucesso', data: newUser})
        } catch(error: any){
            res.status(400).json({ message: error.message })
        }
       
        }
    
    public async alterar(req: Request, res: Response) {
        const { id } = req.params;
        const nome = req.body.name;
        const userName = req.body.user_name;
        const email = req.body.email;
        const senha = req.body.password;

        try{
            const currentUser = await prisma.user.findUnique({
                where: {
                    id: String(id)
                }
            })

            console.log('dados do usuario: ', currentUser?.name, currentUser?.user_name, currentUser?.email, currentUser?.password)
            console.log('dados recebidos: ', nome, userName, email, senha);
            
            
            const updateUser = await prisma.user.update({
                where: {
                    id: String(id)
                },
                data: {
                    name: nome? nome : currentUser?.name,
                    user_name: userName? userName : currentUser?.user_name,
                    email: email? email : currentUser?.email,
                    password: senha? senha : currentUser?.password,
                }
            })

            return res.status(200).json({ message: 'Usuário alterado com sucesso', data: updateUser })
        } catch(error: any){
            res.status(400).json({ message: error.message })
        }
    }

    public async excluir(req: Request, res: Response) {
        const { id } = req.params;

        try{
            const user = await prisma.user.delete({
                where: {
                    id: String(id)
                }
            })

            return res.status(200).json({ message: 'Usuário excluído com sucesso', data: user })
        } catch(error: any){
            res.status(400).json({ message: error.message })
        }
    }

    public async buscarPorId(req: Request, res: Response) {
        const { id } = req.params;

        try{
            const user = await prisma.user.findUnique({
                where: {
                    id: String(id)
                }
            })

            return res.status(200).json({ message: 'Usuário encontrado com sucesso', data: user })
        } catch(error: any){
            res.status(400).json({ message: error.message })
        }
    }

    public async buscarTodos(req: Request, res: Response) {

        try{
            const users = await prisma.user.findMany()

            return res.status(200).json({ message: 'Usuários encontrados com sucesso', data: users })
        } catch(error: any){
            res.status(400).json({ message: error.message })
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
      
            const user = await prisma.user.findUnique({
              where: { email },
            });
      
            if (!user) {
              return res.status(401).json({ message: 'Usuário não encontrado' });
            }
      
            const passwordMatch = password === user.password;
            console.log('senhas: ', password, user.password, passwordMatch);
            
            if (!passwordMatch) {
              return res.status(401).json({ message: 'Senha incorreta' });
            }
      
            const token = jwt.sign({ userId: user.id }, process.env.SECRET as Secret);
      
            res.status(200).json({ token });
          } catch (error: any) {
            res.status(500).json({ message: error.message });
          }
        }
}