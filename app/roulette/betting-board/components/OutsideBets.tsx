"use client";

import type React from "react";

import { Button } from "@/components/ui/button";

import BettingChip from "./BettingChip";
import BettingHoverTooltip from "./BettingHoverTooltip";
import type { Bet, BoardOrientation } from "../types/types";
import type { HoveredBetDetails } from "../hooks/useHoveredBetDetails";
import { getChipColorByAmount } from "../utils";

interface OutsideBetsProps {
  disabled: boolean;
  formatAmount: (amount: number) => string;
  getBetOnPosition: (type: string, value: number | string) => Bet | undefined;
  onOutsideBet: (type: string, value: string) => void;
  orientation?: BoardOrientation;
}

const OUTSIDE_BETS: Array<{
  label: string;
  value: string;
  color?: string;
}> = [
  { label: "1 to 18", value: "1-18" },
  { label: "Even", value: "even" },
  {
    label: "Red",
    value: "red",
    color: "bg-(--roulette-number-red) hover:bg-(--roulette-number-red-hover)",
  },
  {
    label: "Black",
    value: "black",
    color:
      "bg-(--roulette-number-black) hover:bg-(--roulette-number-black-hover)",
  },
  { label: "Odd", value: "odd" },
  { label: "19 to 36", value: "19-36" },
];

const OutsideBets: React.FC<OutsideBetsProps> = ({
  disabled,
  formatAmount,
  getBetOnPosition,
  onOutsideBet,
  orientation = "horizontal",
}) => {
  const isVertical = orientation === "vertical";
  const containerClass = isVertical
    ? "flex flex-col items-center gap-2 h-[80%]"
    : "grid grid-cols-6 gap-3 mb-6";

  return (
    <div className={containerClass}>
      {OUTSIDE_BETS.map((item) => {
        const bet = getBetOnPosition("outside", item.value);
        const bgColor =
          item.color || "bg-(--roulette-panel) hover:bg-slate-700";
        const tooltipDetails: HoveredBetDetails | null = bet
          ? {
              label: `The ${item.label} bet`,
              position: { row: 0, col: 0 },
              totalAmount: bet.amount,
            }
          : null;

        const buttonClasses = [
          "group relative z-10 flex items-center justify-center rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:z-50 hover:scale-105 active:scale-95 disabled:cursor-not-allowed [&_svg]:size-auto! [&_svg]:h-auto! [&_svg]:w-auto! [&_svg]:max-w-none! [&_svg]:max-h-none!",
          isVertical ? "flex-1 w-14 px-0" : "h-20 px-6",
          bgColor,
        ]
          .join(" ")
          .trim();

        const labelClass = isVertical
          ? "block text-xs font-semibold uppercase [writing-mode:vertical-rl]"
          : "";

        return (
          <Button
            key={item.value}
            onClick={() => onOutsideBet("outside", item.value)}
            disabled={disabled}
            variant="ghost"
            className={buttonClasses}
          >
            {isVertical ? (
              <span className={labelClass}>{item.label}</span>
            ) : (
              item.label
            )}
            {bet && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <BettingChip
                  size={64}
                  color={getChipColorByAmount(bet.amount)}
                  amount={formatAmount(bet.amount)}
                  textClassName="text-sm"
                  className="pointer-events-none drop-shadow-lg"
                />
                <BettingHoverTooltip
                  details={tooltipDetails}
                  formatAmount={formatAmount}
                  disableGridPositioning
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, calc(-100% - 16px))",
                    zIndex: 70,
                  }}
                  className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  labelClassName="text-lg"
                  totalClassName="text-sm"
                />
              </div>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default OutsideBets;
