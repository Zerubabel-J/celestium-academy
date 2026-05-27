"use client";

import type React from "react";
import { BET_AMOUNTS } from "./constants/constants";
import BettingControls from "./components/BettingControls";
import BettingGrid from "./components/BettingGrid";
import DozenBets from "./components/DozenBets";
import OutsideBets from "./components/OutsideBets";
import type { BettingBoardProps } from "./types/types";
import { formatAmount, getNumberColor } from "./utils";

const BettingBoard: React.FC<BettingBoardProps> = ({
  betting,
  disabled = false,
  winningNumber,
}) => {
  const {
    bets,
    betAmount,
    betAmountIndex,
    clearBets,
    getBetOnPosition,
    getChipPositionForBet,
    getPotentialWin,
    getTotalBet,
    gridRef,
    handleBetAmountChange,
    handleCustomBetAmount,
    handleDecreaseBetAmount,
    handleGridClick,
    handleGridMouseLeave,
    handleGridMouseMove,
    handleIncreaseBetAmount,
    handleNumberClick,
    handleOutsideBet,
    handlePlaceBet,
    handleToggleMultiplier,
    handleUndo,
    hoverPosition,
    multiplier,
    numberGrid,
    orientation,
  } = betting;
  const isVertical = orientation === "vertical";

  return (
    <div className="w-full max-w-7xl rounded-lg bg-[#1a1d2e] p-4 md:p-6">
      {isVertical ? (
        <div className="grid grid-cols-[minmax(0,120px)_1fr] gap-3 items-start">
          <div className="grid grid-cols-2 gap-2 items-stretch h-full">
            <OutsideBets
              disabled={disabled}
              formatAmount={formatAmount}
              getBetOnPosition={getBetOnPosition}
              onOutsideBet={handleOutsideBet}
              orientation={orientation}
            />

            <DozenBets
              disabled={disabled}
              formatAmount={formatAmount}
              getBetOnPosition={getBetOnPosition}
              onOutsideBet={handleOutsideBet}
              orientation={orientation}
            />
          </div>

          <BettingGrid
            bets={bets}
            disabled={disabled}
            numberGrid={numberGrid}
            orientation={orientation}
            gridRef={gridRef}
            hoverPosition={hoverPosition}
            onGridClick={handleGridClick}
            onGridMouseMove={handleGridMouseMove}
            onGridMouseLeave={handleGridMouseLeave}
            onZeroClick={() => handleNumberClick(0)}
            getBetOnPosition={getBetOnPosition}
            formatAmount={formatAmount}
            getNumberColor={getNumberColor}
            getChipPosition={getChipPositionForBet}
            winningNumber={winningNumber}
          />
        </div>
      ) : (
        <>
          <BettingGrid
            bets={bets}
            disabled={disabled}
            numberGrid={numberGrid}
            orientation={orientation}
            gridRef={gridRef}
            hoverPosition={hoverPosition}
            onGridClick={handleGridClick}
            onGridMouseMove={handleGridMouseMove}
            onGridMouseLeave={handleGridMouseLeave}
            onZeroClick={() => handleNumberClick(0)}
            getBetOnPosition={getBetOnPosition}
            formatAmount={formatAmount}
            getNumberColor={getNumberColor}
            getChipPosition={getChipPositionForBet}
            winningNumber={winningNumber}
          />

          <DozenBets
            disabled={disabled}
            formatAmount={formatAmount}
            getBetOnPosition={getBetOnPosition}
            onOutsideBet={handleOutsideBet}
            orientation={orientation}
          />

          <OutsideBets
            disabled={disabled}
            formatAmount={formatAmount}
            getBetOnPosition={getBetOnPosition}
            onOutsideBet={handleOutsideBet}
            orientation={orientation}
          />
        </>
      )}

      <BettingControls
        betAmount={betAmount}
        betAmounts={BET_AMOUNTS}
        betAmountIndex={betAmountIndex}
        disabled={disabled}
        multiplier={multiplier}
        isPlaceBetDisabled={bets.length === 0}
        formatAmount={formatAmount}
        getPotentialWin={getPotentialWin}
        getTotalBet={getTotalBet}
        onPlaceBet={handlePlaceBet}
        onToggleMultiplier={handleToggleMultiplier}
        onDecreaseBetAmount={handleDecreaseBetAmount}
        onIncreaseBetAmount={handleIncreaseBetAmount}
        onBetAmountChange={handleBetAmountChange}
        onCustomBetAmount={handleCustomBetAmount}
        onClear={clearBets}
        onUndo={handleUndo}
      />
    </div>
  );
};

export default BettingBoard;
