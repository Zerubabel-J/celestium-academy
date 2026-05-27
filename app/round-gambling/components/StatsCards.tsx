"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { GameStats } from "../types";
import { formatShortNumber } from "../utils/formatNumbers";

interface StatsCardsProps {
  stats: GameStats;
  className?: string;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  stats,
  className,
}) => {
  const cards = [
    {
      title: "Total CELESTIUMs",
      value: formatShortNumber(stats.totalCelestiums),
      subtitle: `(${stats.totalUsers} users)`,
      icon: "👥",
      bgColor: "bg-gradient-to-br from-blue-600/20 to-blue-800/20",
      borderColor: "border-blue-500/30",
    },
    {
      title: "Total bonus",
      value: `${formatShortNumber(stats.totalBonus)} CELESTIUM`,
      subtitle: "",
      icon: "🏆",
      bgColor: "bg-gradient-to-br from-yellow-600/20 to-yellow-800/20",
      borderColor: "border-yellow-500/30",
    },
    {
      title: "Paid to staking",
      value: `${formatShortNumber(stats.paidToStaking)} CELESTIUM`,
      subtitle: "",
      icon: "💰",
      bgColor: "bg-gradient-to-br from-green-600/20 to-green-800/20",
      borderColor: "border-green-500/30",
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6", className)}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={cn(
            "rounded-lg border p-4 lg:p-6 backdrop-blur-sm",
            card.bgColor,
            card.borderColor,
            "transition-all duration-300 hover:scale-105"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{card.icon}</span>
                <h3 className="text-sm font-medium text-white/70">
                  {card.title}
                </h3>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {card.value}
              </div>
              {card.subtitle && (
                <div className="text-sm text-white/50">{card.subtitle}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
