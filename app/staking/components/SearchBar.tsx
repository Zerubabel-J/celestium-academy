"use client";

import { Input } from "@/components/ui/input";
import { Search, Wallet } from "lucide-react";

export function SearchBar() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full">
      {/* Search Input */}
      <div className="relative flex-1 w-full md:w-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A6F84]" />
        <Input
          placeholder="Search"
          className="w-full h-[31px] bg-[#131624] border-none pl-10 pr-4 text-[#6A6F84] font-teko text-xs rounded-[5px]"
        />
      </div>

      {/* Balance Display */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#131624] border border-[#151A2A] rounded-[5px] h-[31px]">
        <div className="w-5 h-5 bg-[#FFC800] rounded-full flex items-center justify-center">
          {/* Placeholder icon */}
        </div>
        <span className="font-teko text-xs text-[#FFC800]">3,500,100 CELESTIUM</span>
      </div>

      {/* Wallet Address */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#131624] border border-[#FFC800] rounded-[5px] h-[31px]">
        <Wallet className="w-5 h-5 text-[#FFC800]" />
        <span className="font-teko text-xs text-white">0x52....331</span>
      </div>
    </div>
  );
}
