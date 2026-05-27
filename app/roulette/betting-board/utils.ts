import { BLACK_NUMBERS, RED_NUMBERS } from "./constants/constants";
import type { Bet } from "./types/types";

export const getNumberColor = (num: number) => {
  if (num === 0) return "green";
  if (RED_NUMBERS.includes(num)) return "red";
  return "black";
};

export const formatAmount = (amount: number) => {
  if (amount >= 1000) return `${amount / 1000}k`;
  return amount.toString();
};

export const getBetLabel = (bet: Bet) => {
  if (bet.type === "number") {
    return `Number ${bet.value}`;
  }

  if ((bet.type === "split" || bet.type === "corner") && bet.numbers) {
    const prefix = bet.type === "split" ? "Split" : "Corner";
    return `${prefix}: ${bet.numbers.join(", ")}`;
  }

  const formattedType = bet.type.replace(/[-_]/g, " ");
  const capitalizedType =
    formattedType.charAt(0).toUpperCase() + formattedType.slice(1);

  return `${capitalizedType}: ${bet.value}`;
};

export const getChipColorByAmount = (amount: number) => {
  if (amount >= 500_000) return "var(--roulette-chip-red)";
  if (amount >= 200_000) return "var(--roulette-chip-pink)";
  if (amount >= 50_000) return "var(--roulette-chip-gold)";
  if (amount >= 10_000) return "var(--roulette-chip-purple)";
  return "var(--roulette-chip-blue)";
};

export const findNumberPosition = (
  target: number,
  numberGrid: number[][]
): { row: number; col: number } | null => {
  for (let row = 0; row < numberGrid.length; row++) {
    for (let col = 0; col < numberGrid[row].length; col++) {
      if (numberGrid[row][col] === target) {
        return { row, col };
      }
    }
  }

  return null;
};

export const getChipPosition = (
  bet: Bet,
  numberGrid: number[][]
): { row: number; col: number } | null => {
  if (bet.type === "split" && bet.numbers && bet.numbers.length === 2) {
    const first = findNumberPosition(bet.numbers[0], numberGrid);
    const second = findNumberPosition(bet.numbers[1], numberGrid);

    if (!first || !second) return null;

    return {
      row: (first.row + second.row) / 2,
      col: (first.col + second.col) / 2,
    };
  }

  if (bet.type === "corner" && bet.numbers && bet.numbers.length === 4) {
    const positions: { row: number; col: number }[] = [];

    for (const number of bet.numbers) {
      const position = findNumberPosition(number, numberGrid);
      if (position) {
        positions.push(position);
      }
    }

    if (positions.length === 0) return null;

    const avgRow =
      positions.reduce((sum, p) => sum + p.row, 0) / positions.length;
    const avgCol =
      positions.reduce((sum, p) => sum + p.col, 0) / positions.length;

    return { row: avgRow, col: avgCol };
  }

  return null;
};
