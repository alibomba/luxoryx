import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
const orderRoutes: Router = Router();
const prisma = new PrismaClient();

orderRoutes.get('/my-orders', jwtAuthentication, async (req: Request, res: Response) => {
    const { user } = req.body;
    const { page } = req.query;
    const orders = await prisma.order.findMany({ where: { user_id: user.id } });
    res.json(orders);
});

export default orderRoutes;