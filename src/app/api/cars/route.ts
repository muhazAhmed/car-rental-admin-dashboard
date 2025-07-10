import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "5");
        const search = searchParams.get("search") || "";
        const rawStatus = searchParams.get("status");
        const status = rawStatus && rawStatus !== "undefined" ? rawStatus : undefined;
        const year = parseInt(search);
        const isValidYear = !isNaN(year);


        const skip = (page - 1) * limit;

        const searchFilter: any = {
            ...(search && {
                OR: [
                    { make: { contains: search } },
                    { model: { contains: search } },
                    ...(isValidYear ? [{ year: { equals: year } }] : []),
                ],
            }),
            ...(status && status !== "ALL" && { status }),
        };

        const [cars, totalCount] = await Promise.all([
            prisma.car.findMany({
                where: searchFilter,
                skip,
                take: limit,
                orderBy: {
                    createdAt: "desc",
                },
            }),
            prisma.car.count({ where: searchFilter }),
        ]);

        return NextResponse.json({ data: cars, totalCount });
    } catch (error) {
        console.error("Error fetching cars:", error);
        return NextResponse.json({ error: "Failed to load cars" }, { status: 500 });
    }
}
