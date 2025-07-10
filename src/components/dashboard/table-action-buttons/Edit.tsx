"use client";

import { Car } from "@prisma/client";
import { FieldErrors, useForm } from "react-hook-form";
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
import { motion } from "framer-motion";
import { Rotate3d, Save, Undo } from "lucide-react";
import Image from "next/image";
import CustomTooltip from "@/components/ui/CustomTooltip";

type EditCarFormValues = z.infer<typeof EditCarSchema>;
const MotionCustomButton = motion(CustomButton);

export default function Edit({ defaultValues }: { defaultValues: Car }) {
  const [viewImage, setViewImage] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditCarFormValues>({
    resolver: zodResolver(EditCarSchema),
    defaultValues,
  });

  const onInvalid = (errors: FieldErrors<EditCarFormValues>) => {
    for (const [, err] of Object.entries(errors)) {
      if (err?.message) {
        UseToast("Validation Error", err.message.toString(), "error");
      }
    }
  };

  const onSubmit = async (values: EditCarFormValues) => {
    try {
      await CustomAxios(
        `${endpoints.carById}${defaultValues.id}`,
        "PUT",
        values
      );
      router.push("/dashboard");
      UseToast("Success", "Updated successfully", "success");
    } catch (err: any) {
      console.error("Error updating car:", err);
      UseToast(
        "Error",
        "Failed to update car details. Please try again.",
        "error"
      );
    }
  };

  return (
    <motion.div className="relative w-full flex items-center justify-center">
      <CustomTooltip content={viewImage ? "Hide Image" : "View Image"}>
        <Rotate3d
          onClick={() => setViewImage((prev) => !prev)}
          className="hidden md:block absolute z-30 top-14 right-[26%] cursor-pointer bg-white p-1 rounded-full text-primary"
          size={25}
        />
      </CustomTooltip>

      <motion.div
        initial={false}
        animate={{
          scale: viewImage ? 1.1 : 1,
          zIndex: viewImage ? 20 : 10,
          opacity: viewImage ? 1 : 0.9,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="hidden md:block absolute w-[50%] h-[60vh] overflow-hidden rounded-b-xl shadow-lg mb-10"
      >
        <Image
          src={defaultValues.imageUrl}
          alt={`${defaultValues.make} ${defaultValues.model}`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      <motion.form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="backdrop-blur-md bg-white/10 border border-white/30 rounded-xl shadow-lg p-8 max-w-6xl mx-auto mt-10"
        initial={false}
        animate={{
          scale: viewImage ? 0.9 : 1,
          zIndex: viewImage ? 10 : 20,
          opacity: viewImage ? 0.5 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h2 className="text-2xl font-bold text-center mb-10 col-span-full">
          ✏️ Edit <span className="text-primary">Rental Details</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {[
            { label: "Make", name: "make" },
            { label: "Model", name: "model" },
            { label: "Image URL", name: "imageUrl" },
            { label: "Year", name: "year", type: "number" },
            { label: "Price Per Day (₹)", name: "pricePerDay", type: "number" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <Label className="text-sm">{label}</Label>
              <Input
                type={type}
                {...register(name as keyof EditCarFormValues)}
                className="bg-white/20 shadow-md  placeholder:text-white/50 border border-white/30 focus:ring-2 focus:ring-white rounded-md"
              />
            </div>
          ))}

          <div>
            <Label className="text-sm">Status</Label>
            <select
              {...register("status")}
              className="w-full bg-white/20 shadow-md border border-white/30 rounded-md p-2"
            >
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
            {errors.status && (
              <p className="text-xs text-red-300 mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm">Availability</Label>
            <select
              {...register("isAvailable")}
              className="w-full bg-white/20 shadow-md border border-white/30 rounded-md p-2"
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
            {errors.isAvailable && (
              <p className="text-xs text-red-300 mt-1">
                {errors.isAvailable.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <MotionCustomButton
            loading={isSubmitting}
            type="submit"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            className="mt-6 w-full font-semibold shadow-md"
            icon={<Save />}
            iconPosition="left"
          >
            Save Changes
          </MotionCustomButton>
          <MotionCustomButton
            whileTap={{ scale: 0.95 }}
            type="button"
            variant="outline"
            icon={<Undo />}
            className="mt-6 w-full font-semibold shadow-md"
            onClick={() => router.push("/dashboard")}
          >
            Cancel
          </MotionCustomButton>
        </div>
      </motion.form>
    </motion.div>
  );
}
