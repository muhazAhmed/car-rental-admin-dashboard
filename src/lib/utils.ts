import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";

const baseURL = process.env.API_URL ?? "";

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