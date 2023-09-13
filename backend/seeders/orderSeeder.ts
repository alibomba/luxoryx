import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getRandomElementFromArray(array: any[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

async function orderSeeder(){
    const products = await prisma.product.findMany({select: {id: true}});
    const users = await prisma.user.findMany({select: {id: true}});

    await prisma.order.createMany({
        data: [
            {user_id: getRandomElementFromArray(users).id, product_id: products[0].id, sold_at_price: 190, quantity: 7, status: 'completed'},
            {user_id: getRandomElementFromArray(users).id, product_id: products[0].id, sold_at_price: 190, quantity: 7, status: 'completed'},
            {user_id: getRandomElementFromArray(users).id, product_id: products[0].id, sold_at_price: 190, quantity: 7, status: 'completed'},
            {user_id: getRandomElementFromArray(users).id, product_id: products[0].id, sold_at_price: 190, quantity: 7, status: 'completed'},
            {user_id: getRandomElementFromArray(users).id, product_id: products[0].id, sold_at_price: 190, quantity: 7, status: 'completed'},
            {user_id: getRandomElementFromArray(users).id, product_id: products[1].id, sold_at_price: 190, quantity: 7, status: 'completed'},
            {user_id: getRandomElementFromArray(users).id, product_id: products[1].id, sold_at_price: 190, quantity: 7, status: 'completed'},
            {user_id: getRandomElementFromArray(users).id, product_id: products[1].id, sold_at_price: 190, quantity: 7, status: 'completed'},
            {user_id: getRandomElementFromArray(users).id, product_id: products[1].id, sold_at_price: 190, quantity: 7, status: 'completed'},
            {user_id: getRandomElementFromArray(users).id, product_id: products[1].id, sold_at_price: 190, quantity: 7, status: 'completed'}
        ]
    })
}

export default orderSeeder;