import { endpoints } from "@/lib/endpoints";
import { UseToast } from "@/lib/helperComponents";
import { CustomAxios } from "@/lib/utils";
import { Car } from "@prisma/client";
import { z } from "zod";

interface FetchCarDetailsProps {
    id: string;
    setModal: React.Dispatch<React.SetStateAction<string>>;
    modalName: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setData: React.Dispatch<React.SetStateAction<any>>;
}

export const fetchCarDetails = async ({ id, setModal, modalName, setLoading, setData }: FetchCarDetailsProps) => {
    try {
        setLoading(true);
        setModal(modalName);
        const ID = endpoints.carById + id
        const res = await CustomAxios<Car>(ID);
        setData(res);
    } catch (error) {
        console.error("Error fetching car details:", error);
    } finally {
        setLoading(false);
    }
}

export const EditCarSchema = z.object({
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.coerce.number().min(1900).max(new Date().getFullYear()),
    pricePerDay: z.coerce.number().min(0),
    imageUrl: z.string().url().min(1),
    isAvailable: z.coerce.boolean(),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

export const deleteCarData = async (id: string, setModal: React.Dispatch<React.SetStateAction<string>>) => {
    try {
        await CustomAxios(endpoints.carById + id, "DELETE");
        setModal("");
        UseToast("Success", "Deleted successfully", "success");
    } catch (error) {
        console.error("Error deleting car:", error);
    }
}