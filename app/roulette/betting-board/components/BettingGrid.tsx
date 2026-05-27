"use client";

import type React from "react";

import type { Bet, BoardOrientation, HoverPosition } from "../types/types";
import ZeroBetButton from "./ZeroBetButton";
import NumberGridCells from "./NumberGridCells";
import BettingHoverIndicator from "./BettingHoverIndicator";
import BettingChipsOverlay from "./BettingChipsOverlay";
import BettingHoverTooltip from "./BettingHoverTooltip";
import useHoveredBetDetails from "../hooks/useHoveredBetDetails";

interface BettingGridProps {
  bets: Bet[];
  disabled: boolean;
  numberGrid: number[][];
  orientation: BoardOrientation;
  gridRef: React.RefObject<HTMLDivElement | null>;
  hoverPosition: HoverPosition | null;
  onGridClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onGridMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  onGridMouseLeave: () => void;
  onZeroClick: () => void;
  getBetOnPosition: (type: string, value: number | string) => Bet | undefined;
  formatAmount: (amount: number) => string;
  getNumberColor: (num: number) => string;
  getChipPosition: (bet: Bet) => { row: number; col: number } | null;
  winningNumber?: number | null;
}

const BettingGrid: React.FC<BettingGridProps> = ({
  bets,
  disabled,
  gridRef,
  hoverPosition,
  onGridClick,
  onGridMouseMove,
  onGridMouseLeave,
  onZeroClick,
  getBetOnPosition,
  formatAmount,
  getNumberColor,
  getChipPosition,
  numberGrid,
  orientation,
  winningNumber,
}) => {
  const zeroBet = getBetOnPosition("number", 0);
  const hoveredBetDetails = useHoveredBetDetails({
    hoverPosition,
    bets,
  });

  const rowCount = numberGrid.length;
  const colCount = numberGrid[0]?.length ?? 0;
  const aspectRatio =
    rowCount > 0 && colCount > 0 ? `${colCount} / ${rowCount}` : undefined;
  const isVertical = orientation === "vertical";

  const gridContent = (
    <div
      ref={gridRef}
      onClick={onGridClick}
      onMouseMove={onGridMouseMove}
      onMouseLeave={onGridMouseLeave}
      className="relative w-full cursor-pointer"
      style={{
        aspectRatio,
      }}
    >
      <NumberGridCells
        numberGrid={numberGrid}
        hoverPosition={hoverPosition}
        getNumberColor={getNumberColor}
        orientation={orientation}
        winningNumber={winningNumber}
      />

      <BettingHoverIndicator
        hoverPosition={hoverPosition}
        gridRows={rowCount}
        gridCols={colCount}
      />

      <BettingChipsOverlay
        bets={bets}
        numberGrid={numberGrid}
        formatAmount={formatAmount}
        getChipPosition={getChipPosition}
        gridRows={rowCount}
        gridCols={colCount}
      />

      <BettingHoverTooltip
        details={hoveredBetDetails}
        formatAmount={formatAmount}
        gridRows={rowCount}
        gridCols={colCount}
      />
    </div>
  );

  if (isVertical) {
    return (
      <div className="flex flex-col gap-2 mb-4 w-full min-w-0">
        <ZeroBetButton
          bet={zeroBet}
          disabled={disabled}
          onClick={onZeroClick}
          formatAmount={formatAmount}
          orientation={orientation}
          isWinning={winningNumber === 0}
        />

        {gridContent}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 mb-4">
      <div className="flex items-center">
        <ZeroBetButton
          bet={zeroBet}
          disabled={disabled}
          onClick={onZeroClick}
          formatAmount={formatAmount}
          orientation={orientation}
          isWinning={winningNumber === 0}
        />
      </div>

      {gridContent}
    </div>
  );
};

export default BettingGrid;
