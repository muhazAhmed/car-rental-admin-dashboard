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
import { ArrowDown01, Filter } from "lucide-react";
import CustomTooltip from "../ui/CustomTooltip";
import { formatDate, SortData } from "@/lib/utils";
import { useState } from "react";
import { actionsButtons } from "./services";
import Loader from "../ui/Loader";
import View from "./table-action-buttons/View";
import { statusBodyTemplate } from "@/lib/helperComponents";
import CopyToClipboard from "../ui/CopyToClipboard";
import Delete from "./table-action-buttons/Delete";
import { SortKey } from "@/types/props";

export default function ListingTable({ cars }: { cars: Car[] }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<string>("");
  const [data, setData] = useState<Car | null>(null);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => () => {
    if (sortKey === key) setSortAsc((prev) => !prev);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortedCars = sortKey
    ? SortData(cars, sortKey, sortAsc ? "asc" : "desc")
    : cars;

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
              <CustomTooltip content="Sort">
                <TableHead
                  className="flex items-center cursor-pointer hover:bg-primary/10"
                  onClick={handleSort("year")}
                >
                  Year
                  <ArrowDown01 size={15} className="ml-2" />
                </TableHead>
              </CustomTooltip>
              <TableHead>Availability</TableHead>
              <TableHead>Status</TableHead>
              <CustomTooltip content="Sort">
                <TableHead
                  className="flex items-center cursor-pointer hover:bg-primary/10"
                  onClick={handleSort("createdAt")}
                >
                  Created On
                  <ArrowDown01 size={15} className="ml-2" />
                </TableHead>
              </CustomTooltip>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCars.length > 0 ? (
              sortedCars.map((item) => (
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
                    {actionsButtons({
                      item,
                      setModal,
                      setLoading,
                      setData,
                      status: item.status,
                    }).map(
                      ({
                        label,
                        icon: Icon,
                        bg,
                        className,
                        onClick,
                        href,
                        as,
                      }) => (
                        <CustomTooltip
                          key={label}
                          content={label}
                          className={bg}
                        >
                          {as === "link" ? (
                            <a href={href}>
                              <Icon size={18} className={className} />
                            </a>
                          ) : (
                            <Icon
                              size={18}
                              onClick={onClick}
                              className={className}
                            />
                          )}
                        </CustomTooltip>
                      )
                    )}
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
  if (modalName === "delete")
    return <Delete modal={modalName} setModal={setModal} data={data} />;
};
