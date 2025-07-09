import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const CarUpdateSchema = z.object({
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.coerce.number().min(1900).max(new Date().getFullYear()),
    pricePerDay: z.coerce.number().min(0),
    imageUrl: z.string().url().min(1),
    isAvailable: z.boolean(),
    status: z.enum(["APPROVED", "PENDING", "REJECTED"]),
});

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    try {
        const car = await prisma.car.findUnique({ where: { id } });

        if (!car) {
            return NextResponse.json({ error: "Car not found" }, { status: 404 });
        }

        return NextResponse.json(car);
    } catch (error) {
        console.error("Error fetching car:", error);
        return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    try {
        const body = await req.json();
        const parsed = CarUpdateSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid input", issues: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const updatedCar = await prisma.car.update({
            where: { id },
            data: parsed.data,
        });

        return NextResponse.json(updatedCar);
    } catch (error) {
        console.error("Error updating car:", error);
        return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    try {
        const car = await prisma.car.findUnique({ where: { id } });

        if (!car) {
            return NextResponse.json({ error: "Car not found" }, { status: 404 });
        }

        await prisma.car.delete({ where: { id } });

        return NextResponse.json({ message: "Car deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting car:", error);
        return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
    }
}
