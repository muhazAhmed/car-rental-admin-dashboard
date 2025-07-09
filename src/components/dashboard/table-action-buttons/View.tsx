"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { statusBodyTemplate } from "@/lib/helperComponents";
import { ModalProps } from "@/types/props";

const View = ({ modal, setModal, data }: ModalProps) => {
  if (!data) return null;

  return (
    <Dialog
      open={modal === "view"}
      onOpenChange={(val) => !val && setModal("")}
    >
      <DialogContent className="p-3">
        <DialogHeader className="hidden">
          <DialogTitle>{`${data.make} ${data.model}`}</DialogTitle>
          <DialogDescription>Card Description</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-[3/2]">
            <Image
              src={data.imageUrl}
              alt={`${data.make} ${data.model}`}
              fill
              className="object-cover rounded-md"
              sizes="100vw"
              priority
            />
          </div>

          <div className="grid grid-cols-2 gap-4 px-2 text-sm">
            <InfoItem label="Make" value={data.make} />
            <InfoItem label="Model" value={data.model} />
            <InfoItem label="Year" value={data.year} />
            <InfoItem label="Price/Day" value={`$${data.pricePerDay}`} />
            <InfoItem label="Status" value={statusBodyTemplate(data.status)} />
            <InfoItem
              label="Available"
              value={data.isAvailable ? "Yes" : "No"}
            />
            <div />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <p className="text-muted-foreground">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default View;
