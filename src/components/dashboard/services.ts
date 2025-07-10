import { endpoints } from "@/lib/endpoints";
import { UseToast } from "@/lib/helperComponents";
import { CustomAxios } from "@/lib/utils";
import { Car } from "@prisma/client";
import { Check, ExternalLink, Pencil, Trash, X } from "lucide-react";
import { z } from "zod";

interface FetchCarDetailsProps {
    id: string;
    setModal: React.Dispatch<React.SetStateAction<string>>;
    modalName: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setData: React.Dispatch<React.SetStateAction<any>>;
}

interface ActionButtonsProps {
    item: Car;
    setModal: React.Dispatch<React.SetStateAction<string>>;
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
    make: z.string({ required_error: "Make name is required" }).min(1, "Make name is required"),
    model: z.string({ required_error: "Model name is required" }).min(1, "Model name is required"),
    year: z
        .coerce
        .number({ invalid_type_error: "Year must be a number" })
        .min(1900, "Year must be after 1900")
        .max(new Date().getFullYear(), `Year cannot exceed ${new Date().getFullYear()}`),
    pricePerDay: z
        .coerce
        .number({ invalid_type_error: "Price must be a number" })
        .min(0, "Price cannot be negative"),
    imageUrl: z.string().optional(),
    isAvailable: z.coerce.boolean({ invalid_type_error: "Availability must be true or false" }),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"], {
        required_error: "Status is required",
        invalid_type_error: "Invalid status",
    }),
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

export const actionsButtons = ({ item, setModal, setLoading, setData }: ActionButtonsProps) => [
    {
        label: "View",
        icon: ExternalLink,
        bg: "bg-primary",
        className: "text-primary cursor-pointer",
        onClick: () =>
            fetchCarDetails({
                id: item.id,
                setModal,
                modalName: "view",
                setLoading,
                setData,
            }),
    },
    {
        label: "Approve",
        icon: Check,
        bg: "bg-primary",
        className: "text-primary cursor-pointer bg-primary/20 rounded-full p-1",
        // onClick: () => handleStatusUpdate(item.id, "APPROVED"),
    },
    {
        label: "Reject",
        icon: X,
        bg: "bg-red-500",
        className: "text-red-500 cursor-pointer bg-red-500/20 rounded-full p-1",
        // onClick: () => handleStatusUpdate(item.id, "REJECTED"),
    },
    {
        label: "Edit",
        icon: Pencil,
        bg: "bg-blue-500",
        className: "text-blue-500 cursor-pointer",
        as: "link",
        href: `/edit/${item.id}`,
    },
    {
        label: "Delete",
        icon: Trash,
        bg: "bg-red-500",
        className: "text-red-500 cursor-pointer",
        onClick: () =>
            fetchCarDetails({
                id: item.id,
                setModal,
                modalName: "delete",
                setLoading,
                setData,
            }),
    },
];