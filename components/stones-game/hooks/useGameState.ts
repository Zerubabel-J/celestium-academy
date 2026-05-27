import { useMemo } from "react";
import type { StoneView, RoundResult } from "../types";
import {
  calculateTotalPlayers,
  getWinnerStone,
  hasWinner as checkHasWinner,
  shouldShowResults,
} from "../utils/game";

export const useGameState = (
  stoneViews: StoneView[],
  winnerStoneId: string | null,
  latestResult: RoundResult | undefined,
  showResultsView: boolean,
  stoneViewByStoneId: Record<string, StoneView>
) => {
  const totalPlayers = useMemo(
    () => calculateTotalPlayers(stoneViews),
    [stoneViews]
  );

  const winnerStone = useMemo(
    () => getWinnerStone(winnerStoneId, stoneViewByStoneId),
    [winnerStoneId, stoneViewByStoneId]
  );

  const hasWinner = useMemo(
    () => checkHasWinner(winnerStoneId, latestResult),
    [winnerStoneId, latestResult]
  );

  const showResults = useMemo(
    () => shouldShowResults(hasWinner, showResultsView),
    [hasWinner, showResultsView]
  );

  return {
    totalPlayers,
    winnerStone,
    hasWinner,
    showResults,
  };
};

