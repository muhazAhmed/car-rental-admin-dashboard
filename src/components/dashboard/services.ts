import { endpoints } from "@/lib/endpoints";
import { CustomAxios } from "@/lib/utils";
import { Car } from "@prisma/client";

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