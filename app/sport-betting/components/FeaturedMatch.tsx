"use client";

import { useState } from "react";
import { useSportBetting } from "../hooks/useSportBetting";
import {
  getLastName,
  calculatePotentialWin,
  calculateBonusAmount,
} from "../utils/helpers";

export function FeaturedMatch() {
  const [selectedBet, setSelectedBet] = useState<"team1" | "team2" | null>(
    null
  );
  const [betAmount, setBetAmount] = useState(1000);
  const [isPlacingBet, setIsPlacingBet] = useState(false);

  const { featuredMatch, bettingStats, placeBet } = useSportBetting();

  const handlePlaceBet = async (betType: "team1" | "team2") => {
    if (!featuredMatch || isPlacingBet) return;

    setIsPlacingBet(true);
    try {
      await placeBet(featuredMatch.id, betType, betAmount);
      setSelectedBet(betType);
    } catch (error) {
      console.error("Failed to place bet:", error);
      alert("Failed to place bet. Please try again.");
    } finally {
      setIsPlacingBet(false);
    }
  };

  if (!featuredMatch) {
    return (
      <div className="relative w-full min-h-[400px] md:min-h-[434px] flex items-center justify-center bg-[#131624] rounded-[10px]">
        <div className="text-white">Loading featured match...</div>
      </div>
    );
  }

  const matchStats = bettingStats[featuredMatch.id];
  const potentialWin = calculatePotentialWin(betAmount);
  const bonusAmount = calculateBonusAmount(betAmount);

  const team1LastName = getLastName(featuredMatch.team1.name);
  const team2LastName = getLastName(featuredMatch.team2.name);

  return (
    <div className="relative w-full">
      <div className="relative w-full min-h-[400px] md:min-h-[434px] bg-[#131624] rounded-[10px] overflow-hidden p-4 md:p-6 lg:p-8">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, #1C223A 0%, #0F1221 100%)",
          }}
        />

        <div className="absolute inset-0 border border-[#151A2A] rounded-[10px] box-border" />

        <div
          className="absolute left-[-5%] md:left-[-21px] bottom-0 w-[45%] md:w-[272px] h-[300px] md:h-[434px] z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(39, 174, 96, 0.5) 0%, rgba(39, 174, 96, 0.3) 30%, rgba(39, 174, 96, 0.1) 60%, rgba(15, 18, 29, 0) 100%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute left-[-5%] md:left-[-21px] bottom-0 w-[45%] md:w-[272px] h-[300px] md:h-[434px] mix-blend-normal opacity-80 md:opacity-100 z-[1] md:hidden"
          style={{
            backgroundImage: "url('/sport-betting/humans/human_left.png')",
            backgroundSize: "auto 100%",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute left-[-5%] md:left-[-21px] bottom-0 w-[45%] md:w-[272px] h-[300px] md:h-[434px] mix-blend-normal opacity-80 md:opacity-100 z-[1] hidden md:block"
          style={{
            backgroundImage: "url('/sport-betting/humans/human_left.png')",
            backgroundSize: "contain",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div
          className="absolute right-[-5%] md:right-[0] md:left-auto bottom-0 w-[45%] md:w-[238px] h-[300px] md:h-[434px] z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(235, 87, 87, 0.5) 0%, rgba(235, 87, 87, 0.3) 30%, rgba(235, 87, 87, 0.1) 60%, rgba(15, 18, 29, 0) 100%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute right-[-5%] md:right-[0] md:left-auto bottom-0 w-[45%] md:w-[238px] h-[300px] md:h-[434px] opacity-80 md:opacity-100 z-[1]"
          style={{
            backgroundImage: "url('/sport-betting/humans/human_right.png')",
            backgroundSize: "contain",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-3 md:space-y-4">
          <div className="w-[100px] md:w-[146.96px] h-[34px] md:h-[50px] mt-8 md:mt-0">
            <img
              src="/sport-betting/logo-ufc/logo_ufc.png"
              alt="UFC"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="text-center">
            <div className="font-abel text-[10px] md:text-[11px] leading-[14px]">
              <span className="text-[#FFC800]">{featuredMatch.league}</span>
              <span className="text-white">
                {" "}
                {new Date(featuredMatch.date).toLocaleDateString()}{" "}
                {new Date(featuredMatch.date).toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 md:gap-6 px-4">
              <div className="font-abel text-[16px] md:text-[20px] lg:text-[24px] leading-[31px] text-right text-white whitespace-nowrap">
                {team1LastName.toUpperCase()}
              </div>

              <div className="font-waiting-for-the-sunrise font-light text-[32px] md:text-[40px] lg:text-[50px] leading-[60px] md:leading-[83px] text-center text-[#FFC800]">
                vs
              </div>

              <div className="font-abel text-[16px] md:text-[20px] lg:text-[24px] leading-[31px] text-white whitespace-nowrap">
                {team2LastName.toUpperCase()}
              </div>
            </div>
            <div className="font-teko text-[10px] md:text-[12px] leading-[14px] text-[#FFC800] -mt-4 md:-mt-5">
              WORLD LIGHTWEIGHT CHAMPIONSHIP
            </div>
          </div>

          <div className="w-full px-4 flex justify-center">
            <div className="w-full max-w-[272px] md:max-w-[276px] bg-[#0F121D] rounded-[10px] py-4 px-4">
              <div className="font-abel text-[16px] md:text-[18px] leading-[23px] text-center text-white">
                {betAmount} DBL
              </div>
              <div className="font-teko text-[11px] md:text-[12px] leading-[17px] text-center text-white">
                Your win: {potentialWin} DBL{" "}
                <span className="text-[#27AE60]">
                  (+ BONUS {bonusAmount} DBL)
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 md:gap-4 justify-center w-full px-4">
            <div className="flex-1 max-w-[130px] min-w-[130px] bg-[#0F121D] rounded-[7px] py-3 px-3 flex items-center justify-between">
              <div className="font-abel text-[10px] leading-[12px] text-[#27AE60]">
                {matchStats?.team1_total_bets || 0} DBL
              </div>
              <div className="flex items-center gap-2">
                <div className="font-abel text-[10px] leading-[12px] text-[#27AE60]">
                  {matchStats?.team1_total_users || 0}
                </div>
                <div className="w-[11.91px] h-[13px]">
                  <svg viewBox="0 0 12 13" className="w-full h-full">
                    <path
                      d="M0 6.5C0 6.5 0 12 6 12C12 12 12 6.5 12 6.5"
                      fill="#27AE60"
                    />
                    <circle cx="6" cy="3.5" r="2.5" fill="#27AE60" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-[130px] min-w-[130px] bg-[#0F121D] rounded-[7px] py-3 px-3 flex items-center justify-between">
              <div className="font-abel text-[10px] leading-[12px] text-[#EB5757]">
                {matchStats?.team2_total_bets || 0} DBL
              </div>
              <div className="flex items-center gap-2">
                <div className="font-abel text-[10px] leading-[12px] text-[#EB5757]">
                  {matchStats?.team2_total_users || 0}
                </div>
                <div className="w-[11.91px] h-[13px]">
                  <svg viewBox="0 0 12 13" className="w-full h-full">
                    <path
                      d="M0 6.5C0 6.5 0 12 6 12C12 12 12 6.5 12 6.5"
                      fill="#EB5757"
                    />
                    <circle cx="6" cy="3.5" r="2.5" fill="#EB5757" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 md:gap-4 justify-center w-full px-4">
            <button
              onClick={() => handlePlaceBet("team1")}
              disabled={isPlacingBet}
              className="flex-1 max-w-[130px] min-w-[130px] h-[40px] md:h-[45px] bg-[#27AE60] rounded-[5px] border border-[#151A2A] disabled:opacity-50 flex items-center justify-center"
            >
              <span className="font-abel text-[10px] md:text-[12px] leading-[12px] text-center text-white px-2 whitespace-nowrap">
                {isPlacingBet ? "PLACING BET..." : "ISLAM MAKHACHEV WIN"}
              </span>
            </button>

            <button
              onClick={() => handlePlaceBet("team2")}
              disabled={isPlacingBet}
              className="flex-1 max-w-[130px] min-w-[130px] h-[40px] md:h-[45px] bg-[#EB5757] rounded-[5px] border border-[#151A2A] disabled:opacity-50 flex items-center justify-center"
            >
              <span className="font-abel text-[10px] md:text-[12px] leading-[12px] text-center text-white px-2 whitespace-nowrap">
                {isPlacingBet ? "PLACING BET..." : "CONOR MCGREGOR WIN"}
              </span>
            </button>
          </div>

          <div className="text-center px-4">
            <div className="font-teko text-[11px] md:text-[12px] leading-[17px] text-[#6A6F84]">
              By Betting earlier you get a bigger{" "}
              <span className="text-[#27AE60]">BONUS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
