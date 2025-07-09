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
import { useState } from "react";
import { fetchCarDetails } from "./services";
import Loader from "../ui/Loader";
import View from "./table-action-buttons/View";
import { statusBodyTemplate } from "@/lib/helperComponents";
import CopyToClipboard from "../ui/CopyToClipboard";

export default function ListingTable({ cars }: { cars: Car[] }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<string>("");
  const [data, setData] = useState<Car | null>(null);

  return (
    <>
      {loading && <Loader />}
      {renderModal(modal, setModal, data)}
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
                  <TableCell>
                    <CopyToClipboard value={item.id}>
                      {item.id.slice(0, 8)}...
                    </CopyToClipboard>
                  </TableCell>
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
                        onClick={() =>
                          fetchCarDetails({
                            id: item.id,
                            setModal,
                            modalName: "view",
                            setLoading,
                            setData,
                          })
                        }
                      />
                    </CustomTooltip>
                    <CustomTooltip content="Edit" className="bg-blue-500">
                      <a href={`/edit/${item.id}`}>
                        <Pencil
                          size={18}
                          className="text-blue-500 cursor-pointer"
                        />
                      </a>
                    </CustomTooltip>
                    <CustomTooltip content="Delete" className="bg-red-500">
                      <Trash
                        size={18}
                        className="text-red-500 cursor-pointer"
                      />
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
    </>
  );
}

const renderModal = (modalName: string, setModal: any, data: any) => {
  if (modalName === "view")
    return <View modal={modalName} setModal={setModal} data={data} />;
  if (modalName === "edit") return;
  if (modalName === "delete") return;
};
