"use client";

import Image from "next/image";
import playtableIcon from "../../assets/Roulette/playtable.svg";
import howtoplayIcon from "../../assets/Roulette/howtoplay.svg";
import reportIcon from "../../assets/Roulette/report.svg";

interface RoundInfoBarProps {
  roundId: string;
  winningPoolUsers: string;
  bonusPoolAmount: string;
  onPaytableClick?: () => void;
  onHowToPlayClick?: () => void;
  onReportClick?: () => void;
}

export function RoundInfoBar({
  roundId,
  winningPoolUsers,
  bonusPoolAmount,
  onPaytableClick,
  onHowToPlayClick,
  onReportClick,
}: RoundInfoBarProps) {
  return (
    <div className="bg-[#1a1d29] rounded-2xl px-6 py-4 lg:px-12 lg:py-5">
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Round ID
            </span>
            <span className="text-white font-medium">{roundId}</span>
          </div>

          <div className="h-12 w-px bg-gray-700" />

          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#fbbf24] uppercase tracking-wider font-semibold">
              Winning Pool
            </span>
            <span className="text-white font-medium">{winningPoolUsers}</span>
          </div>

          <div className="h-12 w-px bg-gray-700" />

          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#22d3ee] uppercase tracking-wider font-semibold">
              Bonus Pool
            </span>
            <span className="text-white font-medium">{bonusPoolAmount}</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <button
            onClick={onPaytableClick}
            className="flex flex-col items-center gap-2 group transition-opacity hover:opacity-80"
          >
            <div className="w-8 h-8 relative">
              <Image
                src={playtableIcon}
                alt="Paytable"
                width={32}
                height={32}
                className="w-full h-full"
              />
            </div>
            <span className="text-xs text-white">Paytable</span>
          </button>

          <button
            onClick={onHowToPlayClick}
            className="flex flex-col items-center gap-2 group transition-opacity hover:opacity-80"
          >
            <div className="w-8 h-8 relative">
              <Image
                src={howtoplayIcon}
                alt="How to play"
                width={32}
                height={32}
                className="w-full h-full"
              />
            </div>
            <span className="text-xs text-white">How to play</span>
          </button>

          <button
            onClick={onReportClick}
            className="flex flex-col items-center gap-2 group transition-opacity hover:opacity-80"
          >
            <div className="w-8 h-8 relative">
              <Image
                src={reportIcon}
                alt="Report"
                width={32}
                height={32}
                className="w-full h-full"
              />
            </div>
            <span className="text-xs text-white">Report</span>
          </button>
        </div>
      </div>

      <div className="lg:hidden flex flex-col gap-4">
        <div className="flex items-center justify-evenly">
          <div className="flex flex-col gap-1 flex-1 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Round ID
            </span>
            <span className="text-white font-medium text-sm">{roundId}</span>
          </div>

          <div className="h-8 w-px bg-gray-700 shrink-0" />

          <div className="flex flex-col gap-1 flex-1 text-center">
            <span className="text-xs text-[#fbbf24] uppercase tracking-wider font-semibold">
              Winning Pool
            </span>
            <span className="text-white font-medium text-sm">
              {winningPoolUsers}
            </span>
          </div>

          <div className="h-8 w-px bg-gray-700 shrink-0" />

          <div className="flex flex-col gap-1 flex-1 text-center">
            <span className="text-xs text-[#22d3ee] uppercase tracking-wider font-semibold">
              Bonus Pool
            </span>
            <span className="text-white font-medium text-sm">
              {bonusPoolAmount}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-evenly">
          <button
            onClick={onPaytableClick}
            className="flex flex-col items-center gap-1 group transition-opacity hover:opacity-80 flex-1"
          >
            <div className="w-6 h-6 relative">
              <Image
                src={playtableIcon}
                alt="Paytable"
                width={24}
                height={24}
                className="w-full h-full"
              />
            </div>
            <span className="text-xs text-white">Paytable</span>
          </button>

          <button
            onClick={onHowToPlayClick}
            className="flex flex-col items-center gap-1 group transition-opacity hover:opacity-80 flex-1"
          >
            <div className="w-6 h-6 relative">
              <Image
                src={howtoplayIcon}
                alt="How to play"
                width={24}
                height={24}
                className="w-full h-full"
              />
            </div>
            <span className="text-xs text-white">How to play</span>
          </button>

          <button
            onClick={onReportClick}
            className="flex flex-col items-center gap-1 group transition-opacity hover:opacity-80 flex-1"
          >
            <div className="w-6 h-6 relative">
              <Image
                src={reportIcon}
                alt="Report"
                width={24}
                height={24}
                className="w-full h-full"
              />
            </div>
            <span className="text-xs text-white">Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}
