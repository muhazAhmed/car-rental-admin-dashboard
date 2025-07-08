"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Pagination({
  currentPage,
  totalCount,
  limit,
}: {
  currentPage: number;
  totalCount: number;
  limit: number;
}) {
  const totalPages = Math.ceil(totalCount / limit);
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="flex justify-center gap-4 mt-6">
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Previous
      </Button>
      <span className="self-center text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
