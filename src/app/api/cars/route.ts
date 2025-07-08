import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "5");

        const skip = (page - 1) * limit;

        const [cars, totalCount] = await Promise.all([
            prisma.car.findMany({ skip, take: limit }),
            prisma.car.count(),
        ]);

        return NextResponse.json({ data: cars, totalCount });
    } catch (error) {
        console.error("Error fetching cars:", error);
        return NextResponse.json({ error: "Failed to load cars" }, { status: 500 });
    }
}
