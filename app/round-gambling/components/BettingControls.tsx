"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { GAME_CONFIG } from "../constants";
import { formatShortNumber } from "../utils/formatNumbers";

interface BettingControlsProps {
  gamePhase: "waiting" | "betting" | "spinning" | "result";
  playerBet: number;
  isPlaying: boolean;
  onPlaceBet: (amount: number) => void;
  onCashOut: () => void;
  currentMultiplier: number;
  className?: string;
}

export const BettingControls: React.FC<BettingControlsProps> = ({
  gamePhase,
  playerBet,
  isPlaying,
  onPlaceBet,
  onCashOut,
  currentMultiplier,
  className,
}) => {
  const [betAmount, setBetAmount] = useState(playerBet);

  const handleBetChange = (value: string) => {
    const numValue = parseFloat(value);
    if (
      !isNaN(numValue) &&
      numValue >= GAME_CONFIG.MIN_BET &&
      numValue <= GAME_CONFIG.MAX_BET
    ) {
      setBetAmount(numValue);
    }
  };

  const handlePlaceBet = () => {
    onPlaceBet(betAmount);
  };

  const getButtonText = () => {
    switch (gamePhase) {
      case "waiting":
        return "Make the first CELESTIUM!";
      case "betting":
        return isPlaying ? "BET PLACED" : "CELESTIUM";
      case "spinning":
        return "SPINNING...";
      case "result":
        return "Round Complete";
      default:
        return "CELESTIUM";
    }
  };

  const getButtonColor = () => {
    switch (gamePhase) {
      case "waiting":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "betting":
        return isPlaying ? "bg-green-500" : "bg-yellow-500 hover:bg-yellow-600";
      case "spinning":
        return "bg-gray-500";
      case "result":
        return "bg-gray-500";
      default:
        return "bg-yellow-500 hover:bg-yellow-600";
    }
  };

  const isButtonDisabled = () => {
    switch (gamePhase) {
      case "waiting":
        return true;
      case "betting":
        return isPlaying;
      case "spinning":
        return true;
      case "result":
        return true;
      default:
        return true;
    }
  };

  const handleButtonClick = () => {
    if (gamePhase === "betting" && !isPlaying) {
      handlePlaceBet();
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">
          Enter the amount of your CELESTIUM in CELESTIUM
        </label>
        <div className="relative">
          <Input
            type="number"
            value={betAmount}
            onChange={(e) => handleBetChange(e.target.value)}
            min={GAME_CONFIG.MIN_BET}
            max={GAME_CONFIG.MAX_BET}
            step="0.01"
            className="w-full bg-gray-900/50 border-gray-700 text-white text-lg font-mono pr-16"
            disabled={
              gamePhase === "spinning" || gamePhase === "result" || isPlaying
            }
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">
            CELESTIUM
          </div>
        </div>
        <div className="text-xs text-white/50">
          Expected winnings from this CELESTIUM
        </div>
      </div>

      <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700/50">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400 font-mono">
            {(
              betAmount * (gamePhase === "spinning" ? currentMultiplier : 1)
            ).toFixed(0)}
            <span className="text-sm text-white/70 ml-2">(+ 3.27% bonus)</span>
          </div>
        </div>
      </div>

      <Button
        onClick={handleButtonClick}
        disabled={isButtonDisabled()}
        className={cn(
          "w-full h-12 text-lg font-bold text-black transition-all duration-200",
          getButtonColor(),
          isButtonDisabled() && "opacity-50 cursor-not-allowed"
        )}
      >
        {getButtonText()}
      </Button>

      {gamePhase === "waiting" && (
        <div className="text-center text-white/70 text-sm">
          First user has the biggest bonus coefficient!
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-white/50 text-xs">Your CELESTIUM</div>
          <div className="text-yellow-400 font-bold">
            {betAmount.toFixed(2)} ({((betAmount / 1000) * 100).toFixed(1)}%)
          </div>
        </div>
        <div>
          <div className="text-white/50 text-xs">Potential win</div>
          <div className="text-green-400 font-bold">
            {formatShortNumber((betAmount * currentMultiplier) / 1000)}k (
            {((currentMultiplier - 1) * 100).toFixed(1)}%)
          </div>
        </div>
      </div>
    </div>
  );
};
