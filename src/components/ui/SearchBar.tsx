"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const current = new URLSearchParams(searchParams.toString());
      if (search) current.set("search", search);
      else current.delete("search");
      current.set("page", "1");

      router.push(`/dashboard?${current.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="ml-12 md:ml-0 relative w-[50%] md:w-[30%] border-2 border-gray-300 shadow-sm rounded-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={16} />
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="pl-8 placeholder-gray-400"
      />
    </div>
  );
}
