import { Request, Response, Router } from 'express';
import { Order, PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import { ClientProduct, PaginationResponse } from '../types';
const orderRoutes: Router = Router();
const prisma = new PrismaClient();

const PER_PAGE: number = 6;

orderRoutes.get('/my-orders', jwtAuthentication, async (req: Request, res: Response) => {
    const { user } = req.body;
    let page = req.query.page as string | number;
    if (page) page = +page;
    else page = 1;
    const orderCount = (await prisma.order.findMany({ where: { user_id: user.id, paid: true } })).length;
    if (orderCount === 0) return res.status(404).json({ message: 'Brak zamówień' });
    const lastPage = Math.ceil(orderCount / PER_PAGE);
    if (page > lastPage) return res.status(404).json({ message: `There are only ${lastPage} pages` });
    const offset = (page - 1) * PER_PAGE;
    const orders = await prisma.order.findMany({ where: { user_id: user.id, paid: true }, include: { product: { select: { name: true, images: { where: { is_thumbnail: true } } } } }, take: PER_PAGE, skip: offset });
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

orderRoutes.get('/is-coupon-code-valid', async (req: Request, res: Response) => {
    const {code} = req.query;
    if(!code) return res.status(422).json({message: 'Kod jest wymagany'});
    if(await prisma.discountCoupon.findUnique({where: {code: code as string, is_valid: true}})){
        res.json({valid: true});
    }
    else{
        res.json({valid: false});
    }
});

orderRoutes.post('/initiate-an-order', async(req: Request, res: Response) => {
    const {city, address, email, phoneNumber, shippingMethod, products, couponCode} = req.body;
    if(!city) return res.status(422).json({message: 'Miasto jest wymagane'});
    if(!address) return res.status(422).json({message: 'Adres jest wymagany'});
    if(!email) return res.status(422).json({message: 'Adres e-mail jest wymagany'});
    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    if (!emailRegex.test(email)) return res.status(422).json({ message: 'Podaj poprawny adres e-mail' });
    if(!phoneNumber) return res.status(422).json({message: 'Numer telefonu jest wymagany'});
    if(!shippingMethod) return res.status(422).json({message: 'Wyierz sposób dostawy'});
    if(!products) return res.status(422).json({message: 'Produkty są wymagane'});
    if(!Array.isArray(JSON.parse(products))) return res.status(422).json({message: 'Nieprawidłowy format produktów'});
    const discountCoupon = await prisma.discountCoupon.findUnique({where: {code: couponCode as string, is_valid: true}}) 
    if(!discountCoupon) return res.status(422).json({message: 'Niepoprawny kod zniżkowy'});
    const productsArr: ClientProduct[] = JSON.parse(products);
    // productsArr.forEach(async(product) => {
    //     try{
    //         await prisma.order.create({
    //             data: {

    //             }
    //         })
    //     }catch(err){
    //         return res.sendStatus(500);
    //     }
    // });
});

export default orderRoutes;