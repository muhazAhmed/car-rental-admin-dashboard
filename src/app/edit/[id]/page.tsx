import { endpoints } from "@/lib/endpoints";
import { CustomAxios } from "@/lib/utils";
import { Car } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import Edit from "@/components/dashboard/table-action-buttons/Edit";

interface Props {
  params: { id: string };
}

export default async function EditCarPage({ params }: Props) {
  const cookieStore = cookies();
  const token = (await cookies()).get("auth");

  if (!token?.value) redirect("/login");

  const id = params.id;

  try {
    const car = await CustomAxios<Car>(`${endpoints.carById}${id}`);

    if (!car) return notFound();

    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Edit Car</h2>
        <Edit defaultValues={car} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching car:", error);
    return notFound();
  }
}
