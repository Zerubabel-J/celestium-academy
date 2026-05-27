"use client";

import { motion } from "motion/react";
import type { FC } from "react";

interface WaitingScreenProps {
  onSpinTheWheel?: () => void;
  isSpinning?: boolean;
}

export const WaitingScreen: FC<WaitingScreenProps> = ({
  onSpinTheWheel,
  isSpinning = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="grow relative min-h-[290px] sm:min-h-[390px] flex items-center justify-center"
    >
      <div className="flex flex-col justify-center items-center p-5 bg-gray-900/75 rounded-lg">
        <div className="flex items-end pb-4 gap-2">
          <span className="leading-[12px] text-white">Waiting</span>
        </div>
        {!isSpinning && onSpinTheWheel && (
          <button
            type="button"
            onClick={onSpinTheWheel}
            disabled={isSpinning}
            className="bg-yellow-500 disabled:bg-gray-500 rounded-lg px-6 py-2 text-black font-medium hover:bg-yellow-600"
          >
            {isSpinning ? "Spinning..." : "Spin the wheel"}
          </button>
        )}
      </div>
    </motion.div>
  );
};
