"use client";

import Image from "next/image";
import cashCelestiumIcon from "../../assets/Roulette/cash_celestium.svg";
import foxIcon from "../../assets/Roulette/fox.svg";
import type { Player } from "../../types";

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="bg-[#0f121d] rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center">
          <Image
            src={player.avatar || foxIcon}
            alt={player.name}
            width={32}
            height={32}
          />
        </div>
        <div>
          <div className="text-white font-medium">{player.name}</div>
          <div className="text-[#6B7280] text-sm">{player.address}</div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[#FFC800] font-bold">{player.celestiums}</span>
          <Image src={cashCelestiumIcon} alt="CELESTIUM" width={20} height={20} />
        </div>
        <div className="flex items-center gap-2">
          <Image src={player.crystal} alt="Crystal" width={24} height={24} />
          {player.status === "win" && (
            <span className="px-2 py-1 text-xs font-semibold rounded-md bg-green-500/20 text-green-400 border border-green-500/30">
              WIN
            </span>
          )}
          {player.status === "lose" && (
            <span className="px-2 py-1 text-xs font-semibold rounded-md bg-red-500/20 text-red-400 border border-red-500/30">
              LOSE
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
