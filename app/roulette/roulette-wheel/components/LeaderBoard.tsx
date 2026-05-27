import Image from "next/image";
import { ExternalLink, Users, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_PLAYERS } from "../constants/leaderboard";
import { getTrophyIcon, getBorderColor } from "../utils/leaderboard";
import foxIcon from "../assets/fox.svg";
import celestiumCoinIcon from "../assets/celestium_coin.svg";

export function Leaderboard() {
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <div className="flex gap-2 mb-6">
        <button className="flex-1 bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg">
          Players
        </button>
        <button className="flex-1 bg-[#1a1d29] text-gray-400 font-bold py-3 px-6 rounded-lg">
          CELESTIUMs
        </button>
      </div>

      <div className="bg-[#131624] rounded-2xl p-4 mb-8">
        <div className="min-h-[1200px] space-y-4 pr-2">
          {MOCK_PLAYERS.map((player) => (
            <div
              key={player.id}
              className={cn(
                "bg-[#1a1d29] rounded-2xl p-5 border-2",
                getBorderColor(player.rank)
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={foxIcon}
                    alt="Fox avatar"
                    width={40}
                    height={40}
                    className="shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        {player.username}
                      </span>
                      {getTrophyIcon(player.rank) && (
                        <Image
                          src={getTrophyIcon(player.rank)!}
                          alt={`Rank ${player.rank}`}
                          width={20}
                          height={20}
                        />
                      )}
                    </div>
                    <span className="text-gray-500 text-sm">
                      {player.address}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 mb-2">
                    <span className="text-white text-sm">
                      {player.celestiums} CELESTIUMs
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-white text-2xl font-bold">
                      {player.coins.toLocaleString()}
                    </span>
                    <Image
                      src={celestiumCoinIcon}
                      alt="CELESTIUM coin"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1d29] rounded-2xl p-6">
        <div className="text-center text-gray-400 text-sm mb-4">
          ALL BETS in round #2434
        </div>
        <div className="flex gap-4">
          <div className="flex-1 bg-[#0f1117] rounded-lg p-4 flex items-center justify-center gap-2">
            <span className="text-yellow-500 font-bold text-lg">232k</span>
            <Coins className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="flex-1 bg-[#0f1117] rounded-lg p-4 flex items-center justify-center gap-2">
            <span className="text-yellow-500 font-bold text-lg">
              23 players
            </span>
            <Users className="w-5 h-5 text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
