"use client";

import { Car } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { endpoints } from "@/lib/endpoints";
import { CustomAxios } from "@/lib/utils";
import { EditCarSchema } from "../services";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/ui/CustomButton";
import { UseToast } from "@/lib/helperComponents";

type EditCarFormValues = z.infer<typeof EditCarSchema>;

export default function Edit({ defaultValues }: { defaultValues: Car }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditCarFormValues>({
    resolver: zodResolver(EditCarSchema),
    defaultValues,
  });

  const [error, setError] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (values: EditCarFormValues) => {
    try {
      setError("");
      await CustomAxios(
        `${endpoints.carById}${defaultValues.id}`,
        "PUT",
        values
      );
      router.push("/dashboard/cars"); // or /dashboard if listings are shown there
      UseToast("Success", "Updated successfully", "success");
    } catch (err: any) {
      console.error("Error updating car:", err);
      setError("Failed to update car. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold text-primary mb-4">
        Edit Car Listing
      </h2>

      {[
        { label: "Make", name: "make" },
        { label: "Model", name: "model" },
        { label: "Image URL", name: "imageUrl" },
      ].map(({ label, name }) => (
        <div key={name}>
          <Label>{label}</Label>
          <Input {...register(name as keyof EditCarFormValues)} />
          {errors[name as keyof EditCarFormValues] && (
            <p className="text-xs text-red-500 mt-1">
              {errors[name as keyof EditCarFormValues]?.message?.toString()}
            </p>
          )}
        </div>
      ))}

      <div>
        <Label>Year</Label>
        <Input type="number" {...register("year")} />
        {errors.year && (
          <p className="text-xs text-red-500 mt-1">{errors.year.message}</p>
        )}
      </div>

      <div>
        <Label>Price Per Day (₹)</Label>
        <Input type="number" {...register("pricePerDay")} />
        {errors.pricePerDay && (
          <p className="text-xs text-red-500 mt-1">
            {errors.pricePerDay.message}
          </p>
        )}
      </div>

      <div>
        <Label>Status</Label>
        <select
          {...register("status")}
          className="w-full border rounded-md p-2"
        >
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
        {errors.status && (
          <p className="text-xs text-red-500 mt-1">{errors.status.message}</p>
        )}
      </div>

      <div>
        <Label>Availability</Label>
        <select
          {...register("isAvailable")}
          className="w-full border rounded-md p-2"
        >
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
        {errors.isAvailable && (
          <p className="text-xs text-red-500 mt-1">
            {errors.isAvailable.message}
          </p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <CustomButton loading={isSubmitting} type="submit" className="w-full">
        Save Changes
      </CustomButton>
    </form>
  );
}
