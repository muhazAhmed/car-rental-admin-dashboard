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
        make: "Rolls-Royce (Mansory)",
        model: "Phantom",
        year: 2022,
        pricePerDay: 300,
        isAvailable: true,
        imageUrl: "/cars/rr-mansory.png",
        status: Status.APPROVED,
      },
      {
        make: "Lamborghini",
        model: "Aventador",
        year: 2023,
        pricePerDay: 500,
        isAvailable: false,
        imageUrl: "/cars/aventador.png",
        status: Status.REJECTED,
      },
      {
        make: "Bugatti",
        model: "Chiron",
        year: 2022,
        pricePerDay: 400,
        isAvailable: true,
        imageUrl: "/cars/chiron.png",
        status: Status.APPROVED,
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
