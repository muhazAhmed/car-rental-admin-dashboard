import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";

export async function GET() {
    try {
        const totalListings = await prisma.car.count();
        const pendingListings = await prisma.car.count({ where: { status: Status.PENDING } });
        const approvedListings = await prisma.car.count({ where: { status: Status.APPROVED } });
        const rejectedListings = await prisma.car.count({ where: { status: Status.REJECTED } });

        return NextResponse.json({
            totalListings,
            pendingListings,
            approvedListings,
            rejectedListings,
        });
    } catch (error) {
        console.error(error);
        return new NextResponse("Failed to fetch summary", { status: 500 });
    }
}
