"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Player } from "../types";
import foxIcon from "../assets/fox.svg";
import celestiumCoinIcon from "../assets/celestium_coin.svg";
import { formatNumber } from "../utils/formatNumbers";
import { useProcessedPlayers } from "../hooks/useProcessedPlayers";
import { SEGMENT_COLORS } from "../constants/betting";
import {
  getTrophyIcon,
  getRankBorderColor,
  getRankBorderRightColor,
  getShortAddressFromPlayer,
  getMultiplierDisplay,
  getCelestiumDisplay,
} from "../utils/leaderboard";

interface PlayerLeaderboardProps {
  players: Player[];
  currentMultiplier: number;
  gamePhase:
    | "standby"
    | "waiting"
    | "betting"
    | "spinning"
    | "landed"
    | "stopped";
  className?: string;
}

export const PlayerLeaderboard: React.FC<PlayerLeaderboardProps> = ({
  players,
  currentMultiplier,
  gamePhase,
  className,
}) => {
  const [activeTab, setActiveTab] = useState("players");
  const { processedPlayers, summaryStats } = useProcessedPlayers({
    players,
    gamePhase,
  });

  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      <div className="flex gap-4 mb-6 shrink-0">
        <button
          onClick={() => setActiveTab("players")}
          className={`px-8 py-3 rounded-xl font-semibold text-sm transition-colors ${
            activeTab === "players"
              ? "bg-[#FBB040] text-[#1A1D29]"
              : "bg-[#1E2130] text-[#6B7280]"
          }`}
        >
          Players
        </button>
        <button
          onClick={() => setActiveTab("celestiums")}
          className={`px-8 py-3 rounded-xl font-semibold text-sm transition-colors ${
            activeTab === "celestiums"
              ? "bg-[#FBB040] text-[#1A1D29]"
              : "bg-[#1E2130] text-[#6B7280]"
          }`}
        >
          CELESTIUMs
        </button>
        <button
          onClick={() => setActiveTab("bonus")}
          className={`px-8 py-3 rounded-xl font-semibold text-sm transition-colors ${
            activeTab === "bonus"
              ? "bg-[#FBB040] text-[#1A1D29]"
              : "bg-[#1E2130] text-[#6B7280]"
          }`}
        >
          Bonus rank
        </button>
      </div>

      <div className="bg-[#0F1117] rounded-3xl p-5 space-y-3 flex-1 overflow-y-auto min-h-0">
        {processedPlayers.map((player, index) => {
          const trophyIcon = getTrophyIcon(player.rank);
          const borderColor = getRankBorderColor(player.rank);
          const showAccent = !player.rank && index > 2;

          const originalIndex = players.findIndex(
            (p) => p.id === player.id || p.username === player.username
          );
          const segmentColor =
            originalIndex >= 0
              ? SEGMENT_COLORS[originalIndex % SEGMENT_COLORS.length]
              : null;
          const accentColor = showAccent ? segmentColor : null;
          const rankBorderColor = getRankBorderRightColor(player.rank);

          return (
            <div key={player.id || index} className="relative">
              <div
                className={`bg-[#1A1D29] rounded-2xl p-4 ${
                  player.rank ? `border-2 ${borderColor}` : ""
                }`}
                style={
                  accentColor
                    ? {
                        borderRight: `6px solid ${accentColor}`,
                      }
                    : rankBorderColor
                    ? {
                        borderRight: `8px solid ${rankBorderColor}`,
                      }
                    : undefined
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 relative shrink-0">
                      <Image
                        src={foxIcon}
                        alt="Player avatar"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <div className="text-[#9CA3AF] text-sm font-medium">
                        {player.username}
                      </div>
                      <div className="text-[#4B5563] text-xs mt-0.5">
                        {getShortAddressFromPlayer(player)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-8 flex justify-center">
                      {trophyIcon && (
                        <Image
                          src={trophyIcon}
                          alt="Trophy"
                          width={24}
                          height={24}
                        />
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold text-base">
                        {getMultiplierDisplay(player, gamePhase)}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 justify-end">
                        <span className="text-white font-medium text-sm">
                          {getCelestiumDisplay(player, gamePhase)}
                        </span>
                        <div className="w-4 h-4 relative">
                          <Image
                            src={celestiumCoinIcon}
                            alt="CELESTIUM"
                            width={16}
                            height={16}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 bg-[#0F1117] rounded-3xl p-5 space-y-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowUp className="w-5 h-5 text-[#22C55E]" />
            <span className="text-[#22C55E] font-semibold text-lg">
              {formatNumber(summaryStats.totalCelestiums)}
            </span>
            <div className="w-4 h-4 relative">
              <Image src={celestiumCoinIcon} alt="CELESTIUM" width={16} height={16} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#22C55E] font-semibold text-lg">
              {summaryStats.totalPlayers}
            </span>
            <Users className="w-5 h-5 text-[#22C55E]" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#1A1D29]">
          <span className="text-[#6B7280] text-sm">Total BONUS</span>
          <span className="text-[#06B6D4] font-semibold text-lg">
            {formatNumber(summaryStats.totalBonus)}{" "}
            <span className="text-[#6B7280]">
              ({summaryStats.bonusPercentage}%)
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
