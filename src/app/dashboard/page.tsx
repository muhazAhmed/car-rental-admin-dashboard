import ListingTable from "@/components/dashboard/ListingTable";
import SummaryCard from "@/components/dashboard/SummaryCard";
import Pagination from "@/components/ui/Pagination";
import { endpoints } from "@/lib/endpoints";
import { CustomAxios } from "@/lib/utils";
import { Car, SummaryDataProps } from "@/types/props";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getSummary(): Promise<SummaryDataProps> {
  return CustomAxios<SummaryDataProps>(endpoints.summary);
}

async function getPaginatedCars(page: number, limit: number, search: string) {
  const response = await CustomAxios<{ data: Car[]; totalCount: number }>(
    `${endpoints.cars}?page=${page}&limit=${limit}&search=${search}`
  );
  return response;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const token = (await cookies()).get("auth");

  if (!token?.value) {
    redirect("/login?error=unauthenticated");
  }

  const { page: pageParam, search = "" } = await searchParams;
  const pageNumber = parseInt(pageParam || "1");
  const limit = 5;

  const { data: cars, totalCount } = await getPaginatedCars(
    pageNumber,
    limit,
    search
  );
  const summary = await getSummary();

  return (
    <>
      <SummaryCard data={summary} />
      <ListingTable cars={cars} />
      <Pagination
        currentPage={pageNumber}
        totalCount={totalCount}
        limit={limit}
      />
    </>
  );
}
