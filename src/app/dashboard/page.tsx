import CarsCard from "@/components/dashboard/CarsCard";
import SummaryCard from "@/components/dashboard/SummaryCard";
import { endpoints } from "@/lib/endpoints";
import { CustomAxios } from "@/lib/utils";
import { Car, SummaryDataProps } from "@/types/props";

async function getCars(): Promise<Car[]> {
  return CustomAxios<Car[]>(endpoints.cars);
}

async function getSummary(): Promise<SummaryDataProps> {
  return CustomAxios<SummaryDataProps>(endpoints.summary);
}

export default async function DashboardPage() {
  let cars: Car[] = [];
  let summary: SummaryDataProps | null = null;

  try {
    cars = await getCars();
    summary = await getSummary();
  } catch (err) {
    console.error("Failed to fetch cars:", err);
  }

  if (!cars.length) {
    return (
      <div className="p-6 text-center text-red-500">
        No cars available or failed to load.
      </div>
    );
  }

  return (
    <>
      {summary && <SummaryCard data={summary} />}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cars.map((car) => (
          <CarsCard key={car.id} car={car} />
        ))}
      </div>
    </>
  );
}
