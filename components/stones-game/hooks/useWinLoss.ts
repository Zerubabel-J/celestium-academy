import { useMemo } from "react";
import type { BetTicket, RoundResult } from "../types";

export const useWinLoss = (
  winnerStoneId: string | null,
  latestResult: RoundResult | undefined,
  currentRound: number,
  myBets: BetTicket[]
) => {
  const currentRoundBets = useMemo(() => {
    return myBets.filter((bet) => bet.round === currentRound);
  }, [myBets, currentRound]);

  const hasBetsForRound = currentRoundBets.length > 0;

  const userWinningBets = useMemo(() => {
    if (!winnerStoneId || !latestResult || !hasBetsForRound) return [];
    return currentRoundBets.filter(
      (bet) => bet.stoneId === winnerStoneId && bet.status === "won"
    );
  }, [currentRoundBets, winnerStoneId, latestResult, hasBetsForRound]);

  const hasWon = hasBetsForRound && userWinningBets.length > 0;
  const hasLost =
    !!winnerStoneId &&
    !!latestResult &&
    hasBetsForRound &&
    userWinningBets.length === 0 &&
    currentRoundBets.some((bet) => bet.status === "lost");

  const totalWinningAmount = useMemo(() => {
    return userWinningBets.reduce((sum, bet) => sum + (bet.payout || 0), 0);
  }, [userWinningBets]);

  const totalBonusAmount = useMemo(() => {
    return userWinningBets.reduce((sum, bet) => sum + (bet.bonus || 0), 0);
  }, [userWinningBets]);

  return {
    hasWon,
    hasLost,
    totalWinningAmount,
    totalBonusAmount,
  };
};

