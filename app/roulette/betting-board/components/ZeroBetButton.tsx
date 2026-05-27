"use client";

import type React from "react";

import { Button } from "@/components/ui/button";

import type { Bet, BoardOrientation } from "../types/types";
import { getBetLabel, getChipColorByAmount } from "../utils";
import BettingChip from "./BettingChip";

interface ZeroBetButtonProps {
  bet: Bet | undefined;
  disabled: boolean;
  onClick: () => void;
  formatAmount: (amount: number) => string;
  orientation?: BoardOrientation;
  isWinning?: boolean;
}

const ZeroBetButton: React.FC<ZeroBetButtonProps> = ({
  bet,
  disabled,
  onClick,
  formatAmount,
  orientation = "horizontal",
  isWinning = false,
}) => {
  const isVertical = orientation === "vertical";
  const sizeClasses = isVertical ? "h-20 w-full" : "h-full w-20";
  const winningClass = isWinning
    ? "ring-4 ring-amber-400 ring-offset-2 ring-offset-black shadow-[0_0_16px_rgba(251,191,36,0.7)] scale-105"
    : "";

  return (
    <Button
      title={bet ? getBetLabel(bet) : undefined}
      onClick={onClick}
      disabled={disabled}
      variant="ghost"
      className={`group relative flex items-center justify-center rounded-lg bg-(--roulette-zero) text-2xl font-bold text-white transition-all duration-200 hover:scale-105 hover:bg-green-600 active:scale-95 disabled:cursor-not-allowed [&_svg]:size-auto! [&_svg]:h-auto! [&_svg]:w-auto! [&_svg]:max-w-none! [&_svg]:max-h-none! ${sizeClasses} ${winningClass}`}
    >
      0
      {bet && (
        <>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <BettingChip
              size={64}
              color={getChipColorByAmount(bet.amount)}
              amount={formatAmount(bet.amount)}
              textClassName="text-sm"
              className="pointer-events-none drop-shadow-lg"
            />
          </div>
          <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-black/80 px-3 py-1.5 text-sm text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            {getBetLabel(bet)}
          </div>
        </>
      )}
    </Button>
  );
};

export default ZeroBetButton;
