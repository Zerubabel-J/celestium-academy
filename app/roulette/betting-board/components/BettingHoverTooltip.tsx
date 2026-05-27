"use client";

import type React from "react";

import type { HoveredBetDetails } from "../hooks/useHoveredBetDetails";

interface BettingHoverTooltipProps {
  details: HoveredBetDetails | null;
  formatAmount: (amount: number) => string;
  className?: string;
  labelClassName?: string;
  totalClassName?: string;
  disableGridPositioning?: boolean;
  style?: React.CSSProperties;
  gridRows?: number;
  gridCols?: number;
}

const BettingHoverTooltip: React.FC<BettingHoverTooltipProps> = ({
  details,
  formatAmount,
  className,
  labelClassName,
  totalClassName,
  disableGridPositioning = false,
  style,
  gridRows = 3,
  gridCols = 12,
}) => {
  if (!details) return null;

  const wrapperClassName = [
    "absolute z-30 pointer-events-none",
    className ?? "",
  ]
    .join(" ")
    .trim();

  const wrapperStyle = disableGridPositioning
    ? style
    : {
        top: `${((details.position.row + 0.5) / gridRows) * 100}%`,
        left: `${((details.position.col + 0.5) / gridCols) * 100}%`,
        transform: "translate(-50%, calc(-100% - 20px))",
        ...style,
      };

  const headlineClassName = [
    "text-sm font-semibold text-white whitespace-nowrap",
    labelClassName ?? "",
  ]
    .join(" ")
    .trim();

  const totalTextClassName = [
    "text-xs text-slate-300 whitespace-nowrap",
    totalClassName ?? "",
  ]
    .join(" ")
    .trim();

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      <div className="rounded-md bg-black/80 px-3 py-2 shadow-lg">
        <p className={headlineClassName}>{details.label}</p>
        <p className={totalTextClassName}>
          Total bet: {formatAmount(details.totalAmount)} CELESTIUM
        </p>
      </div>
    </div>
  );
};

export default BettingHoverTooltip;
