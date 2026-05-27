"use client";

import type React from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Minus, Plus, Undo2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import BettingChip from "./BettingChip";
import { getChipColorByAmount } from "../utils";
import { getChipGlowStyle, getChipHoverGlowStyle } from "../styles/chipGlow";
import { customBetAmountSchema } from "../validation/customBetAmount";

interface BettingControlsProps {
  betAmount: number;
  betAmounts: number[];
  betAmountIndex: number;
  disabled: boolean;
  multiplier: number;
  isPlaceBetDisabled: boolean;
  formatAmount: (amount: number) => string;
  getPotentialWin: () => number;
  getTotalBet: () => number;
  onPlaceBet: () => void;
  onToggleMultiplier: () => void;
  onDecreaseBetAmount: () => void;
  onIncreaseBetAmount: () => void;
  onBetAmountChange: (index: number) => void;
  onCustomBetAmount: (amount: number) => void;
  onClear: () => void;
  onUndo: () => void;
}

const BettingControls: React.FC<BettingControlsProps> = ({
  betAmount,
  betAmounts,
  betAmountIndex,
  disabled,
  multiplier,
  isPlaceBetDisabled,
  formatAmount,
  getPotentialWin,
  getTotalBet,
  onPlaceBet,
  onToggleMultiplier,
  onDecreaseBetAmount,
  onIncreaseBetAmount,
  onBetAmountChange,
  onCustomBetAmount,
  onClear,
  onUndo,
}) => {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customAmountInput, setCustomAmountInput] = useState("");
  const [customAmountError, setCustomAmountError] = useState<string | null>(
    null
  );
  const [validatedCustomAmount, setValidatedCustomAmount] = useState<
    number | null
  >(null);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const chipSize = isDesktop ? 64 : 52;
  const chipTextClass = isDesktop ? "text-sm" : "text-xs";
  const chipGlowStyle = getChipGlowStyle(betAmount);
  const chipHoverGlowStyle = getChipHoverGlowStyle(betAmount);

  const validateCustomAmount = (value: string) => {
    const result = customBetAmountSchema.safeParse(value);

    if (result.success) {
      setCustomAmountError(null);
      setValidatedCustomAmount(result.data);
    } else {
      const message =
        result.error.errors[0]?.message ?? "Enter a valid CELESTIUM amount.";
      setCustomAmountError(message);
      setValidatedCustomAmount(null);
    }

    return result;
  };

  const openCustomModal = () => {
    if (disabled) return;

    const initialValue = String(betAmount);
    setCustomAmountInput(initialValue);
    validateCustomAmount(initialValue);
    setIsCustomModalOpen(true);
  };

  const closeCustomModal = () => {
    setIsCustomModalOpen(false);
    setCustomAmountError(null);
    setCustomAmountInput("");
    setValidatedCustomAmount(null);
  };

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      closeCustomModal();
    }
  };

  const handleCustomInputChange = (value: string) => {
    setCustomAmountInput(value);
    validateCustomAmount(value);
  };

  const handleApplyCustomAmount = () => {
    const result = validateCustomAmount(customAmountInput);

    if (!result.success) {
      return;
    }

    onCustomBetAmount(result.data);
    closeCustomModal();
  };

  return (
    <div className="w-full max-w-7xl rounded-3xl bg-(--roulette-panel) p-4 md:p-6 shadow-2xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
        <div className="flex w-full flex-col items-center gap-3 md:gap-2 md:w-auto relative z-0">
          <Button
            onClick={onPlaceBet}
            disabled={disabled || isPlaceBetDisabled}
            variant="ghost"
            className="relative flex h-[104px] w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-3xl bg-linear-to-br from-amber-300 via-yellow-300 to-amber-400 p-0 text-slate-900 shadow-[0_18px_40px_-15px_rgba(234,179,8,0.75)] transition-all duration-200 hover:scale-105 hover:from-amber-200 hover:via-yellow-300 hover:to-amber-500 hover:bg-transparent active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-600 md:h-[120px] md:gap-2 md:w-[280px] cursor-pointer isolate"
          >
            <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 transition-opacity duration-200 hover:opacity-20" />
            <span className="relative text-sm uppercase tracking-[0.3em] text-slate-900/70 md:text-[15px] md:tracking-[0.4em]">
              Place Celestium
            </span>
            <div className="relative flex items-center gap-2 md:gap-3">
              <span className="h-px w-4 bg-slate-900/25 md:w-5" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-900/60 md:text-[11px] md:tracking-[0.45em]">
                And
              </span>
              <span className="h-px w-4 bg-slate-900/25 md:w-5" />
            </div>
            <span className="relative text-xl font-black uppercase tracking-tight bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-transparent bg-clip-text drop-shadow-sm md:text-2xl">
              Win {formatAmount(getPotentialWin())}
            </span>
          </Button>
          <p className="text-center text-slate-400 text-sm">
            +{formatAmount(getTotalBet())} from placed CELESTIUMs
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-6 md:flex-1 md:flex-row md:items-center md:gap-6 relative z-10">
          <div className="w-full max-w-4xl">
            <div className="flex items-center">
              <button
                onClick={onDecreaseBetAmount}
                disabled={betAmountIndex === 0 || disabled}
                className="flex items-center justify-center w-12 h-12 bg-[#0f121d] rounded-xl hover:bg-[#252525] transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative z-10"
                aria-label="Decrease amount"
              >
                <Minus className="w-5 h-5 text-white" />
              </button>

              <div className="flex-1 relative">
                <div className="absolute -top-8 left-0 right-0 flex justify-between">
                  {betAmounts.map((amount, index) => {
                    // Position milestones in the middle section (between 15% and 85%)
                    const segmentStart = 15;
                    const segmentEnd = 85;
                    const position =
                      segmentStart +
                      (index / (betAmounts.length - 1)) *
                        (segmentEnd - segmentStart);
                    const formatLabel = (val: number) => {
                      if (val >= 1000) {
                        return `${Math.floor(val / 1000)}k`;
                      }
                      return val.toString();
                    };
                    return (
                      <span
                        key={amount}
                        className="text-white text-sm absolute -translate-x-1/2"
                        style={{ left: `${position}%` }}
                      >
                        {formatLabel(amount)}
                      </span>
                    );
                  })}
                </div>

                <div className="relative h-1">
                  <div className="absolute w-full h-1 bg-gray-700 rounded-full" />

                  {/* Progress bar - only shows progress in the selectable range */}
                  <div
                    className="absolute h-1 bg-gray-500 rounded-full"
                    style={{
                      left: "15%",
                      width: `${
                        (betAmountIndex / (betAmounts.length - 1)) * 70
                      }%`,
                    }}
                  />

                  {/* Milestone markers (with labels, can snap to) */}
                  {betAmounts.map((_, index) => {
                    const segmentStart = 15;
                    const segmentEnd = 85;
                    const position =
                      segmentStart +
                      (index / (betAmounts.length - 1)) *
                        (segmentEnd - segmentStart);
                    return (
                      <div
                        key={index}
                        className="absolute top-0 w-[2px] h-2 bg-gray-400 -translate-y-1/2 -translate-x-1/2"
                        style={{ left: `${position}%` }}
                      />
                    );
                  })}

                  {/* Slider input - mapped to the middle section only */}
                  <input
                    type="range"
                    min={0}
                    max={betAmounts.length - 1}
                    step={1}
                    value={betAmountIndex}
                    onChange={(e) => onBetAmountChange(Number(e.target.value))}
                    disabled={disabled}
                    className="absolute h-1 appearance-none bg-transparent cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(250,204,21,0.5)] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-yellow-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-[0_0_12px_rgba(250,204,21,0.5)]"
                    style={{
                      left: "15%",
                      width: "70%",
                    }}
                    aria-label="CELESTIUM amount"
                  />
                </div>
              </div>

              <button
                onClick={onIncreaseBetAmount}
                disabled={betAmountIndex === betAmounts.length - 1 || disabled}
                className="flex items-center justify-between gap-3 px-5 py-3 bg-[#0f121d] rounded-xl hover:bg-[#252525] transition-colors min-w-[160px] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative z-10"
                aria-label="Increase amount"
              >
                <span className="text-white font-semibold text-lg">
                  {formatAmount(betAmount)} CELESTIUM
                </span>
                <Plus className="w-6 h-6 text-yellow-400" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center md:flex-row md:items-center md:gap-4 relative z-10">
            <Button
              type="button"
              variant="ghost"
              onClick={openCustomModal}
              disabled={disabled}
              className="group relative flex items-center justify-center rounded-full bg-transparent p-0 transition-transform hover:scale-105 hover:bg-transparent dark:hover:bg-transparent focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer z-10 [&_svg]:size-auto! [&_svg]:h-auto! [&_svg]:w-auto! [&_svg]:max-w-none! [&_svg]:max-h-none!"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-full blur-lg opacity-70 transition-all duration-200 ease-out group-hover:blur-xl group-hover:opacity-90"
                style={chipGlowStyle}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:blur-lg"
                style={chipHoverGlowStyle}
              />
              <BettingChip
                size={chipSize}
                color={getChipColorByAmount(betAmount)}
                amount={formatAmount(betAmount)}
                textClassName={chipTextClass}
                className="pointer-events-none relative z-10"
              />
            </Button>

            <div className="flex items-center gap-2 relative z-10">
              <button
                onClick={onToggleMultiplier}
                className="flex items-center justify-center w-12 h-12 bg-[#0f121d] rounded-xl hover:bg-[#252525] transition-colors shrink-0 cursor-pointer relative z-10"
              >
                <span className="text-xl font-bold text-yellow-400">
                  x{multiplier}
                </span>
              </button>

              <button
                onClick={onClear}
                className="flex items-center justify-center gap-1 px-4 h-12 bg-[#0f121d] rounded-xl hover:bg-[#252525] transition-colors shrink-0 cursor-pointer relative z-10"
              >
                <X className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-400">
                  Clear
                </span>
              </button>

              <button
                onClick={onUndo}
                className="flex items-center justify-center gap-1 px-4 h-12 bg-[#0f121d] rounded-xl hover:bg-[#252525] transition-colors shrink-0 cursor-pointer relative z-10"
              >
                <Undo2 className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-400">
                  Undo
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isCustomModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogContent className="bg-(--roulette-panel) text-white">
          <DialogHeader>
            <DialogTitle className="pt-2">Custom bet amount</DialogTitle>
            <DialogDescription className="text-slate-300">
              Enter how many{" "}
              <span className="text-(--celestium-accent) font-semibold">CELESTIUM</span>{" "}
              tokens each chip should represent.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              autoFocus
              inputMode="decimal"
              value={customAmountInput}
              onChange={(event) => handleCustomInputChange(event.target.value)}
              placeholder="e.g. 12500 or 12.5k"
              aria-invalid={customAmountError ? true : undefined}
            />

            {customAmountError ? (
              <p className="text-sm text-red-400">{customAmountError}</p>
            ) : null}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={closeCustomModal}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleApplyCustomAmount}
              disabled={validatedCustomAmount === null}
              className="cursor-pointer"
            >
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BettingControls;
