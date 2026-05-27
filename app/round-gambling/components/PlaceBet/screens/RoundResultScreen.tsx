"use client";

import { motion } from "motion/react";
import type { FC } from "react";
import { useMemo } from "react";
import { BackToGameButton } from "../BackToGameButton";
import { formatNumber } from "../../../utils/formatNumbers";
import { BETTING_CONSTANTS } from "../../../constants/betting";

interface RoundResultScreenProps {
  round: number;
  isWin: boolean;
  winAmount?: number;
  bonusAmount?: number;
  totalAmount?: number;
  totalBank?: number;
  myBetVolume?: number;
  onBackToGame: () => void;
}

export const RoundResultScreen: FC<RoundResultScreenProps> = ({
  round,
  isWin,
  winAmount = 0,
  bonusAmount = 0,
  totalAmount = 0,
  totalBank = 0,
  myBetVolume = 0,
  onBackToGame,
}) => {
  const bonus = useMemo(() => {
    if (totalBank === 0) return 0;
    const bonusPool =
      (totalBank / 100) * BETTING_CONSTANTS.BONUS_POOL_PERCENTAGE * 100;
    return bonusAmount || bonusPool * 0.1;
  }, [totalBank, bonusAmount]);

  if (myBetVolume === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grow flex flex-col gap-5 items-center justify-center min-h-[290px] md:min-h-[390px]"
      >
        <div className="flex flex-col w-3/4 h-[200px] items-center justify-center border rounded-[10px] border-yellow-400">
          <div className="text-xl font-semibold mb-4 text-white">Over</div>
          <div className="w-full flex flex-row items-center justify-center gap-1 text-white">
            Could win
            <span className="text-yellow-400 text-sm ml-1">
              {formatNumber(totalBank * BETTING_CONSTANTS.FEE_MULTIPLIER)} CELESTIUM
            </span>
          </div>
          <div className="text-blue-400 text-xs">+ bonus</div>
        </div>
        <BackToGameButton onBackToGame={onBackToGame} />
      </motion.div>
    );
  }

  if (isWin) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grow flex flex-col gap-5 items-center justify-center min-h-[290px] md:min-h-[390px]"
      >
        <div className="flex flex-col w-3/4 h-[200px] items-center justify-center border rounded-[10px] border-yellow-400">
          <div className="text-xl font-semibold mb-4 text-green-400">
            You WIN!
          </div>
          <div className="w-full flex flex-row items-center justify-center gap-1">
            <span className="text-yellow-400 text-lg font-semibold">
              {formatNumber(winAmount)} CELESTIUM
            </span>
          </div>
          <div className="text-blue-400 text-sm flex flex-row items-center justify-center gap-1">
            +bonus{" "}
            <span className="text-blue-400">{formatNumber(bonus)} CELESTIUM</span>
          </div>
          <div className="text-gray-400 text-xs mt-2">Total</div>
          <span className="text-yellow-400 text-lg font-semibold">
            {formatNumber(totalAmount)} CELESTIUM
          </span>
        </div>
        <BackToGameButton onBackToGame={onBackToGame} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="grow flex flex-col gap-5 items-center justify-center min-h-[290px] md:min-h-[390px]"
    >
      <div className="flex flex-col w-3/4 h-[200px] items-center justify-center border rounded-[10px] border-yellow-400">
        <div className="text-xl font-semibold mb-4 text-white">Your bonus</div>
        <div className="text-blue-400 text-sm flex flex-row items-center justify-center gap-1">
          +<span className="text-blue-400">{formatNumber(bonus)} CELESTIUM</span>
        </div>
      </div>
      <BackToGameButton onBackToGame={onBackToGame} />
    </motion.div>
  );
};
