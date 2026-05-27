"use client";

import type React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HowToPlayIcon } from "../icons/HowToPlayIcon";
import { MoneyBagIcon } from "../icons/MoneyBagIcon";
import { PaytableIcon } from "../icons/PaytableIcon";
import { ReportIcon } from "../icons/ReportIcon";

interface GameHeaderProps {
  bankBalance: string;
  payoutLimit: string;
  payoutPercentage: string;
  myCelestiums: string;
  expectedWin: string;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  bankBalance,
  payoutLimit,
  payoutPercentage,
  myCelestiums,
  expectedWin,
}) => {
  return (
    <div className="w-full px-0 py-2 sm:py-3 relative">
      <div className="border-2 bg-(--roulette-header) p-2 sm:p-4 md:p-5 rounded-none sm:rounded-lg w-full overflow-visible relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {/* Bank Section */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <MoneyBagIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 shrink-0" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm font-semibold text-white">
                  Bank
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-white shrink-0"
                >
                  <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </Button>
              </div>
              <span className="text-sm sm:text-base md:text-lg font-bold text-white">
                {bankBalance}
              </span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="h-10 sm:h-12 w-px bg-gray-600 hidden sm:block" />

          {/* Payout Limit */}
          <div className="flex flex-col shrink-0">
            <span className="text-xs sm:text-sm text-gray-400">
              Payout limit
            </span>
            <span className="text-sm sm:text-base md:text-lg font-semibold text-white">
              {payoutLimit} ({payoutPercentage})
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="h-10 sm:h-12 w-px bg-gray-600 hidden sm:block" />

          {/* My CELESTIUMs */}
          <div className="flex flex-col shrink-0">
            <span className="text-xs sm:text-sm text-gray-400">My CELESTIUMs</span>
            <span className="text-sm sm:text-base md:text-lg font-bold text-white">
              {myCelestiums}
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="h-10 sm:h-12 w-px bg-gray-600 hidden sm:block" />

          {/* Expected Win */}
          <div className="flex flex-col shrink-0">
            <span className="text-xs sm:text-sm text-yellow-500">
              Expected win
            </span>
            <span className="text-sm sm:text-base md:text-lg font-bold text-yellow-500">
              {expectedWin}
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="h-10 sm:h-12 w-px bg-gray-600 hidden lg:block" />

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 shrink-0">
            <button className="flex flex-col items-center gap-0.5 sm:gap-1 transition-colors hover:text-blue-400 shrink-0">
              <PaytableIcon className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10" />
              <span className="text-[10px] sm:text-xs font-semibold text-white">
                Paytable
              </span>
            </button>

            <button className="flex flex-col items-center gap-0.5 sm:gap-1 transition-colors hover:text-blue-400 shrink-0">
              <HowToPlayIcon className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10" />
              <span className="text-[10px] sm:text-xs font-semibold text-white">
                How to play
              </span>
            </button>

            <button className="flex flex-col items-center gap-0.5 sm:gap-1 transition-colors hover:text-blue-400 shrink-0">
              <ReportIcon className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10" />
              <span className="text-[10px] sm:text-xs font-semibold text-white">
                Report
              </span>
            </button>
          </div>
        </div>
        {/* Dark gradient overlay extending below the header */}
        <div
          className="absolute top-full left-0 right-0 h-24 sm:h-32 md:h-40 pointer-events-none z-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15, 18, 29, 0.95) 0%, rgba(15, 18, 29, 0.7) 50%, transparent 100%)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default GameHeader;
