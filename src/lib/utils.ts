import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";

const baseURL = process.env.API_URL ?? "";
export type SortDirection = "asc" | "desc";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Method = "GET" | "POST" | "PUT" | "DELETE";

export async function CustomAxios<T>(
  endpoint: string,
  method: Method = "GET",
  data: any = null
): Promise<T> {
  try {
    const url = `${baseURL}${endpoint}`;
    const config = {
      method,
      url,
      headers: { "Cache-Control": "no-store" },
      ...(data && { data }),
    };

    const response = await axios.request<T>(config);
    return response.data;
  } catch (error) {
    console.error(`❌ Error during ${method} request to ${endpoint}:`, error);
    throw error;
  }
}

export const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export function SortData<T>(
  data: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc"
): T[] {
  return [...data].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (typeof aVal === "number" || aVal instanceof Date) {
      return order === "asc" ? +aVal - +bVal : +bVal - +aVal;
    }

    if (typeof aVal === "string" && typeof bVal === "string") {
      return order === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return 0;
  });
}
