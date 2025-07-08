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
    totalRevenue: string;
    availableCars: number;
    activeUsers: number;
    totalCars: number;
}