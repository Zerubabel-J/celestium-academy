"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function CycleProgress() {
  const cycleHours = 168;
  const progress = 63.5; // Percentage
  const expectedEarnings = "280,240 CELESTIUM";

  return (
    <div className="w-full space-y-4">
      {/* Progress Bar */}
      <div className="font-abel text-lg text-white text-center">
          Cycle = {cycleHours} hours
      </div>

      <div className="relative w-full">
        <div className="w-full h-[10px] bg-[#131624] rounded-[50px] relative overflow-hidden">
          {/* Progress fill */}
          <div
            className="absolute top-0 left-0 h-full bg-[#FFC800] rounded-[50px] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Cycle Info */}


      <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-4">

        <div className="font-teko text-sm text-[#9999AD]">
          You will get 8% from weak leg in cycle = {expectedEarnings} expected
        </div>
      </div>
    </div>
  );
}
