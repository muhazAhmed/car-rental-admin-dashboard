import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const car = await prisma.car.findUnique({
            where: { id: params.id },
        });

        if (!car) {
            return NextResponse.json({ error: "Car not found" }, { status: 404 });
        }

        return NextResponse.json(car);
    } catch (error) {
        console.error("Error fetching car by ID:", error);
        return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 });
    }
}

