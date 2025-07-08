"use client";

import { Car } from "@prisma/client";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, Filter, Pencil, Trash } from "lucide-react";
import CustomTooltip from "../ui/CustomTooltip";
import { formatDate } from "@/lib/utils";

export default function ListingTable({ cars }: { cars: Car[] }) {
  return (
    <Card className="p-4 mt-4">
      <div className="flex w-full items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary">Listings</h2>
        <CustomTooltip content="Filter">
          <Filter size={15} className="cursor-pointer" />
        </CustomTooltip>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Make</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.length > 0 ? (
            cars.map((item) => (
              <TableRow key={item.id}>
                <TableCell title={item.id}>{item.id.slice(0, 8)}...</TableCell>
                <TableCell>{item.make}</TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell
                  className={
                    item.isAvailable ? "text-green-400" : "text-red-500"
                  }
                >
                  {item.isAvailable ? "Available" : "Unavailable"}
                </TableCell>
                <TableCell>{statusBodyTemplate(item.status)}</TableCell>
                <TableCell>{formatDate(item?.createdAt)}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <CustomTooltip content="View" className="bg-primary">
                    <ExternalLink
                      size={18}
                      className="text-primary cursor-pointer"
                    />
                  </CustomTooltip>
                  <CustomTooltip content="Edit" className="bg-blue-500">
                    <Pencil
                      size={18}
                      className="text-blue-500 cursor-pointer"
                    />
                  </CustomTooltip>
                  <CustomTooltip content="Delete" className="bg-red-500">
                    <Trash size={18} className="text-red-500 cursor-pointer" />
                  </CustomTooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No Data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

const statusBodyTemplate = (status: string) => {
  const statusColorMap: Record<string, string> = {
    PENDING: "bg-yellow-100",
    APPROVED: "bg-primary/20",
    REJECTED: "bg-destructive/20",
  };

  const bg = statusColorMap[status] || "bg-gray-200";

  return (
    <span
      className={`${bg} rounded-md p-1 pl-3 w-[100px] flex items-center gap-2`}
    >
      {status}
    </span>
  );
};
