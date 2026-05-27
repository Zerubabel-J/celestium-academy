"use client";

import Image from "next/image";
import { Users, UserCircle } from "lucide-react";
import cashCelestiumIcon from "../../assets/Roulette/cash_celestium.svg";

interface StatsBarProps {
  totalVolume?: number;
  totalPlayers?: number;
  yourCelestium?: number;
  potentialWin?: number;
  multiplier?: number;
}

export function StatsBar({
  totalVolume = 35500,
  totalPlayers = 1000,
  yourCelestium = 35500,
  potentialWin = 12800,
  multiplier = 3.96,
}: StatsBarProps) {
  return (
    <div className="bg-[#1A1E2E] rounded-2xl p-6">
      <div className="bg-[#0F121D] rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#FFC800] text-xl ">
              {totalVolume.toLocaleString()}
            </span>
            <Image src={cashCelestiumIcon} alt="CELESTIUM" width={20} height={20} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#4ADE80] text-xl ">
              {totalPlayers.toLocaleString()}
            </span>
            <Users className="w-5 h-5 text-[#4ADE80]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#3B82F6] text-xl ">
              {totalVolume.toLocaleString()}
            </span>
            <UserCircle className="w-5 h-5 text-[#3B82F6]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#0F121D] rounded-xl p-4">
          <div className="text-[#6B7280] text-sm mb-2">Your CELESTIUM</div>
          <div className="text-[#FFC800] text-2xl ">
            {yourCelestium.toLocaleString()}
          </div>
        </div>
        <div className="bg-[#0F121D] rounded-xl p-4">
          <div className="text-[#6B7280] text-sm mb-2">Potential Win</div>
          <div className="text-[#8B5CF6] text-2xl ">
            {potentialWin.toLocaleString()}{" "}
            <span className="text-base">({multiplier.toFixed(2)}X)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
