"use client";

import { ReactNode, useState } from "react";
import { Bell, Car, Home, Menu, User2, Users, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import SearchBar from "@/components/ui/SearchBar";
import { Suspense } from "react";
import Loader from "@/components/ui/Loader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen">
      {!sidebarOpen && (
        <Button
          onClick={toggleSidebar}
          className="md:hidden p-3 absolute top-4 left-4 z-50 bg-transparent text-black border-2 hover:bg-transparent border-gray-400"
        >
          <Menu size={20} />
        </Button>
      )}
      <aside
        className={cn(
          "fixed z-40 top-0 left-0 h-screen w-64 bg-[#EBEFF8] backdrop-blur-md border-r shadow-lg p-4 flex flex-col space-y-4 text-black",
          "transition-transform duration-300 ease-in-out transform",
          "md:relative md:translate-x-0 md:flex",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="text-2xl font-bold mb-6">🚗Dashboard</div>
        {sidebarOpen && (
          <Button
            onClick={toggleSidebar}
            className="md:hidden p-2 absolute top-1 right-1 z-50 bg-transparent text-black border-2 hover:bg-transparent border-gray-400"
          >
            <X size={20} />
          </Button>
        )}

        <nav className="space-y-4 flex-1">
          <NavItem
            href="/dashboard"
            icon={<Home size={20} />}
            current={pathname}
          >
            Dashboard
          </NavItem>
          <NavItem
            href="/dashboard/cars"
            icon={<Car size={20} />}
            current={pathname}
          >
            Cars
          </NavItem>
          <NavItem
            href="/dashboard/users"
            icon={<Users size={20} />}
            current={pathname}
          >
            Users
          </NavItem>
        </nav>

        <LogoutButton />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center bg-[#EBF0F6] backdrop-blur-md border-b shadow-md px-6 py-3">
          <Suspense fallback={<Loader />}>
            <SearchBar />
          </Suspense>
          <div className="flex items-center gap-4">
            <Bell className="cursor-pointer" size={20} />
            <User2
              className="cursor-pointer border-2 border-black rounded-full"
              size={23}
            />
          </div>
        </header>

        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  current,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  current: string;
  children: React.ReactNode;
}) {
  const isActive = current === href;
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition text-md",
        "hover:bg-primary hover:text-white",
        isActive && "bg-primary/20 text-primary font-semibold"
      )}
    >
      {icon}
      {children}
    </Link>
  );
}
