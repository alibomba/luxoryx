import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwtAuthentication from '../middleware/jwtAuthentication';

const userRoutes: Router = Router();
const prisma = new PrismaClient();

userRoutes.post('/register', async (req: Request, res: Response) => {
    const { username, email, phoneNumber, password, passwordConfirmation } = req.body;
    if (!username) return res.status(422).json({ message: 'Nazwa użytkownika jest wymagana' });
    if (username.length > 25) return res.status(422).json({ message: 'Nazwa użytkownika może mieć maksymalnie 25 znaków' });
    if (!email) return res.status(422).json({ message: 'Adres e-mail jest wymagany' });
    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    if (!emailRegex.test(email)) return res.status(422).json({ message: 'Podaj poprawny adres e-mail' });
    if (!phoneNumber) return res.status(422).json({ message: 'Numer telefonu jest wymagany' });
    if (phoneNumber.length > 25) return res.status(422).json({ message: 'Za długi numer telefonu' });
    if (!password) return res.status(422).json({ message: 'Hasło jest wymagane' });
    if (password.length < 8) return res.status(422).json({ message: 'Hasło musi mieć przynajmniej 8 znaków' });
    if (password.length > 60) return res.status(422).json({ message: 'Hasło może mieć maksymalnie 60 znaków' });
    if (password !== passwordConfirmation) return res.status(422).json({ message: 'Hasła nie są identyczne' });
    if (await prisma.user.findUnique({ where: { email } })) return res.status(422).json({ message: 'Podany adres e-mail jest już w użyciu' });
    const passwordHash = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                phone_number: phoneNumber,
                password: passwordHash
            }
        });
        res.status(201).json(user);
    } catch (err) {
        res.sendStatus(500);
    }
});

userRoutes.put('/edit-profile', jwtAuthentication, async (req: Request, res: Response) => {

});


export default userRoutes;