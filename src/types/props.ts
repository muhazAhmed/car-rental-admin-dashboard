import { Status } from "@prisma/client";

export type SortKey = "year" | "status" | "createdAt";

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

export interface CarCardProps {
    car: Car;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setModal: React.Dispatch<React.SetStateAction<string>>;
    setData: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalProps {
    modal: string;
    setModal: React.Dispatch<React.SetStateAction<string>>;
    data: any;
}