"use client";

import type React from "react";

import BettingChip from "./BettingChip";
import type { Bet } from "../types/types";
import { findNumberPosition, getChipColorByAmount } from "../utils";

interface BettingChipsOverlayProps {
  bets: Bet[];
  numberGrid: number[][];
  formatAmount: (amount: number) => string;
  getChipPosition: (bet: Bet) => { row: number; col: number } | null;
  gridRows: number;
  gridCols: number;
}

const BettingChipsOverlay: React.FC<BettingChipsOverlayProps> = ({
  bets,
  numberGrid,
  formatAmount,
  getChipPosition,
  gridRows,
  gridCols,
}) => {
  return (
    <>
      {bets.map((bet, index) => {
        if (bet.type === "number" && typeof bet.value === "number") {
          const coord = findNumberPosition(bet.value, numberGrid);
          if (!coord) return null;

          return (
            <div
              key={`${bet.type}-${bet.value}-${index}`}
              className="absolute pointer-events-none z-10"
              style={{
                top: `${
                  gridRows > 0 ? ((coord.row + 0.5) / gridRows) * 100 : 0
                }%`,
                left: `${
                  gridCols > 0 ? ((coord.col + 0.5) / gridCols) * 100 : 0
                }%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <BettingChip
                size={64}
                color={getChipColorByAmount(bet.amount)}
                amount={formatAmount(bet.amount)}
                textClassName="text-xs"
                className="pointer-events-none drop-shadow-lg"
              />
            </div>
          );
        }

        if ((bet.type === "split" || bet.type === "corner") && bet.numbers) {
          const position = getChipPosition(bet);
          if (!position) return null;

          return (
            <div
              key={`${bet.type}-${bet.value}-${index}`}
              className="absolute pointer-events-none z-10"
              style={{
                top: `${
                  gridRows > 0 ? ((position.row + 0.5) / gridRows) * 100 : 0
                }%`,
                left: `${
                  gridCols > 0 ? ((position.col + 0.5) / gridCols) * 100 : 0
                }%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <BettingChip
                size={64}
                color={getChipColorByAmount(bet.amount)}
                amount={formatAmount(bet.amount)}
                textClassName="text-xs"
                className="pointer-events-none drop-shadow-lg"
              />
            </div>
          );
        }

        return null;
      })}
    </>
  );
};

export default BettingChipsOverlay;
