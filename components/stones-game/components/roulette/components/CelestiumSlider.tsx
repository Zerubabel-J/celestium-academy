"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { StoneView } from "../../../types";
import { STONES } from "../../../constants/stones";
import { formatCurrency } from "../../../utils";
import cashCelestiumIcon from "../../../assets/Roulette/cash_celestium.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TransactionModal } from "../../TransactionModal";

interface CelestiumSliderProps {
  betAmount: number;
  onBetAmountChange: (value: number) => void;
  selectedStoneId: string;
  onSelectStone: (stoneId: string) => void;
  onPlaceBet: () => void;
  isSpinning: boolean;
  selectedStone?: StoneView;
  bonusEstimate: number;
}

export default function CelestiumSlider({
  betAmount,
  onBetAmountChange,
  selectedStoneId,
  onSelectStone,
  onPlaceBet,
  isSpinning,
  selectedStone,
  bonusEstimate,
}: CelestiumSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const MAX_BET = 5000;
  const currentSliderValue = Math.round((betAmount / MAX_BET) * 100);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    const newBetAmount = Math.round((newValue / 100) * MAX_BET);
    onBetAmountChange(newBetAmount);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newValue = Math.round(percentage);
    const newBetAmount = Math.round((newValue / 100) * MAX_BET);
    onBetAmountChange(newBetAmount);
  };

  const potentialWinning = selectedStone
    ? betAmount * (selectedStone.multiplier || 0)
    : 0;

  const handleBetClick = () => {
    setShowTransactionModal(true);
  };

  const handleTransactionComplete = () => {
    setShowTransactionModal(false);
    onPlaceBet();
  };

  return (
    <div className="w-full">
      <TransactionModal
        open={showTransactionModal}
        onOpenChange={setShowTransactionModal}
        betAmount={betAmount}
        potentialWinning={potentialWinning}
        onTransactionComplete={handleTransactionComplete}
      />
      <div className="w-full grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h2 className="text-white text-lg font-medium uppercase tracking-wide">
            CELESTIUM amount
          </h2>

          <div className="bg-black border border-gray-700 rounded-lg px-4 py-4 flex items-center justify-between h-[60px]">
            <div className="flex items-center gap-3">
              <Image
                src={cashCelestiumIcon}
                alt="CELESTIUM icon"
                width={28}
                height={28}
              />
              <span className="text-white text-xl font-medium">
                {formatCurrency(betAmount)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div
              className="relative py-2 cursor-pointer"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={currentSliderValue}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #FFC800 0%, #FFC800 ${currentSliderValue}%, #374151 ${currentSliderValue}%, #374151 100%)`,
                }}
              />
            </div>

            <div className="relative">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">0%</span>
                <span className="text-gray-400 text-sm">100%</span>
              </div>
              <div
                className="absolute top-1 text-[#FFC800] text-base font-bold whitespace-nowrap"
                style={{ left: `calc(${currentSliderValue}% - 20px)` }}
              >
                {currentSliderValue}%
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-lg font-medium uppercase tracking-wide opacity-0">
            Spacer
          </div>

          <Button
            onClick={handleBetClick}
            disabled={isSpinning}
            className="w-full bg-[#FFC800] hover:bg-[#E6B400] text-black font-bold text-base rounded-lg transition-colors h-[60px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Bet and win {formatCurrency(potentialWinning)} CELESTIUM +{" "}
            {formatCurrency(bonusEstimate)} Bonus
          </Button>

          <div className="flex justify-between">
            {STONES.map((stone) => (
              <Tooltip key={stone.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onSelectStone(stone.id)}
                    disabled={isSpinning}
                    className={`relative w-16 h-16 rounded-xl bg-gray-900 flex items-center justify-center transition-all cursor-pointer ${
                      selectedStoneId === stone.id
                        ? "ring-2 ring-[#FFC800] shadow-[0_0_20px_rgba(255,200,0,0.5)]"
                        : "hover:bg-gray-800"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Image
                      src={stone.icon}
                      alt={stone.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="text-base">
                  <p>{stone.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #ffc800;
          border-radius: 50%;
          border: 4px solid #1f2937;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #ffc800;
          border-radius: 50%;
          border: 4px solid #1f2937;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
