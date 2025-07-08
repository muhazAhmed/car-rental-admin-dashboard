export const statusBodyTemplate = (status: string) => {
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
