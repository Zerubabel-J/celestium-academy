"use client";

import type React from "react";

import type { BoardOrientation, HoverPosition } from "../types/types";

interface NumberGridCellsProps {
  numberGrid: number[][];
  hoverPosition: HoverPosition | null;
  getNumberColor: (num: number) => string;
  orientation: BoardOrientation;
  winningNumber?: number | null;
}

const NumberGridCells: React.FC<NumberGridCellsProps> = ({
  numberGrid,
  hoverPosition,
  getNumberColor,
  orientation,
  winningNumber,
}) => {
  const hoveredNumbers = hoverPosition?.numbers ?? [];
  const rowCount = numberGrid.length;
  const colCount = numberGrid[0]?.length ?? 0;
  const isVertical = orientation === "vertical";
  const gapClass = isVertical ? "gap-2" : "gap-3";

  return (
    <div
      className={`grid h-full w-full ${gapClass}`}
      style={{
        gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
      }}
    >
      {numberGrid.map((row, rowIndex) =>
        row.map((num, colIndex) => {
          const color = getNumberColor(num);
          const bgColor =
            color === "red"
              ? "bg-(--roulette-number-red) hover:bg-(--roulette-number-red-hover)"
              : "bg-(--roulette-number-black) hover:bg-(--roulette-number-black-hover)";
          const isHovered =
            hoverPosition?.type === "number" && hoveredNumbers.includes(num);
          const isWinning = winningNumber === num;
          const highlightClass = isHovered
            ? "ring-4 ring-yellow-400 ring-opacity-75 scale-105"
            : "";
          const winningClass = isWinning
            ? "ring-4 ring-amber-400 ring-offset-2 ring-offset-black shadow-[0_0_16px_rgba(251,191,36,0.65)] scale-105"
            : "";

          return (
            <div
              key={`${num}-${rowIndex}-${colIndex}`}
              className={`relative flex items-center justify-center rounded-lg text-lg font-bold text-white transition-all duration-150 ${bgColor} ${highlightClass} ${winningClass}`}
            >
              {num}
            </div>
          );
        })
      )}
    </div>
  );
};

export default NumberGridCells;
