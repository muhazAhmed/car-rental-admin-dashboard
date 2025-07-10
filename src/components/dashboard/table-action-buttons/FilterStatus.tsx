"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  value: string;
};

export default function FilterStatus({ value }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "ALL") params.delete("status");
    else params.set("status", val);
    params.set("page", "1");
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <Select value={value} onValueChange={handleFilterChange}>
      <SelectTrigger className="w-[180px] flex gap-2 items-center">
        <FilterIcon size={16} />
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="APPROVED">Approved</SelectItem>
          <SelectItem value="REJECTED">Rejected</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
