import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";

const baseURL = process.env.API_URL ?? "";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function CustomAxios<T>(endpoint: string): Promise<T> {
  try {
    const url = `${baseURL}${endpoint}`;
    const response = await axios.get<T>(url, { headers: { "Cache-Control": "no-store" } });
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching from ${endpoint}:`, error);
    throw error;
  }
}