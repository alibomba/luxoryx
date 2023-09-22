import { Request, Response, Router } from 'express';
import { Order, PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import { PaginationResponse } from '../types';
const orderRoutes: Router = Router();
const prisma = new PrismaClient();

const PER_PAGE: number = 6;

orderRoutes.get('/my-orders', jwtAuthentication, async (req: Request, res: Response) => {
    const { user } = req.body;
    let page = req.query.page as string | number;
    if (page) page = +page;
    else page = 1;
    const orderCount = (await prisma.order.findMany({ where: { user_id: user.id } })).length;
    if (orderCount === 0) return res.status(404).json({ message: 'Brak zamówień' });
    const lastPage = Math.ceil(orderCount / PER_PAGE);
    if (page > lastPage) return res.status(404).json({ message: `There are only ${lastPage} pages` });
    const offset = (page - 1) * PER_PAGE;
    const orders = await prisma.order.findMany({ where: { user_id: user.id }, include: { product: { select: { name: true, images: { where: { is_thumbnail: true } } } } }, take: PER_PAGE, skip: offset });
    const response: PaginationResponse<Order> = {
        currentPage: page,
        lastPage,
        data: orders
    };
    res.json(response);
});

orderRoutes.post('/report-order', jwtAuthentication, async (req: Request, res: Response) => {
    const { user, subject, content, orderId } = req.body;
    if (!orderId) return res.status(422).json({ message: 'Identyfikator zamówienia jest wymagany' });
    if (!await prisma.order.findUnique({ where: { id: orderId } })) return res.status(422).json({ message: 'Zamówienie nie istnieje' });
    if (!subject) return res.status(422).json({ message: 'Temat jest wymagany' });
    if (subject.length > 100) return res.status(422).json({ message: 'Temat może mieć maksymalnie 100 znaków' });
    if (!content) return res.status(422).json({ message: 'Treść jest wymagana' });
    if (content.length > 700) return res.status(422).json({ message: 'Treść może mieć maksymalnie 700 znaków' });

    try {
        await prisma.orderReport.create({
            data: {
                subject,
                content,
                order_id: orderId,
                user_id: user.id
            }
        });
        res.status(201).json({ message: 'Wysłano zgłoszenie' });
    } catch (err) {
        res.sendStatus(500);
    }
});

export default orderRoutes;