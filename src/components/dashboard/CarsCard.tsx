import { Car } from "@/types/props";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function CarsCard({ car }: { car: Car }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <CardHeader className="py-2 px-3">
        <div className="relative w-full aspect-[3/2]">
          <Image
            src={car.imageUrl}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover rounded-md"
            sizes="100vw"
            priority
          />
        </div>
        <CardTitle className="text-lg mt-4 px-2">
          {car.make} {car.model}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-2 px-7">
        <p>Year: {car.year}</p>
        <p>Price/Day: ${car.pricePerDay}</p>
        <p className={car.isAvailable ? "text-green-600" : "text-red-500"}>
          {car.isAvailable ? "Available" : "Unavailable"}
        </p>
      </CardContent>
    </Card>
  );
}
