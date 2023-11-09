import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();
    await prisma.space.deleteMany();

    const joey = await prisma.user.create({
        data: {
            email: 'joey@zenstack.dev',
            name: 'Joey',
        },
    });
    console.log('User created:', joey);

    const rachel = await prisma.user.create({
        data: {
            email: 'rachel@zenstack.dev',
            name: 'Rachel',
        },
    });
    console.log('User created:', rachel);

    const centralPerk = await prisma.space.create({
        data: {
            name: 'Central Perk',
            slug: 'central-perk',
            members: {
                create: [
                    {
                        user: { connect: { id: joey.id } },
                        role: 'USER',
                    },
                    {
                        user: { connect: { id: rachel.id } },
                        role: 'ADMIN',
                    },
                ],
            },
        },
    });
    console.log('Space created:', centralPerk);

    const rachelPersonal = await prisma.space.create({
        data: {
            name: "Rachel's Personal Space",
            slug: 'rachel',
            members: {
                create: [
                    {
                        user: { connect: { id: rachel.id } },
                        role: 'ADMIN',
                    },
                ],
            },
        },
    });
    console.log('Space created:', rachelPersonal);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
