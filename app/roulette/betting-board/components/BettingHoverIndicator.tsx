"use client";

import type React from "react";

import type { HoverPosition } from "../types/types";

interface BettingHoverIndicatorProps {
  hoverPosition: HoverPosition | null;
  gridRows: number;
  gridCols: number;
}

const BettingHoverIndicator: React.FC<BettingHoverIndicatorProps> = ({
  hoverPosition,
  gridRows,
  gridCols,
}) => {
  if (
    !hoverPosition ||
    (hoverPosition.type !== "split" && hoverPosition.type !== "corner")
  ) {
    return null;
  }

  const top =
    gridRows > 0
      ? ((hoverPosition.position.row + 0.5) / gridRows) * 100
      : 0;
  const left =
    gridCols > 0
      ? ((hoverPosition.position.col + 0.5) / gridCols) * 100
      : 0;

  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="w-14 h-14 rounded-full border-4 border-yellow-400 animate-pulse shadow-[0_0_20px_rgba(250,204,21,0.6)]"
        style={{
          background:
            hoverPosition.type === "split"
              ? "radial-gradient(circle, rgba(250,204,21,0.4) 0%, rgba(250,204,21,0.1) 70%, transparent 100%)"
              : "radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(236,72,153,0.1) 70%, transparent 100%)",
        }}
      />
    </div>
  );
};

export default BettingHoverIndicator;
