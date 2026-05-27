import { useCallback, useRef } from "react";
import type { EChartsType } from "echarts/core";

import { buildGroupTargets, findGroupNumbers } from "../utils/roulette-map";

export const useRouletteMapHighlight = () => {
  const chartRef = useRef<EChartsType | null>(null);
  const highlightedNamesRef = useRef<string[]>([]);
  const pendingHighlightRef = useRef<number | null>(null);

  const updateHighlights = useCallback(
    (names: string[], action: "highlight" | "downplay") => {
      if (!chartRef.current) return;
      names.forEach((target) => {
        chartRef.current?.dispatchAction({ type: action, name: target });
      });
    },
    []
  );

  const clearHighlights = useCallback(() => {
    if (!highlightedNamesRef.current.length) return;
    updateHighlights(highlightedNamesRef.current, "downplay");
    highlightedNamesRef.current = [];
  }, [updateHighlights]);

  const handleHover = useCallback(
    (name: string) => {
      const groupNumbers = findGroupNumbers(name);
      if (!groupNumbers) {
        clearHighlights();
        return;
      }

      const targets = buildGroupTargets(name, groupNumbers);
      const prev = highlightedNamesRef.current;
      if (
        prev.length === targets.length &&
        prev.every((value, index) => value === targets[index])
      ) {
        return;
      }

      clearHighlights();
      updateHighlights(targets, "highlight");
      highlightedNamesRef.current = targets;
    },
    [clearHighlights, updateHighlights]
  );

  const handleLeaveInternal = useCallback(
    (name: string) => {
      const groupNumbers = findGroupNumbers(name);
      if (!groupNumbers) {
        return;
      }

      clearHighlights();
    },
    [clearHighlights]
  );

  const registerChart = useCallback((instance: unknown) => {
    chartRef.current = instance as EChartsType;
    if (pendingHighlightRef.current !== null) {
      const name = String(pendingHighlightRef.current);
      updateHighlights([name], "highlight");
      highlightedNamesRef.current = [name];
    }
  }, [updateHighlights]);

  const highlightNumber = useCallback(
    (winningNumber: number | null) => {
      pendingHighlightRef.current =
        winningNumber === null ? null : Number(winningNumber);
      clearHighlights();
      if (winningNumber === null || winningNumber === undefined) {
        return;
      }

      const name = String(winningNumber);
      if (!chartRef.current) {
        return;
      }

      updateHighlights([name], "highlight");
      highlightedNamesRef.current = [name];
    },
    [clearHighlights, updateHighlights]
  );

  const handleLeave = useCallback(
    (name: string) => {
      handleLeaveInternal(name);
      if (pendingHighlightRef.current !== null) {
        highlightNumber(pendingHighlightRef.current);
      }
    },
    [handleLeaveInternal, highlightNumber]
  );

  return {
    handleHover,
    handleLeave,
    highlightNumber,
    registerChart,
  };
};
