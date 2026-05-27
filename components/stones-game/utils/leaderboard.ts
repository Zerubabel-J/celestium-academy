import type { LeaderboardEntry } from "../types";

export const getEmptyLeaderboardEntries = (): LeaderboardEntry[] => {
  return Array.from({ length: 5 }, (_, index) => ({
    rank: index + 1,
    username: "No winners",
    prize: 0,
    bonus: 0,
  }));
};

