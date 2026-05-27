"use client";

import { useMatches } from "./useMatches";
import { useUserBets } from "./useUserBets";
import { usePlatformStats } from "./usePlatformStats";
import { useBettingStats } from "./useBettingStats";

export function useSportBetting() {
  const matches = useMatches();
  const userBets = useUserBets();
  const platformStats = usePlatformStats();
  const bettingStats = useBettingStats();

  const placeBet = async (
    matchId: string,
    betType: "team1" | "team2" | "draw",
    amount: number
  ) => {
    const result = await userBets.placeBet(matchId, betType, amount);
    bettingStats.refetch();
    return result;
  };

  return {
    matches: matches.matches,
    featuredMatch: matches.featuredMatch,
    userBets: userBets.userBets,
    bettingStats: bettingStats.bettingStats,
    platformStats: platformStats.platformStats,
    loading:
      matches.loading ||
      userBets.loading ||
      platformStats.loading ||
      bettingStats.loading,
    error: matches.error,
    placeBet,
    refetch: {
      matches: matches.refetch,
      userBets: userBets.refetch,
      platformStats: platformStats.refetch,
      bettingStats: bettingStats.refetch,
    },
  };
}
