import Image from "next/image";
import foxIcon from "../assets/fox.svg";
import cashCelestiumIcon from "../assets/cash_celestium.svg";

interface PlayerCardProps {
  playerName: string;
  walletAddress: string;
  betAmount: string;
}

export function PlayerCard({
  playerName,
  walletAddress,
  betAmount,
}: PlayerCardProps) {
  return (
    <div className="relative flex items-center justify-between gap-4 rounded-lg bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="size-10 shrink-0">
          <Image
            src={foxIcon}
            alt="Player avatar"
            width={40}
            height={40}
            className="size-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {playerName}
          </span>
          <span className="text-xs text-gray-500">{walletAddress}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold text-gray-900">
          {betAmount}
        </span>
        <div className="flex size-6 items-center justify-center rounded-full bg-yellow-400">
          <Image src={cashCelestiumIcon} alt="Bet token" width={12} height={12} />
        </div>
      </div>

      <div className="absolute right-0 top-0 h-full w-1 rounded-r-lg bg-green-500" />
    </div>
  );
}
