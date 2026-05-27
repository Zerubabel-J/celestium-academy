import Image from "next/image";
import type { StaticImageData } from "next/image";

interface RoundInfoWinProps {
  roundId: string;
  winningPoolUsers: string;
  bonusPoolAmount: string;
  roundIdIcon: StaticImageData | string;
  winningPoolIcon: StaticImageData | string;
  bonusPoolIcon: StaticImageData | string;
}

export function RoundInfoWin({
  roundId,
  winningPoolUsers,
  bonusPoolAmount,
  roundIdIcon,
  winningPoolIcon,
  bonusPoolIcon,
}: RoundInfoWinProps) {
  return (
    <div className="bg-[#1a1d29] rounded-2xl px-6 py-4 lg:px-12 lg:py-5">
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <Image
              src={roundIdIcon}
              alt="Round ID"
              width={56}
              height={50}
              className="h-12 w-auto"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Round ID
            </span>
            <span className="text-white font-medium">{roundId}</span>
          </div>
        </div>

        <div className="h-12 w-px bg-gray-700" />

        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <Image
              src={winningPoolIcon}
              alt="Winning Pool"
              width={56}
              height={50}
              className="h-12 w-auto"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#fbbf24] uppercase tracking-wider font-semibold">
              Winning Pool
            </span>
            <span className="text-white font-medium">{winningPoolUsers}</span>
          </div>
        </div>

        <div className="h-12 w-px bg-gray-700" />

        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <Image
              src={bonusPoolIcon}
              alt="Bonus Pool"
              width={56}
              height={50}
              className="h-12 w-auto"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#22d3ee] uppercase tracking-wider font-semibold">
              Bonus Pool
            </span>
            <span className="text-white font-medium">{bonusPoolAmount}</span>
          </div>
        </div>
      </div>

      <div className="lg:hidden flex flex-col gap-4">
        <div className="flex items-center justify-evenly">
          <div className="flex items-center gap-3 flex-1">
            <div className="shrink-0">
              <Image
                src={roundIdIcon}
                alt="Round ID"
                width={40}
                height={36}
                className="h-10 w-auto"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Round ID
              </span>
              <span className="text-white font-medium text-sm">{roundId}</span>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-700 shrink-0" />

          <div className="flex items-center gap-3 flex-1">
            <div className="shrink-0">
              <Image
                src={winningPoolIcon}
                alt="Winning Pool"
                width={40}
                height={36}
                className="h-10 w-auto"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-[#fbbf24] uppercase tracking-wider font-semibold">
                Winning Pool
              </span>
              <span className="text-white font-medium text-sm">
                {winningPoolUsers}
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-700 shrink-0" />

          <div className="flex items-center gap-3 flex-1">
            <div className="shrink-0">
              <Image
                src={bonusPoolIcon}
                alt="Bonus Pool"
                width={40}
                height={36}
                className="h-10 w-auto"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-[#22d3ee] uppercase tracking-wider font-semibold">
                Bonus Pool
              </span>
              <span className="text-white font-medium text-sm">
                {bonusPoolAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
