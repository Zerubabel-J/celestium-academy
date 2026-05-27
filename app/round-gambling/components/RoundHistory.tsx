"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { GameRound } from "../types";

interface RoundHistoryProps {
  rounds: GameRound[];
  className?: string;
}

export const RoundHistory: React.FC<RoundHistoryProps> = ({
  rounds,
  className,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "my">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCount, setShowCount] = useState(10);

  const mockRounds = [
    {
      id: "1129",
      players: 12,
      totalCelestiums: "250,550.55 CELESTIUM",
      totalBonus: "250,550.55 BET",
      winnerAddress: "YOU",
      stakingEarnings: "250,550.55 CELESTIUM",
    },
    {
      id: "1129",
      players: 8,
      totalCelestiums: "250,550.55 CELESTIUM",
      totalBonus: "150BET",
      winnerAddress: "23e4...661a",
      stakingEarnings: "250,550.55 CELESTIUM",
    },
  ];

  const filteredRounds = mockRounds.filter(
    (round) =>
      round.id.includes(searchTerm) ||
      round.winnerAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-white">Round history</h2>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <span>Sort by:</span>
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
              🔄
            </Button>
          </div>

          <div className="relative">
            <Input
              placeholder="Search round"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48 bg-gray-900/50 border-gray-700 text-white text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
              🔍
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/70">
            <span>👁️ Show</span>
            <select
              value={showCount}
              onChange={(e) => setShowCount(Number(e.target.value))}
              className="bg-gray-900 border border-gray-700 text-white rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant={activeTab === "all" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("all")}
          className={cn(
            "rounded-full px-4 py-2",
            activeTab === "all"
              ? "bg-yellow-500 text-black font-bold"
              : "text-white/70 hover:text-white"
          )}
        >
          All rounds
        </Button>
        <Button
          variant={activeTab === "my" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("my")}
          className={cn(
            "rounded-full px-4 py-2",
            activeTab === "my"
              ? "bg-yellow-500 text-black font-bold"
              : "text-white/70 hover:text-white"
          )}
        >
          My rounds
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700/50">
              <th className="text-left py-3 px-4 text-sm font-medium text-white/70">
                Round ID
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-white/70">
                Players
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-white/70">
                Total CELESTIUMs
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-white/70">
                Total Bonus
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-white/70">
                Winner address
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-white/70">
                Staking earnings
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-white/70"></th>
            </tr>
          </thead>
          <tbody>
            {filteredRounds.slice(0, showCount).map((round, index) => (
              <tr
                key={index}
                className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{
                        backgroundColor: index === 0 ? "#10b981" : "#8b5cf6",
                      }}
                    />
                    <span className="text-white font-medium">{round.id}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-white">{round.players}</td>
                <td className="py-4 px-4 text-white">{round.totalCelestiums}</td>
                <td className="py-4 px-4">
                  <span
                    className={cn(
                      "px-2 py-1 rounded text-sm font-medium",
                      "bg-green-500/20 text-green-400"
                    )}
                  >
                    {round.totalBonus}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={cn(
                      "font-medium",
                      round.winnerAddress === "YOU"
                        ? "text-green-400"
                        : "text-white"
                    )}
                  >
                    {round.winnerAddress}
                  </span>
                </td>
                <td className="py-4 px-4 text-white">
                  {round.stakingEarnings}
                </td>
                <td className="py-4 px-4 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white"
                  >
                    🔗
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRounds.length === 0 && (
        <div className="text-center py-8 text-white/50">
          No rounds found matching your search.
        </div>
      )}
    </div>
  );
};
