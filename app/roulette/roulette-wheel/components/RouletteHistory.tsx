"use client";

import type { SpinResultSummary } from "../types/results";
import { ROULETTE_NUMBERS } from "../constants/constants";

interface RouletteHistoryProps {
  results: SpinResultSummary[];
}

const getNumberColor = (number: number): "red" | "black" | "green" => {
  const rouletteNumber = ROULETTE_NUMBERS.find((item) => item.num === number);
  return rouletteNumber?.color || "black";
};

export function RouletteHistory({ results }: RouletteHistoryProps) {
  // Show last 15 results in chronological order
  const displayResults = [...results].slice(-15);

  if (displayResults.length === 0) {
    return null;
  }

  return (
    <div className="hidden lg:flex flex-col w-64 rounded-2xl p-3 h-[400px] relative" style={{ backgroundColor: "var(--roulette-panel)" }}>
      <div className="relative w-full h-full">
        {displayResults.map((result, index) => {
          const color = getNumberColor(result.winningNumber);
          const rowPosition = index * 56; // Vertical spacing between rows (tile height + gap)
          
          // Determine column position based on color
          let columnClass = "";
          let backgroundColor = "";
          
          if (color === "red") {
            columnClass = "left-0"; // Left column
            backgroundColor = "var(--roulette-number-red)";
          } else if (color === "green") {
            columnClass = "left-1/2 transform -translate-x-1/2"; // Center column
            backgroundColor = "var(--roulette-zero)";
          } else {
            columnClass = "right-0"; // Right column
            backgroundColor = "var(--roulette-number-black)";
          }

          return (
            <div
              key={`${result.winningNumber}-${index}`}
              className={`absolute w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-lg ${columnClass}`}
              style={{
                top: `${rowPosition}px`,
                backgroundColor: backgroundColor,
              }}
            >
              {result.winningNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}

