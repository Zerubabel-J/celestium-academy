"use client";

import { motion } from "motion/react";
import type { FC } from "react";
import { Card } from "@/components/ui/card";
import type { Player } from "../../../types";
import { useBetAmount } from "../../../hooks/useBetAmount";
import { useBetCalculations } from "../../../hooks/useBetCalculations";
import { GAME_CONFIG } from "../../../constants";
import { PlaceCelestiumTitle } from "../components/PlaceCelestiumTitle";
import { BetAmountInput } from "../components/BetAmountInput";
import { ExpectedWinnings } from "../components/ExpectedWinnings";
import { PlaceBetButton } from "../components/PlaceBetButton";
import { BetStats } from "../components/BetStats";

interface StandByScreenProps {
  round: number;
  playerBet?: number;
  totalBank?: number;
  myBetVolume?: number;
  onPlaceBet: (amount: number) => void;
  isPending?: boolean;
  balance?: number;
  winningPlayer?: Player | null;
}

export const StandByScreen: FC<StandByScreenProps> = ({
  round,
  playerBet = 0,
  totalBank = 0,
  myBetVolume = 0,
  onPlaceBet,
  isPending = false,
  balance = 100000,
  winningPlayer,
}) => {
  const { amount, handleBetChange, handleSliderChange, sliderParams } =
    useBetAmount({
      initialBet: playerBet,
      balance,
    });

  const {
    betAmountNum,
    expectedWin,
    coef,
    bonusAmount,
    myPercent,
    potentialWin,
    myCoef,
  } = useBetCalculations({
    amount,
    totalBank,
    myBetVolume,
  });

  const handleBet = () => {
    if (betAmountNum < GAME_CONFIG.MIN_BET) {
      return;
    }
    if (betAmountNum > balance) {
      return;
    }
    onPlaceBet(betAmountNum);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md space-y-4 mx-auto overflow-visible"
    >
      <PlaceCelestiumTitle />

      {/* Main Card with Glow Effect */}
      <div className="relative overflow-visible p-2 shrink-0">
        <Card className="relative bg-[#131624] border-border/50 backdrop-blur-sm p-4 md:p-6 z-10 min-h-[400px] flex flex-col justify-center shadow-[0_0_80px_rgba(34,197,94,0.3),0_0_60px_rgba(74,222,128,0.25)]">
          <div className="space-y-4">
            {/* Input Label */}
            <div className="text-center">
              <p className="text-xs md:text-sm text-muted-foreground">
                Enter the amount of your CELESTIUM in CELESTIUM
              </p>
            </div>

            <BetAmountInput
              amount={amount}
              balance={balance}
              sliderParams={sliderParams}
              onBetChange={handleBetChange}
              onSliderChange={handleSliderChange}
            />

            <ExpectedWinnings
              expectedWin={expectedWin}
              bonusAmount={bonusAmount}
              coef={coef}
            />

            <PlaceBetButton
              onClick={handleBet}
              disabled={
                betAmountNum === 0 || isPending || balance < betAmountNum
              }
              isPending={isPending}
            />
          </div>
        </Card>
      </div>

      <BetStats
        myBetVolume={myBetVolume}
        myPercent={myPercent}
        potentialWin={potentialWin}
        myCoef={myCoef}
      />
    </motion.div>
  );
};
