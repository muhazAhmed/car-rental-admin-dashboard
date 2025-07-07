import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Car Rental Admin Dashboard",
  description: "Admin panel for managing car rental listings",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#ecfef3]">{children}</body>
    </html>
  );
}
