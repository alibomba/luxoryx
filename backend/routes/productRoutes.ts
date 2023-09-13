import{Request, Response, Router} from 'express';
import { PrismaClient, Product } from '@prisma/client';
import { PaginationResponse} from '../types';
const productRoutes: Router = Router();
const prisma = new PrismaClient();

const PER_PAGE = 12;

productRoutes.get('/products', async(req: Request, res: Response) => {
    let page = req.query.page as string | number;
    if (page) page = +page
    else page = 1;
    const productCount = await prisma.product.count();
    const lastPage = Math.ceil(productCount / PER_PAGE);
    if (page > lastPage) return res.status(404).json({ message: `There are only ${lastPage} pages` });
    const offset = (page - 1) * PER_PAGE;
    const products = await prisma.product.findMany({ take: PER_PAGE, skip: offset, include: {discount: true} });
    const response: PaginationResponse<Product> = {
        currentPage: page,
        lastPage,
        data: products
    };
    res.json(response);
});

productRoutes.get('/products-search', async(req: Request, res: Response) => {
    const {name, minPrice, maxPrice, category, sortCheap, sortExpensive} = req.query;
    let page = req.query.page as string | number;
    if (page) page = +page
    else page = 1;

    let query: any = {};

    if(name){
        query.name = {contains: name as string, mode: 'insensitive'}
    }

    if(minPrice){
        query.price = {
            gte: parseFloat(minPrice as string)
        }
    }

    if(maxPrice){
        query.price = {
            lte: parseFloat(maxPrice as string)
        }
    }

    if(category){
        query.category = {
            name: category as string
        }
    }

    let order: any = {};

    if(sortCheap){
        order.price = 'asc';
    }

    if(sortExpensive){
        order.price = 'desc';
    }

    const productCount = (await prisma.product.findMany({where: query})).length;
    const lastPage = Math.ceil(productCount / PER_PAGE);
    if(productCount === 0){
        const response: PaginationResponse<Product> = {
            currentPage: 1,
            lastPage: 1,
            data: []
        }
        return res.json(response);
    }
    if (page > lastPage) return res.status(404).json({ message: `There are only ${lastPage} pages` });
    const offset = (page - 1) * PER_PAGE;

    const products = await prisma.product.findMany({
        where: query,
        take: PER_PAGE, 
         skip: offset, 
         include: {discount: true},
         orderBy: order
    });
    const response: PaginationResponse<Product> = {
        currentPage: page,
        lastPage,
        data: products
    };
    res.json(response);
});

productRoutes.get('/products-discount', async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
        where: {discount: {
            isNot: null
        }},
        include: {discount: true},
        take: 6
    });
    if(products.length < 6) return res.status(404).json({message: 'Za mało wyników'});
    res.json(products);
});

productRoutes.get('/products-limited', async(req: Request, res: Response) => {
    const products = await prisma.product.findMany({
        where: {stock: {lte: 30}},
        orderBy: {stock: 'asc'},
        take: 6
    });

    if(products.length < 6) return res.status(404).json({message: 'Za mało wyników'});
    res.json(products);
});

productRoutes.get('/products-popular', async(req: Request, res: Response) => {
    const products = await prisma.product.findMany({include: {orders: true}, orderBy: {orders: {
        _count: 'desc'
    }}});
    res.json(products);
});

productRoutes.get('/products-new', async(req: Request, res: Response) => {
    const products = await prisma.product.findMany({select: {created_at: true}});
    res.json(products);
});

export default productRoutes;