"use client";

import { Car } from "@prisma/client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

export default function ListingTable() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/cars")
      .then((res) => setCars(res.data))
      .catch(() => setCars([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-sm">Loading cars...</p>;
  if (cars.length === 0)
    return <p className="text-center text-sm text-muted">No cars available.</p>;

  return (
    <Card className="p-4 mt-4">
      <h2 className="text-lg font-semibold mb-4 text-primary">Car Listings</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Make</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell>{car.id}</TableCell>
              <TableCell>{car.make}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.year}</TableCell>
              <TableCell>
                {car.isAvailable ? "Available" : "Unavailable"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
