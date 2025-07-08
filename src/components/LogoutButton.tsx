"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { DoorClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseToast } from "@/lib/helperComponents";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth");
    router.push("/login");
    UseToast("Success", "Logged out successfully", "success");
  };

  return (
    <Button
      variant="destructive"
      className="w-[90%] mt-auto"
      onClick={handleLogout}
    >
      <DoorClosed size={20} className="mr-2" />
      Logout
    </Button>
  );
}
