import CarsCard from "@/components/dashboard/CarsCard";
import { endpoints } from "@/lib/endpoints";
import { CustomAxios } from "@/lib/utils";
import { Car } from "@/types/props";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getCars(): Promise<{ data: Car[]; totalCount: number }> {
  return CustomAxios<{ data: Car[]; totalCount: number }>(endpoints.cars);
}
export default async function CarsPage() {
  const token = (await cookies()).get("auth");

  if (!token?.value) {
    redirect("/login?error=unauthenticated");
  }
  const cars = await getCars();

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {cars &&
        cars?.data.map((car: Car) => <CarsCard key={car.id} car={car} />)}
    </div>
  );
}
