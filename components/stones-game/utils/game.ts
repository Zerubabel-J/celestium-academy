import type { StoneView, RoundResult } from "../types";

export const calculateTotalPlayers = (stoneViews: StoneView[]): number => {
  return stoneViews.reduce((sum, stone) => sum + stone.players, 0);
};

export const getWinnerStone = (
  winnerStoneId: string | null,
  stoneViewByStoneId: Record<string, StoneView>
) => {
  return winnerStoneId ? stoneViewByStoneId[winnerStoneId] : null;
};

export const hasWinner = (
  winnerStoneId: string | null,
  latestResult: RoundResult | undefined
): boolean => {
  return !!winnerStoneId && !!latestResult;
};

export const shouldShowResults = (
  hasWinner: boolean,
  showResultsView: boolean
): boolean => {
  return hasWinner && showResultsView;
};

