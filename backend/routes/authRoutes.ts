import {Request, Response, Router} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { UserOptionalPassword } from '../types';

const authRoutes: Router = Router();
const prisma = new PrismaClient();

authRoutes.post('/login', async(req: Request, res: Response) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(401).json({message: 'Niepoprawny e-mail lub hasło'});
    const userFound = await prisma.user.findUnique({where: {email}});
    if(!userFound) return res.status(401).json({message: 'Niepoprawny e-mail lub hasło'});
    if(!await bcrypt.compare(password, userFound.password)) return res.status(401).json({message: 'Niepoprawny e-mail lub hasło'});
    const user: UserOptionalPassword = {...userFound};
    delete user.password;
    const accessToken = jwt.sign(user, process.env.JWT_SECRET as string, {expiresIn: process.env.JWT_TTL});
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET as string);
    try{
        await prisma.refreshToken.create({
            data:{
                token: refreshToken
            }
        });
        res.json({accessToken, refreshToken});
    }catch(err){
        res.sendStatus(500);
    }

});


export default authRoutes;