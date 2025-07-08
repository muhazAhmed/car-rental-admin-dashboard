"use client";

import React from "react";
import { motion } from "framer-motion";
import { SummaryDataProps } from "@/types/props";

const SummaryCard = ({ data }: { data: SummaryDataProps }) => {
  const cards = [
    { label: "Total Revenue", value: data?.totalRevenue ?? "—" },
    { label: "Available Cars", value: data?.availableCars ?? "—" },
    { label: "Active Users", value: data?.activeUsers ?? "—" },
    { label: "Total Cars", value: data?.totalCars ?? "—" },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((item, index) => (
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          key={index}
          className="flex flex-col gap-1 p-4 min-h-[90px] bg-[#F2F6FB] rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-gray-900">{item.value}</h2>
          <p className="text-[13px] text-gray-500">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryCard;
