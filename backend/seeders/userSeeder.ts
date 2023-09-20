import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function userSeeder() {
    const user = await prisma.user.create({
        data: {
            username: 'Wojtek',
            email: 'wojtek@gmail.com',
            phone_number: '123123123',
            password: '$2b$10$Zaj0rjpFl6p3laOgvkIdnuEGyBK0HsM7KH7qN2iXui17yLi7z8iMi'
        }
    });
    await prisma.shipping.create({
        data: {
            city: '',
            address: '',
            user_id: user.id
        }
    });
}

export default userSeeder;