import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
const reviewRoutes: Router = Router();
const prisma = new PrismaClient();

reviewRoutes.get('/reviews/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { sorting, howMany } = req.query;
    let sortingQuery = 'new';
    let howManyQuery = 3;
    if (sorting && (sorting === 'new' || sorting === 'popular')) sortingQuery = sorting as string;
    if (howMany && !isNaN(parseInt(howMany as string))) howManyQuery = parseInt(howMany as string);
    if (!await prisma.product.findUnique({ where: { id } })) return res.status(404).json({ message: 'Produkt nie istnieje' });
    const reviews = await prisma.review.findMany({
        where: { product_id: id },
        orderBy: sortingQuery === 'new' ? {
            created_at: 'desc'
        } : {
            likes: 'desc'
        },
        take: howManyQuery,
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    profile_picture: true
                }
            }
        }
    });
    const reviewsCount = (await prisma.review.findMany({ where: { product_id: id } })).length;
    res.json({ reviews, count: reviewsCount });
});

reviewRoutes.post('/review/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content, rate, user } = req.body;
    if (!await prisma.product.findUnique({ where: { id } })) return res.status(422).json({ message: 'Produkt nie istnieje' });
    if (!content) return res.status(422).json({ message: 'Treść jest wymagana' });
    if (content.length > 300) return res.status(422).json({ message: 'Treść nie może mieć więcej niż 300 znaków' });
    if (!rate) return res.status(422).json({ message: 'Ocena jest wymagana' });
    if (isNaN(parseInt(rate))) return res.status(422).json({ message: 'Ocena musi być liczbą całkowitą' });
    try {
        const review = await prisma.review.create({
            data: {
                product_id: id,
                content,
                rate,
                user_id: user.id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        profile_picture: true
                    }
                }
            }
        });
        res.status(201).json(review);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default reviewRoutes;