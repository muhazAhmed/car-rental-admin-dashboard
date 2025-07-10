import { endpoints } from "@/lib/endpoints";
import { CustomAxios } from "@/lib/utils";
import { Car } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import Edit from "@/components/dashboard/table-action-buttons/Edit";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCarPage({ params }: Props) {
  const token = (await cookies()).get("auth");

  if (!token?.value) {
    redirect("/login?error=unauthenticated");
  }

  if (!token?.value) redirect("/login");
  const { id } = await params;

  try {
    const car = await CustomAxios<Car>(`${endpoints.carById}${id}`);

    if (!car) return notFound();

    return (
      <div className="flex items-center justify-center relative h-screen w-screen">
        <Edit defaultValues={car} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching car:", error);
    return notFound();
  }
}
