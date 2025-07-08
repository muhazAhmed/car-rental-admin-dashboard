import { PrismaClient } from "@prisma/client";
import { Status } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.car.deleteMany();
  await prisma.car.createMany({
    data: [
      {
        make: "Toyota",
        model: "Camry",
        year: 2022,
        pricePerDay: 50,
        isAvailable: true,
        imageUrl: "/cars/camry.png",
        status: Status.PENDING,
      },
      {
        make: "Honda",
        model: "Civic",
        year: 2021,
        pricePerDay: 45,
        isAvailable: false,
        imageUrl: "/cars/civic.png",
        status: Status.APPROVED,
      },
      {
        make: "Tesla",
        model: "Model 3",
        year: 2023,
        pricePerDay: 120,
        isAvailable: true,
        imageUrl: "/cars/model3.png",
        status: Status.REJECTED,
      },
      {
        make: "Tata",
        model: "Seirra",
        year: 2025,
        pricePerDay: 500,
        isAvailable: true,
        imageUrl: "/cars/model3.png",
        status: Status.PENDING,
      },
    ],
  });

  console.log("✅ Cars seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
