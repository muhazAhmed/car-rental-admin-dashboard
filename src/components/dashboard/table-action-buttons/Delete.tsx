"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { ModalProps } from "@/types/props";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
import React from "react";
import { deleteCarData } from "../services";

const Delete = ({ modal, setModal, data }: ModalProps) => {
  console.log(data);
  return (
    <Dialog
      open={modal === "delete"}
      onOpenChange={(val) => !val && setModal("")}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            [{data?.make} {data?.model}]
          </DialogTitle>
          <DialogDescription className="hidden">
            Modal Description
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center flex-col gap-3">
          <p className="">
            Are you sure you want to{" "}
            <span className="text-red-500 font-semibold">delete</span> this
            data?
          </p>
          <p className="text-[10px] text-gray-500">
            * This action cannot be undone.
          </p>
          <div className="flex gap-3 mt-3">
            <Button
              variant="destructive"
              onClick={() => deleteCarData(data?.id, setModal)}
            >
              <Trash />
              Delete
            </Button>
            <Button variant="outline" onClick={() => setModal("")}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
