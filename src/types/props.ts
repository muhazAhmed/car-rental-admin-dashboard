import { Status } from "@prisma/client";

export interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    pricePerDay: number;
    isAvailable: boolean;
    imageUrl: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}

export interface SummaryDataProps {
    totalListings: number;
    pendingListings: number;
    approvedListings: number;
    rejectedListings: number;
}