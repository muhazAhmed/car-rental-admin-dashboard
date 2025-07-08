export interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    pricePerDay: number;
    isAvailable: boolean;
    imageUrl: string;
}

export interface SummaryDataProps {
    totalListings: number;
    pendingListings: number;
    approvedListings: number;
    rejectedListings: number;
}