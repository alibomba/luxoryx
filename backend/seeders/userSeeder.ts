import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function userSeeder(){
    await prisma.user.create({
        data: {
            username: 'Wojtek',
            email: 'wojtek@gmail.com',
            phone_number: '123123123',
            password: '$2y$10$C1EJS2KIrx/94aYqk2es..rb8YyUe.xwN7s/v8EK7.G9V5/fmzHQ.'
        }
    });
}

export default userSeeder;