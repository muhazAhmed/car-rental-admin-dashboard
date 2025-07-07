import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const cars = await prisma.car.findMany();
        return NextResponse.json(cars);
    } catch (error) {
        console.error("Error fetching cars:", error);
        return NextResponse.json({ error: "Failed to load cars" }, { status: 500 });
    }
}
