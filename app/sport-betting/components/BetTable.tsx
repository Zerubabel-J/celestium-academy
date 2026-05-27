"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { BetTab } from "../types/components";
import { MOCK_BET_DATA } from "../constants/betting";
import { DEFAULT_TEAM_LOGO } from "../constants/betting";

export function BetDashboard() {
  const [activeTab, setActiveTab] = useState<BetTab>("all");
  const [showCount, setShowCount] = useState(10);

  return (
    <div className="w-full p-3 md:p-6">
      <div className="mb-4 md:mb-6 flex flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button
            onClick={() => setActiveTab("all")}
            className={`h-9 md:h-11 px-3 md:px-6 text-xs md:text-sm font-medium uppercase ${
              activeTab === "all"
                ? "bg-[#F4C430] text-black hover:bg-[#F4C430]/90"
                : "bg-[#1a1a1a] text-white hover:bg-[#252525]"
            }`}
          >
            All CELESTIUMs
          </Button>
          <Button
            onClick={() => setActiveTab("my")}
            className={`h-9 md:h-11 px-3 md:px-6 text-xs md:text-sm font-medium ${
              activeTab === "my"
                ? "bg-[#F4C430] text-black hover:bg-[#F4C430]/90"
                : "bg-[#1a1a1a] text-white hover:bg-[#252525]"
            }`}
          >
            MyCELESTIUMs
          </Button>
          <Button
            onClick={() => setActiveTab("big")}
            className={`h-9 md:h-11 px-3 md:px-6 text-xs md:text-sm font-medium ${
              activeTab === "big"
                ? "bg-[#F4C430] text-black hover:bg-[#F4C430]/90"
                : "bg-[#1a1a1a] text-white hover:bg-[#252525]"
            }`}
          >
            Big hits
          </Button>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-2 md:px-3 py-1.5 md:py-2 shrink-0">
          <Eye className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-400" />
          <span className="text-xs md:text-sm text-white whitespace-nowrap">
            Show {showCount}
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="mb-4 grid grid-cols-[2fr_1.5fr_1.3fr_1.3fr_1.3fr_1.5fr_1.5fr] items-center gap-5 md:gap-10 px-4 md:px-6 text-xs uppercase text-gray-500">
            <div className="font-medium min-w-0">Games</div>
            <div className="font-medium min-w-0">Date</div>
            <div className="text-center font-medium min-w-0">1</div>
            <div className="text-center font-medium min-w-0">X</div>
            <div className="text-center font-medium min-w-0">2</div>
            <div className="text-right font-medium min-w-0">
              Total in bonus pool
            </div>
            <div className="text-right font-medium min-w-0">Total CELESTIUMs</div>
          </div>

          <div className="space-y-3">
            {MOCK_BET_DATA.map((bet) => (
              <div
                key={bet.id}
                className={`grid grid-cols-[2fr_1.5fr_1.3fr_1.3fr_1.3fr_1.5fr_1.5fr] items-center gap-5 md:gap-10 px-4 md:px-6 py-4 rounded-lg ${
                  bet.isActive ? "bg-[#131624]" : "bg-[#131624] opacity-60"
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                  <div className="flex items-center gap-2 md:gap-3 shrink-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded overflow-hidden bg-[#252525] flex items-center justify-center shrink-0">
                      <img
                        src={bet.team1Logo}
                        alt="Team 1"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            DEFAULT_TEAM_LOGO;
                        }}
                      />
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded overflow-hidden bg-[#252525] flex items-center justify-center shrink-0">
                      <img
                        src={bet.team2Logo}
                        alt="Team 2"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            DEFAULT_TEAM_LOGO;
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-sm md:text-base font-medium text-white min-w-0 truncate">
                    {bet.game}
                  </span>
                </div>

                <div className="text-sm md:text-base text-gray-400 min-w-0 truncate">
                  {bet.date}
                </div>

                <div className="flex justify-center items-center min-w-0">
                  <div
                    className={`rounded px-3 py-1.5 md:px-4 md:py-2 text-center text-xs md:text-sm font-medium whitespace-nowrap ${
                      bet.outcome1.color === "green"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : bet.outcome1.color === "red"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {bet.outcome1.amount}
                  </div>
                </div>

                <div className="flex justify-center items-center min-w-0">
                  <div
                    className={`rounded px-3 py-1.5 md:px-4 md:py-2 text-center text-xs md:text-sm font-medium whitespace-nowrap ${
                      bet.outcomeX.color === "green"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : bet.outcomeX.color === "red"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {bet.outcomeX.amount}
                  </div>
                </div>

                <div className="flex justify-center items-center min-w-0">
                  <div
                    className={`rounded px-3 py-1.5 md:px-4 md:py-2 text-center text-xs md:text-sm font-medium whitespace-nowrap ${
                      bet.outcome2.color === "green"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : bet.outcome2.color === "red"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {bet.outcome2.amount}
                  </div>
                </div>

                <div className="text-right text-sm md:text-base text-white min-w-0 truncate">
                  {bet.totalBonus}
                </div>

                <div className="text-right text-sm md:text-base text-white min-w-0 truncate">
                  {bet.totalCelestiums}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
