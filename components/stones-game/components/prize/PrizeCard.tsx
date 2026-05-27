import Image from "next/image";
import { Users } from "lucide-react";
import { formatCurrency } from "../../utils";
import type { StaticImageData } from "next/image";
import cashIcon from "../../assets/Roulette/cash.svg";
import bigDuck from "../../assets/Roulette/big_duck.png";

interface PrizeCardProps {
  totalCelestiums: number;
  totalUsers: number;
  prize: number;
  bonus: number;
  crystalIcon?: StaticImageData | string;
  hasWon?: boolean;
}

export function PrizeCard({
  totalCelestiums,
  totalUsers,
  prize,
  bonus,
  crystalIcon,
  hasWon = true,
}: PrizeCardProps) {
  return (
    <div className="relative w-full h-full p-1 rounded-3xl bg-linear-to-br from-yellow-600/50 via-yellow-500/30 to-yellow-600/50">
      <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-yellow-500/20 via-transparent to-yellow-500/20 blur-xl" />

      <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden h-full">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-2 md:gap-4 p-3 md:p-6 h-full items-stretch">
          <div className="flex flex-col items-center justify-center space-y-2 md:space-y-3 text-center min-w-0 py-2 md:py-0">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-orange-500/40 scale-150" />
              {crystalIcon && (
                <Image
                  src={crystalIcon}
                  alt="Crystal"
                  width={120}
                  height={120}
                  className="relative drop-shadow-[0_0_25px_rgba(251,146,60,0.8)]"
                />
              )}
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-bold text-yellow-400">
                {formatCurrency(totalCelestiums)} Total CELESTIUMs
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <span className="text-base">
                  {formatCurrency(totalUsers)} users
                </span>
                <Users className="w-4 h-4" />
              </div>
            </div>

            <div
              className={`text-5xl font-bold tracking-tight ${
                hasWon ? "text-white" : "text-red-400"
              }`}
            >
              {hasWon ? "WIN!" : "LOSE"}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-yellow-400">
                {formatCurrency(prize)}
              </span>
              <Image
                src={cashIcon}
                alt="CELESTIUM"
                width={32}
                height={32}
                className="drop-shadow-[0_0_10px_rgba(252,211,77,0.6)]"
              />
            </div>

            <div className="text-xl font-semibold text-blue-400">
              {formatCurrency(bonus)} BONUS
            </div>
          </div>

          <div className="flex items-end justify-center md:justify-end h-auto md:h-full min-w-0 -mt-4 md:mt-0">
            <div className="relative w-full h-auto md:h-full flex items-end justify-center md:justify-end">
              <Image
                src={bigDuck}
                alt="Duck with treasure"
                width={400}
                height={500}
                className="w-full h-auto md:h-full object-contain object-bottom drop-shadow-2xl md:scale-100 scale-[0.9] max-h-[300px] md:max-h-none md:min-h-[450px]"
                style={{
                  maxWidth: "100%",
                }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
