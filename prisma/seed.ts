// @ts-check
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    await prisma.car.createMany({
        data: [
            {
                make: "Toyota",
                model: "Camry",
                year: 2022,
                pricePerDay: 50,
                isAvailable: true,
                imageUrl: "https://source.unsplash.com/random/300x200/?toyota",
            },
            {
                make: "Honda",
                model: "Civic",
                year: 2021,
                pricePerDay: 45,
                isAvailable: false,
                imageUrl: "https://source.unsplash.com/random/300x200/?honda",
            },
            {
                make: "Tesla",
                model: "Model 3",
                year: 2023,
                pricePerDay: 120,
                isAvailable: true,
                imageUrl: "https://source.unsplash.com/random/300x200/?tesla",
            },
        ],
    });

    console.log("🚗 Cars seeded successfully");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
