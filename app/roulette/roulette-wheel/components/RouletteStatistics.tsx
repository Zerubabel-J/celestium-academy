"use client";

import type { SpinResultSummary } from "../types/results";
import { ROULETTE_NUMBERS } from "../constants/constants";

interface RouletteStatisticsProps {
  results: SpinResultSummary[];
}

const getNumberColor = (number: number): "red" | "black" | "green" => {
  const rouletteNumber = ROULETTE_NUMBERS.find((item) => item.num === number);
  return rouletteNumber?.color || "black";
};

export function RouletteStatistics({ results }: RouletteStatisticsProps) {
  if (results.length === 0) {
    return null;
  }

  // Count frequency of each number
  const numberFrequency = new Map<number, number>();
  results.forEach((result) => {
    const count = numberFrequency.get(result.winningNumber) || 0;
    numberFrequency.set(result.winningNumber, count + 1);
  });

  // Get hot numbers (most frequent) - top 3
  const hotNumbers = Array.from(numberFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([num]) => num);

  // Get cold numbers (least frequent) - bottom 3
  const coldNumbers = Array.from(numberFrequency.entries())
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([num]) => num);

  // Calculate Red/Black percentages
  let redCount = 0;
  let blackCount = 0;
  results.forEach((result) => {
    const color = getNumberColor(result.winningNumber);
    if (color === "red") {
      redCount++;
    } else if (color === "black") {
      blackCount++;
    }
  });
  const totalRedBlack = redCount + blackCount;
  const redPercentage = totalRedBlack > 0 ? Math.round((redCount / totalRedBlack) * 100) : 0;
  const blackPercentage = totalRedBlack > 0 ? Math.round((blackCount / totalRedBlack) * 100) : 0;

  // Calculate Odd/Even percentages
  let oddCount = 0;
  let evenCount = 0;
  results.forEach((result) => {
    if (result.winningNumber === 0) {
      // Skip zero for odd/even calculation
      return;
    }
    if (result.winningNumber % 2 === 0) {
      evenCount++;
    } else {
      oddCount++;
    }
  });
  const totalOddEven = oddCount + evenCount;
  const oddPercentage = totalOddEven > 0 ? Math.round((oddCount / totalOddEven) * 100) : 0;
  const evenPercentage = totalOddEven > 0 ? Math.round((evenCount / totalOddEven) * 100) : 0;

  return (
    <div className="hidden lg:flex flex-col w-64 rounded-2xl p-4 gap-6" style={{ backgroundColor: "var(--roulette-panel)" }}>
      {/* Hot/Cold Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-white font-bold text-sm uppercase text-center">Hot/Cold</h3>
        <div className="flex gap-3 justify-center">
          {/* Hot Numbers - Left Stack (Red) */}
          <div className="flex flex-col gap-2">
            {hotNumbers.map((num, index) => (
              <div
                key={`hot-${num}-${index}`}
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-lg"
                style={{
                  backgroundColor: "var(--roulette-number-red)",
                }}
              >
                {num}
              </div>
            ))}
          </div>
          {/* Cold Numbers - Right Stack (Blue) */}
          <div className="flex flex-col gap-2">
            {coldNumbers.map((num, index) => (
              <div
                key={`cold-${num}-${index}`}
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-lg"
                style={{
                  backgroundColor: "#2a3ffb",
                }}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Red/Black Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-white font-bold text-sm uppercase text-center">Red/Black</h3>
        <div className="flex gap-3 justify-center">
          {/* Red Box */}
          <div
            className="w-20 h-12 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-lg"
            style={{
              backgroundColor: "var(--roulette-number-red)",
            }}
          >
            {redPercentage}%
          </div>
          {/* Black Box */}
          <div 
            className="w-20 h-12 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-lg border border-gray-400"
            style={{
              backgroundColor: "var(--roulette-number-black)",
            }}
          >
            {blackPercentage}%
          </div>
        </div>
      </div>

      {/* Odd/Even Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-white font-bold text-sm uppercase text-center">Odd/Even</h3>
        <div className="w-full h-12 rounded-lg flex items-center justify-center border border-gray-400 bg-transparent">
          <div className="flex w-full h-full">
            {/* Left Side - Odd */}
            <div className="flex-1 flex items-center justify-center text-white font-bold text-base border-r border-gray-400">
              {oddPercentage}%
            </div>
            {/* Right Side - Even */}
            <div className="flex-1 flex items-center justify-center text-white font-bold text-base">
              {evenPercentage}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

