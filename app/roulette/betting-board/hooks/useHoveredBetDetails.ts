import { useMemo } from "react";

import type { HoverPosition } from "../types/types";
import type { Bet } from "../types/types";

interface UseHoveredBetDetailsParams {
  hoverPosition: HoverPosition | null;
  bets: Bet[];
}

export interface HoveredBetDetails {
  label: string;
  position: HoverPosition["position"];
  totalAmount: number;
}

const sumAmountsForNumbers = (bets: Bet[], numbers: number[]) => {
  return bets.reduce((sum, bet) => {
    if (bet.type === "number" && numbers.includes(Number(bet.value))) {
      return sum + bet.amount;
    }

    if (
      (bet.type === "split" || bet.type === "corner") &&
      bet.numbers &&
      bet.numbers.some((num) => numbers.includes(num))
    ) {
      return sum + bet.amount;
    }

    return sum;
  }, 0);
};

const useHoveredBetDetails = ({
  hoverPosition,
  bets,
}: UseHoveredBetDetailsParams) => {
  return useMemo<HoveredBetDetails | null>(() => {
    if (!hoverPosition) return null;

    if (hoverPosition.type === "number") {
      const number = hoverPosition.numbers?.[0];
      if (typeof number !== "number") return null;

      const directBet = bets.find(
        (bet) =>
          bet.type === "number" &&
          typeof bet.value === "number" &&
          bet.value === number
      );
      if (!directBet) return null;

      const totalAmount = sumAmountsForNumbers(bets, [number]);
      if (totalAmount <= 0) return null;

      return {
        label: `The number ${number}`,
        position: hoverPosition.position,
        totalAmount,
      };
    }

    if (
      (hoverPosition.type === "split" || hoverPosition.type === "corner") &&
      hoverPosition.numbers &&
      hoverPosition.numbers.length > 0
    ) {
      const sortedNumbers = [...hoverPosition.numbers].sort((a, b) => a - b);
      const key = sortedNumbers.join("-");

      const directBet = bets.find(
        (bet) =>
          bet.type === hoverPosition.type &&
          typeof bet.value === "string" &&
          bet.value === key
      );
      if (!directBet) return null;

      const totalAmount = sumAmountsForNumbers(bets, sortedNumbers);
      if (totalAmount <= 0) return null;

      const labelPrefix =
        sortedNumbers.length === 1 ? "The number" : "The numbers";
      const numbersLabel = sortedNumbers.join(", ");

      return {
        label: `${labelPrefix} ${numbersLabel}`,
        position: hoverPosition.position,
        totalAmount,
      };
    }

    return null;
  }, [bets, hoverPosition]);
};

export default useHoveredBetDetails;
