import { motion } from "motion/react";
import Image from "next/image";
import { formatCountdown, formatCurrency } from "../../../utils";
import cashCelestiumIcon from "../../../assets/Roulette/cash_celestium.svg";

type CenterBadgeProps = {
  timeLeft: number;
  hasWon?: boolean;
  hasLost?: boolean;
  winningAmount?: number;
  bonusAmount?: number;
};

export const CenterBadge = ({
  timeLeft,
  hasWon = false,
  hasLost = false,
  winningAmount = 0,
  bonusAmount = 0,
}: CenterBadgeProps) => {
  const totalWinning = winningAmount + bonusAmount;

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-500/10 bg-[radial-gradient(circle_at_top,#1c2144_0%,#0f132c_55%,#080a1c_100%)] shadow-[0_30px_90px_rgba(15,118,219,0.25)] scale-50 md:scale-100"
      style={{
        width: "clamp(10rem, 15vw, 15rem)",
        height: "clamp(10rem, 15vw, 15rem)",
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-3 text-center"
        style={{ fontSize: "clamp(0.75rem, 1.2vw, 1rem)" }}
      >
        {hasWon ? (
          <>
            <span className="text-sm uppercase tracking-[0.45em] text-slate-400">
              You win:
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl font-semibold text-yellow-400 tabular-nums">
                {formatCurrency(totalWinning)}
              </span>
              <Image
                src={cashCelestiumIcon}
                alt="CELESTIUM"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            {bonusAmount > 0 && (
              <span className="text-xs text-blue-400">
                {formatCurrency(bonusAmount)} BONUS
              </span>
            )}
          </>
        ) : hasLost ? (
          <span className="text-lg font-semibold text-white">
            Go to next round
          </span>
        ) : (
          <>
            <span className="text-sm uppercase tracking-[0.45em] text-slate-400">
              Stop game in
            </span>
            <span className="text-xl font-semibold text-white tabular-nums">
              {formatCountdown(timeLeft)}
            </span>
          </>
        )}
      </div>
    </motion.div>
  );
};
