"use client";

import { useSportBetting } from "../hooks/useSportBetting";
import { BettingCard } from "./BettingCard";
import { BettingCardProps } from "../types/components";
import { DEFAULT_TEAM_LOGO, DEFAULT_BONUS_AMOUNT } from "../constants/betting";

export function BettingCards() {
  const { matches, bettingStats } = useSportBetting();

  const nonFeaturedMatches = matches
    .filter((match) => !match.featured)
    .slice(0, 2);

  if (nonFeaturedMatches.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-4 w-full xl:flex xl:flex-col">
        {[1, 2].map((i) => (
          <div key={i} className="w-full xl:max-w-[280px] xl:mx-0">
            <div className="w-full h-[200px] xl:h-[297px] bg-[#131624] border border-[#151A2A] rounded-[10px] animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 w-full xl:flex xl:flex-col">
      {nonFeaturedMatches.map((match, index) => {
        const stats = bettingStats[match.id];
        const matchProps: BettingCardProps = {
          league: match.league,
          date:
            new Date(match.date).toLocaleDateString() +
            " " +
            new Date(match.date).toLocaleTimeString(),
          team1: {
            name: match.team1.name,
            logo: match.team1.logo || DEFAULT_TEAM_LOGO,
          },
          team2: {
            name: match.team2.name,
            logo: match.team2.logo || DEFAULT_TEAM_LOGO,
          },
          userBet: 0,
          winAmount: 0,
          bonusAmount: DEFAULT_BONUS_AMOUNT,
          team1Bets: {
            amount: stats?.team1_total_bets || 0,
            users: stats?.team1_total_users || 0,
          },
          team2Bets: {
            amount: stats?.team2_total_bets || 0,
            users: stats?.team2_total_users || 0,
          },
        };

        return (
          <div key={match.id} className="w-full xl:max-w-[280px] xl:mx-0">
            <BettingCard {...matchProps} />
          </div>
        );
      })}

      {nonFeaturedMatches.length === 1 && (
        <div className="w-full xl:max-w-[280px] xl:mx-0">
          <div className="w-full h-[200px] xl:h-full bg-[#131624] border border-[#151A2A] rounded-[10px] opacity-50" />
        </div>
      )}
    </div>
  );
}
