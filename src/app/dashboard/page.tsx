import ListingTable from "@/components/dashboard/ListingTable";
import SummaryCard from "@/components/dashboard/SummaryCard";
import Pagination from "@/components/ui/Pagination";
import { endpoints } from "@/lib/endpoints";
import { CustomAxios } from "@/lib/utils";
import { Car, SummaryDataProps } from "@/types/props";

async function getSummary(): Promise<SummaryDataProps> {
  return CustomAxios<SummaryDataProps>(endpoints.summary);
}

async function getPaginatedCars(page: number, limit: number) {
  const response = await CustomAxios<{ data: Car[]; totalCount: number }>(
    `${endpoints.cars}?page=${page}&limit=${limit}`
  );
  return response;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const limit = 5;

  const { data: cars, totalCount } = await getPaginatedCars(page, limit);
  const summary = await getSummary();

  return (
    <>
      <SummaryCard data={summary} />
      <ListingTable cars={cars} />
      <Pagination currentPage={page} totalCount={totalCount} limit={limit} />
    </>
  );
}
