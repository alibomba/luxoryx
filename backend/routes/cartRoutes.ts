import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
const cartRoutes: Router = Router();
const prisma = new PrismaClient();


cartRoutes.post('/add-to-cart/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const quantity = req.body.quantity as string;
    const { user } = req.body;

    if (!quantity) return res.status(422).json({ message: 'Ilość jest wymagana' });
    if (isNaN(parseInt(quantity))) return res.status(422).json({ message: 'Ilość musi być liczbą całkowitą' });

    if (await prisma.cartElement.findFirst({ where: { user_id: user.id, product_id: id } })) return res.status(422).json({ message: 'Produkt jest już w koszyku' })
    try {
        await prisma.cartElement.create({
            data: {
                user_id: user.id,
                product_id: id,
                quantity: parseInt(quantity)
            }
        });
        res.status(201).json({ message: 'Dodano do koszyka' });
    } catch (err) {
        res.sendStatus(500);
    }
});

cartRoutes.get('/my-cart', jwtAuthentication, async (req: Request, res: Response) => {
    const { user } = req.body;
    const cartElements = await prisma.user.findUnique({
        where: {
            id: user.id
        },
        select: {
            cart_elements: {
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            stock: true,
                            images: {
                                where: { is_thumbnail: { equals: true } }
                            }
                        }
                    }
                },
                orderBy: { added_at: 'desc' }
            }
        }
    });

    res.json(cartElements);
});

export default cartRoutes;