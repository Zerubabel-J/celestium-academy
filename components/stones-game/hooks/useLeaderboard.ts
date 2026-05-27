import { useMemo } from "react";
import type { LeaderboardEntry } from "../types";
import type { BetTicket } from "../types";

const HARDCODED_ENTRIES: Omit<LeaderboardEntry, "rank">[] = [
  {
    username: "CryptoKing_88",
    prize: 324,
    bonus: 46,
  },
  {
    username: "GemHunter_42",
    prize: 287,
    bonus: 41,
  },
  {
    username: "Diamond_Hands",
    prize: 245,
    bonus: 35,
  },
  {
    username: "Lucky_Strike",
    prize: 198,
    bonus: 28,
  },
];

export const useLeaderboard = (
  winnerStoneId: string | null,
  myBets: BetTicket[]
): LeaderboardEntry[] => {
  return useMemo<LeaderboardEntry[]>(() => {
    if (!winnerStoneId) return [];

    const winningBets = myBets.filter(
      (bet) => bet.stoneId === winnerStoneId && bet.status === "won"
    );

    const sortedBets = [...winningBets].sort((a, b) => {
      const totalA = (a.payout || 0) + (a.bonus || 0);
      const totalB = (b.payout || 0) + (b.bonus || 0);
      return totalB - totalA;
    });

    const realEntries = sortedBets.slice(0, 5).map((bet, index) => ({
      rank: index + 1,
      username: `Player_${bet.id.slice(0, 6)}`,
      prize: bet.payout || 0,
      bonus: bet.bonus || 0,
      status: "win" as const,
    }));

    const allEntries = [
      ...realEntries,
      ...HARDCODED_ENTRIES.slice(0, 5 - realEntries.length).map((entry) => ({
        ...entry,
        rank: 0,
      })),
    ];

    allEntries.sort((a, b) => {
      const totalA = (a.prize || 0) + (a.bonus || 0);
      const totalB = (b.prize || 0) + (b.bonus || 0);
      return totalB - totalA;
    });

    return allEntries.slice(0, 5).map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
  }, [myBets, winnerStoneId]);
};

