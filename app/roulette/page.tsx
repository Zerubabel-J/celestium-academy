"use client";

import { useCallback, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

import BettingBoard from "./betting-board";
import useBettingBoard from "./betting-board/hooks/useBettingBoard";
import type { Bet } from "./betting-board/types/types";
import { getBetLabel, getNumberColor } from "./betting-board/utils";
import RouletteWheel from "./roulette-wheel";
import GameHeader from "./roulette-wheel/components/GameHeader";
import RouletteMap from "./roulette-wheel/components/RouletteMap";
import { Leaderboard } from "./roulette-wheel/components/LeaderBoard";
import {
  LeaderboardForPrize,
  type LeaderboardEntry,
} from "./roulette-wheel/components/prize/LeaderboardForPrize";
import { RoulettePrizeCard } from "./roulette-wheel/components/RoulettePrizeCard";
import { RouletteHistory } from "./roulette-wheel/components/RouletteHistory";
import { RouletteStatistics } from "./roulette-wheel/components/RouletteStatistics";
import Image from "next/image";
import celestiumCoinIcon from "./roulette-wheel/assets/celestium_coin.svg";
import type {
  SpinResultSummary,
  WinningBetSummary,
} from "./roulette-wheel/types/results";

const parseRange = (value: string): [number, number] | null => {
  const match = value.match(/(\d+)\D+(\d+)/);
  if (!match) return null;

  const start = Number(match[1]);
  const end = Number(match[2]);

  if (Number.isNaN(start) || Number.isNaN(end)) return null;

  return [Math.min(start, end), Math.max(start, end)];
};

const calculateProfitForBet = (
  bet: Bet,
  winningNumber: number,
  winningColor: "red" | "black" | "green"
) => {
  const amount = bet.amount;
  let profit = 0;

  switch (bet.type) {
    case "number":
      if (typeof bet.value === "number" && bet.value === winningNumber) {
        profit = amount * 35;
      }
      break;
    case "split":
      if (bet.numbers?.includes(winningNumber)) {
        profit = amount * 17;
      }
      break;
    case "corner":
      if (bet.numbers?.includes(winningNumber)) {
        profit = amount * 8;
      }
      break;
    case "dozen":
      if (typeof bet.value === "string") {
        const range = parseRange(bet.value);
        if (range && winningNumber >= range[0] && winningNumber <= range[1]) {
          profit = amount * 2;
        }
      }
      break;
    case "outside":
      if (typeof bet.value === "string") {
        switch (bet.value) {
          case "red":
            if (winningColor === "red") profit = amount;
            break;
          case "black":
            if (winningColor === "black") profit = amount;
            break;
          case "even":
            if (winningNumber !== 0 && winningNumber % 2 === 0) {
              profit = amount;
            }
            break;
          case "odd":
            if (winningNumber !== 0 && winningNumber % 2 !== 0) {
              profit = amount;
            }
            break;
          case "1-18":
          case "19-36": {
            const range = parseRange(bet.value);
            if (
              range &&
              winningNumber >= range[0] &&
              winningNumber <= range[1]
            ) {
              profit = amount;
            }
            break;
          }
          default:
            break;
        }
      }
      break;
    default:
      break;
  }

  return {
    profit,
    totalReturn: profit > 0 ? profit + amount : 0,
  };
};

const evaluateBets = (
  bets: Bet[],
  winningNumber: number
): SpinResultSummary => {
  const winningColor = getNumberColor(
    winningNumber
  ) as SpinResultSummary["winningColor"];
  const winningBets: WinningBetSummary[] = [];

  bets.forEach((bet) => {
    const { profit, totalReturn } = calculateProfitForBet(
      bet,
      winningNumber,
      winningColor
    );

    if (profit > 0) {
      winningBets.push({
        label: getBetLabel(bet),
        amount: bet.amount,
        profit,
        totalReturn,
      });
    }
  });

  const totalProfit = winningBets.reduce((sum, bet) => sum + bet.profit, 0);
  const totalReturn = winningBets.reduce(
    (sum, bet) => sum + bet.totalReturn,
    0
  );

  return {
    winningNumber,
    winningColor,
    winningBets,
    totalProfit,
    totalReturn,
    hadBets: bets.length > 0,
  };
};

export default function Roulette() {
  const isVerticalBoard = useMediaQuery({ maxWidth: 768 });
  const betting = useBettingBoard({
    disabled: false,
    orientation: isVerticalBoard ? "vertical" : "horizontal",
  });
  const [spinResult, setSpinResult] = useState<SpinResultSummary | null>(null);
  const [resultsHistory, setResultsHistory] = useState<SpinResultSummary[]>([]);
  const betsSnapshotRef = useRef<Bet[]>([]);

  const handleSpinStart = useCallback(() => {
    betsSnapshotRef.current = betting.bets.map((bet) => ({
      ...bet,
      numbers: bet.numbers ? [...bet.numbers] : undefined,
    }));
    setSpinResult(null);
  }, [betting.bets]);

  const handleSpinComplete = useCallback(
    ({ winningNumber }: { winningNumber: number }) => {
      const result = evaluateBets(betsSnapshotRef.current, winningNumber);
      setSpinResult(result);
      setResultsHistory((prev) => [result, ...prev].slice(0, 20)); // Keep last 20 results
    },
    []
  );

  const handleBackToGame = useCallback(() => {
    setSpinResult(null);
  }, []);

  const showResultOverlay = spinResult !== null;

  // Mock leaderboard entries for prize view
  const leaderboardEntries: LeaderboardEntry[] = [
    {
      rank: 1,
      username: "CryptoKing_88",
      prize: 324,
      bonus: 46,
    },
    {
      rank: 2,
      username: "GemHunter_42",
      prize: 287,
      bonus: 41,
    },
    {
      rank: 3,
      username: "Diamond_Hands",
      prize: 245,
      bonus: 35,
    },
    {
      rank: 4,
      username: "Lucky_Strike",
      prize: 198,
      bonus: 28,
    },
    {
      rank: 5,
      username: "CelestiumMaster",
      prize: 156,
      bonus: 22,
    },
  ];

  return (
    <div className="relative flex flex-col bg-(--roulette-background) min-h-screen w-full overflow-x-hidden">
      <div className="relative flex flex-col items-start gap-6 sm:gap-8 md:gap-12 p-4 sm:p-6 md:p-8 w-full max-w-full">
        <div className="w-full flex flex-col lg:flex-row items-start gap-6 md:gap-8">
          <div className="flex-1 flex flex-col items-start gap-6 sm:gap-8 md:gap-12 w-full min-w-0">
            <div className="relative w-full">
              <div className="absolute top-0 left-0 right-0 z-20">
                <GameHeader
                  bankBalance="1,234,567 CELESTIUM"
                  payoutLimit="10M CELESTIUM"
                  payoutPercentage="95%"
                  myCelestiums="50,000 CELESTIUM"
                  expectedWin="6K CELESTIUM"
                />
              </div>

              {/* Roulette History - Floating on left, under header, above wheel */}
              <div className="hidden lg:block absolute left-0 top-[120px] z-30">
                <RouletteHistory results={resultsHistory} />
              </div>

              {/* Roulette Statistics - Floating on right, under header, above wheel */}
              <div className="hidden lg:block absolute right-0 top-[120px] z-30">
                <RouletteStatistics results={resultsHistory} />
              </div>

              <div className="translate-y-[200px] sm:translate-y-24 md:translate-y-24 overflow-visible lg:overflow-hidden">
                <RouletteWheel
                  onSpinStart={handleSpinStart}
                  onSpinComplete={handleSpinComplete}
                  result={spinResult}
                />
              </div>
            </div>

            {/* Show PrizeCard when result exists, otherwise show RouletteMap and BettingBoard */}
            {showResultOverlay && spinResult ? (
              <div className="w-full">
                {/* Container with PrizeCard and LeaderboardForPrize split horizontally */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* PrizeCard - Left Side (50%) */}
                  <div className="w-full h-[500px]">
                    <RoulettePrizeCard
                      result={spinResult}
                      totalCelestiums={35500}
                      totalUsers={1000}
                    />
                  </div>

                  {/* LeaderboardForPrize - Right Side (50%) */}
                  <div className="w-full h-[500px]">
                    <LeaderboardForPrize entries={leaderboardEntries} />
                  </div>
                </div>

                {/* Back to GAME Button */}
                <div className="w-full flex justify-center">
                  <button
                    onClick={handleBackToGame}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Image
                      src={celestiumCoinIcon}
                      alt="CELESTIUM"
                      width={20}
                      height={20}
                    />
                    Back to GAME
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="w-full max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-7xl ml-0 sm:-ml-8 md:-ml-12 lg:-ml-15 overflow-x-auto">
                  <div className="w-full scale-75 sm:scale-80 md:scale-85 origin-left">
                    <RouletteMap
                      disabled={false}
                      bets={betting.bets}
                      onNumberSelect={betting.handleNumberClick}
                      onNumbersSelect={betting.handleNumbersClick}
                      winningNumber={null}
                    />
                  </div>
                </div>

                <BettingBoard betting={betting} winningNumber={null} />
              </>
            )}
          </div>

          {/* Show Leaderboard - always visible */}
          <div className="w-full lg:w-auto lg:sticky lg:top-8">
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}
