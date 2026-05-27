"use client";

import type React from "react";

import { Button } from "@/components/ui/button";

import BettingChip from "./BettingChip";
import type { Bet, BoardOrientation } from "../types/types";
import { getChipColorByAmount } from "../utils";
import type { HoveredBetDetails } from "../hooks/useHoveredBetDetails";
import BettingHoverTooltip from "./BettingHoverTooltip";

interface DozenBetsProps {
  disabled: boolean;
  formatAmount: (amount: number) => string;
  getBetOnPosition: (type: string, value: number | string) => Bet | undefined;
  onOutsideBet: (type: string, value: string) => void;
  orientation?: BoardOrientation;
}

const DOZEN_LABELS = ["1 to 12", "13 to 24", "25 to 36"] as const;

const DozenBets: React.FC<DozenBetsProps> = ({
  disabled,
  formatAmount,
  getBetOnPosition,
  onOutsideBet,
  orientation = "horizontal",
}) => {
  const isVertical = orientation === "vertical";
  const containerClass = isVertical
    ? "flex flex-col items-center gap-2 h-[80%]"
    : "grid grid-cols-3 gap-3 mb-4";
  const buttonClass = isVertical
    ? "group relative z-10 flex flex-1 w-14 items-center justify-center rounded-xl bg-(--roulette-panel) px-2 text-sm font-semibold text-white transition-all duration-200 hover:z-50 hover:scale-105 hover:bg-slate-700 active:scale-95 disabled:cursor-not-allowed [&_svg]:size-auto! [&_svg]:h-auto! [&_svg]:w-auto! [&_svg]:max-w-none! [&_svg]:max-h-none!"
    : "group relative z-10 flex h-16 items-center justify-center rounded-xl bg-(--roulette-panel) px-8 text-lg font-semibold text-white transition-all duration-200 hover:z-50 hover:scale-105 hover:bg-slate-700 active:scale-95 disabled:cursor-not-allowed [&_svg]:size-auto! [&_svg]:h-auto! [&_svg]:w-auto! [&_svg]:max-w-none! [&_svg]:max-h-none!";
  const labelClass = isVertical
    ? "block text-xs font-semibold uppercase [writing-mode:vertical-rl]"
    : "";

  return (
    <div className={containerClass}>
      {DOZEN_LABELS.map((label) => {
        const bet = getBetOnPosition("dozen", label);
        const tooltipDetails: HoveredBetDetails | null = bet
          ? {
              label: `The numbers ${label}`,
              position: { row: 0, col: 0 },
              totalAmount: bet.amount,
            }
          : null;
        return (
          <Button
            key={label}
            onClick={() => onOutsideBet("dozen", label)}
            disabled={disabled}
            variant="ghost"
            className={buttonClass}
          >
            {isVertical ? <span className={labelClass}>{label}</span> : label}
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

export default DozenBets;
