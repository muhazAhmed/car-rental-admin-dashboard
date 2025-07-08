import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const totalCars = await prisma.car.count();
        const availableCars = await prisma.car.count({
            where: { isAvailable: true },
        });

        const totalRevenue = "$21,489";

        const activeUsers = 1092;

        return NextResponse.json({
            totalRevenue,
            availableCars,
            totalCars,
            activeUsers,
        });
    } catch (error) {
        console.error(error);
        return new NextResponse("Failed to fetch summary", { status: 500 });
    }
}
