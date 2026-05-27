"use client";

import { useState } from "react";
import { BettingCardProps } from "../types/components";

export function BettingCard({
  league,
  date,
  team1,
  team2,
  userBet,
  winAmount,
  bonusAmount,
  team1Bets,
  team2Bets,
}: BettingCardProps) {
  const [selectedTeam, setSelectedTeam] = useState<1 | 2 | null>(null);

  return (
    <div className="w-full xl:max-w-[280px] xl:mx-auto">
      <div className="bg-[#131624] border border-[#151A2A] rounded-[10px] p-3 md:p-4 space-y-2 md:space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-abel text-[10px] md:text-[12px] leading-[13px] md:leading-[15px] text-[#FFC800]">
            {league}
          </span>
          <span className="font-abel text-[10px] md:text-[12px] leading-[13px] md:leading-[15px] text-white">
            {date}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-1.5 md:gap-2 flex-1">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-[15px] md:rounded-[20px] z-0 blur-[6px] md:blur-[8px]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(39, 174, 96, 0.6) 0%, rgba(39, 174, 96, 0.3) 40%, rgba(19, 22, 36, 0) 100%)",
                }}
              />
              <div className="relative w-[45px] h-[45px] md:w-[60px] md:h-[60px] rounded-[15px] md:rounded-[20px] overflow-hidden z-1">
                <img
                  src={team1.logo}
                  alt={team1.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="font-abel text-[11px] md:text-[14px] leading-[14px] md:leading-[18px] text-center text-white">
              {team1.name}
            </span>
          </div>

          <div className="px-2 md:px-4">
            <span className="font-abel text-[16px] md:text-[20px] leading-[20px] md:leading-[25px] text-center text-[#FFC800]">
              vs
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5 md:gap-2 flex-1">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-[15px] md:rounded-[20px] z-0 blur-[6px] md:blur-[8px]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(235, 87, 87, 0.6) 0%, rgba(235, 87, 87, 0.3) 40%, rgba(19, 22, 36, 0) 100%)",
                }}
              />
              <div className="relative w-[45px] h-[45px] md:w-[60px] md:h-[60px] rounded-[15px] md:rounded-[20px] overflow-hidden z-1">
                <img
                  src={team2.logo}
                  alt={team2.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="font-abel text-[11px] md:text-[14px] leading-[14px] md:leading-[18px] text-center text-white">
              {team2.name}
            </span>
          </div>
        </div>

        <div className="bg-[#0F121D] rounded-[10px] p-2 md:p-3 mb-1 md:mb-2">
          <div className="flex flex-row items-center justify-between gap-1">
            <div className="font-abel text-[10px] md:text-[12px] leading-[12px] md:leading-[15px] text-white whitespace-nowrap">
              {userBet} DBL
            </div>
            <div className="font-teko text-[10px] md:text-[12px] leading-[14px] md:leading-[17px] text-white text-right">
              Your win: {winAmount} (+ BONUS {bonusAmount} DBL)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#0F121D] rounded-[7px] py-1.5 md:py-2 px-2 md:px-3 flex items-center justify-between">
            <span className="font-abel text-[9px] md:text-[10px] leading-[11px] md:leading-[12px] text-[#27AE60]">
              {team1Bets.amount} DBL
            </span>
            <div className="flex items-center gap-1">
              <span className="font-abel text-[9px] md:text-[10px] leading-[11px] md:leading-[12px] text-[#27AE60]">
                {team1Bets.users}
              </span>
              <svg viewBox="0 0 12 13" className="w-[9px] h-[10px] md:w-[11.91px] md:h-[13px]">
                <path
                  d="M0 6.5C0 6.5 0 12 6 12C12 12 12 6.5 12 6.5"
                  fill="#27AE60"
                />
                <circle cx="6" cy="3.5" r="2.5" fill="#27AE60" />
              </svg>
            </div>
          </div>

          <div className="bg-[#0F121D] rounded-[7px] py-1.5 md:py-2 px-2 md:px-3 flex items-center justify-between">
            <span className="font-abel text-[9px] md:text-[10px] leading-[11px] md:leading-[12px] text-[#EB5757]">
              {team2Bets.amount} DBL
            </span>
            <div className="flex items-center gap-1">
              <span className="font-abel text-[9px] md:text-[10px] leading-[11px] md:leading-[12px] text-[#EB5757]">
                {team2Bets.users}
              </span>
              <svg viewBox="0 0 12 13" className="w-[9px] h-[10px] md:w-[11.91px] md:h-[13px]">
                <path
                  d="M0 6.5C0 6.5 0 12 6 12C12 12 12 6.5 12 6.5"
                  fill="#EB5757"
                />
                <circle cx="6" cy="3.5" r="2.5" fill="#EB5757" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <button
            onClick={() => setSelectedTeam(1)}
            className="w-full h-[30px] md:h-[35px] bg-[#27AE60] rounded-[5px] border border-[#151A2A] flex items-center justify-center"
          >
            <span className="font-abel text-[10px] md:text-[12px] leading-[12px] md:leading-[15px] text-center text-white">
              {team1.name.toUpperCase()} WIN
            </span>
          </button>
          <button
            onClick={() => setSelectedTeam(2)}
            className="w-full h-[30px] md:h-[35px] bg-[#EB5757] rounded-[5px] border border-[#151A2A] flex items-center justify-center"
          >
            <span className="font-abel text-[10px] md:text-[12px] leading-[12px] md:leading-[15px] text-center text-white">
              {team2.name.toUpperCase()} WIN
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

