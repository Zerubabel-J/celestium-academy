"use client";

import type React from "react";

import type { SpinResultSummary } from "../types/results";

interface SpinControlsProps {
  isSpinning: boolean;
  onSpin: () => void;
  result?: SpinResultSummary | null;
  className?: string;
}

const formatCelestium = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

const getColorClass = (color: SpinResultSummary["winningColor"]) => {
  switch (color) {
    case "red":
      return "text-red-400";
    case "black":
      return "text-slate-200";
    case "green":
      return "text-green-400";
    default:
      return "text-white";
  }
};

const SpinControls: React.FC<SpinControlsProps> = ({
  isSpinning,
  onSpin,
  result,
  className = "",
}) => {
  const colorClass = result ? getColorClass(result.winningColor) : "text-white";
  const colorLabel = result
    ? result.winningColor.charAt(0).toUpperCase() + result.winningColor.slice(1)
    : "";

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <button
        onClick={onSpin}
        disabled={isSpinning}
        className="px-4 py-4 bg-(--roulette-number-red) disabled:bg-gray-600 disabled:cursor-not-allowed cursor-pointer text-white font-bold text-lg rounded-lg shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
      >
        {isSpinning ? "Spinning..." : "SPIN THE WHEEL"}
      </button>

      {!isSpinning && result && (
        <div className="w-full max-w-xs text-center text-white/80 bg-black/40 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-md shadow-lg">
          <div className="text-sm font-semibold text-white">
            Winning number:
            <span className={`ml-2 text-lg ${colorClass}`}>
              {result.winningNumber}
            </span>
            <span className="ml-1 text-xs uppercase text-white/60">
              ({colorLabel})
            </span>
          </div>

          {result.hadBets ? (
            result.winningBets.length > 0 ? (
              <div className="mt-2 text-sm text-green-300">
                <div className="font-semibold">
                  You won +{formatCelestium(result.totalProfit)} CELESTIUM!
                </div>
                <ul className="mt-1 space-y-1 text-xs text-white/70 text-left">
                  {result.winningBets.map((winningBet, index) => (
                    <li
                      key={`${winningBet.label}-${index}`}
                      className="flex flex-col"
                    >
                      <span className="font-medium text-white/90">
                        {winningBet.label}
                      </span>
                      <span>
                        Bet {formatCelestium(winningBet.amount)} CELESTIUM → Return{" "}
                        {formatCelestium(winningBet.totalReturn)} CELESTIUM ( +
                        {formatCelestium(winningBet.profit)} CELESTIUM)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-2 text-xs text-white/60">
                No winning bets this round. Try again!
              </div>
            )
          ) : (
            <div className="mt-2 text-xs text-white/60">
              Place a bet to join the next round.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpinControls;
