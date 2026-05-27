import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  BET_AMOUNTS,
  NUMBER_GRID,
  VERTICAL_NUMBER_GRID,
} from "../constants/constants";
import type { Bet, BoardOrientation, HoverPosition } from "../types/types";
import { getChipPosition } from "../utils";

interface UseBettingBoardParams {
  disabled: boolean;
  orientation?: BoardOrientation;
  onPlaceBet?: (bets: Bet[]) => void;
}

const useBettingBoard = ({
  disabled,
  onPlaceBet,
  orientation = "horizontal",
}: UseBettingBoardParams) => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [betHistory, setBetHistory] = useState<Bet[][]>([]);
  const [betAmountIndex, setBetAmountIndex] = useState(0);
  const [customBetAmount, setCustomBetAmount] = useState<number | null>(null);
  const betAmount = customBetAmount ?? BET_AMOUNTS[betAmountIndex];
  const [multiplier, setMultiplier] = useState(1);
  const [hoverPosition, setHoverPosition] = useState<HoverPosition | null>(
    null
  );
  const gridRef = useRef<HTMLDivElement | null>(null);

  const numberGrid = useMemo(
    () => (orientation === "horizontal" ? NUMBER_GRID : VERTICAL_NUMBER_GRID),
    [orientation]
  );

  useEffect(() => {
    setHoverPosition(null);
  }, [numberGrid]);

  const addBets = useCallback((betsToAdd: Bet[]) => {
    if (betsToAdd.length === 0) return;

    setBets((previous) => {
      setBetHistory((hist) => [...hist, previous]);

      const updatedBets = [...previous];

      betsToAdd.forEach((newBet) => {
        const existingIndex = updatedBets.findIndex(
          (bet) => bet.type === newBet.type && bet.value === newBet.value
        );

        if (existingIndex === -1) {
          updatedBets.push(newBet);
          return;
        }

        const existingBet = updatedBets[existingIndex];
        updatedBets[existingIndex] = {
          ...existingBet,
          amount: existingBet.amount + newBet.amount,
        };
      });

      return updatedBets;
    });
  }, []);

  const addBet = useCallback(
    (newBet: Bet) => {
      addBets([newBet]);
    },
    [addBets]
  );

  const handleUndo = useCallback(() => {
    if (betHistory.length > 0) {
      const newHistory = [...betHistory];
      const previousBets = newHistory.pop();
      setBetHistory(newHistory);
      if (previousBets !== undefined) {
        setBets(previousBets);
      }
    }
  }, [betHistory]);

  const handleNumberClick = useCallback(
    (num: number) => {
      if (disabled) return;

      addBet({
        type: "number",
        value: num,
        amount: betAmount * multiplier,
      });
    },
    [addBet, betAmount, disabled, multiplier]
  );

  const handleNumbersClick = useCallback(
    (numbers: number[]) => {
      if (disabled) return;

      const uniqueNumbers = Array.from(new Set(numbers));
      if (uniqueNumbers.length === 0) return;

      const betsToAdd = uniqueNumbers.map((num) => ({
        type: "number",
        value: num,
        amount: betAmount * multiplier,
      }));

      addBets(betsToAdd);
    },
    [addBets, betAmount, disabled, multiplier]
  );

  const handleOutsideBet = useCallback(
    (type: string, value: string) => {
      if (disabled) return;

      addBet({
        type,
        value,
        amount: betAmount * multiplier,
      });
    },
    [addBet, betAmount, disabled, multiplier]
  );

  type GridInteractionResult =
    | {
        type: "number";
        numbers: number[];
        position: { row: number; col: number };
      }
    | {
        type: "split" | "corner";
        numbers: number[];
        position: { row: number; col: number };
      };

  const resolveGridInteraction = useCallback(
    ({
      row,
      col,
      xInCell,
      yInCell,
      cellWidth,
      cellHeight,
    }: {
      row: number;
      col: number;
      xInCell: number;
      yInCell: number;
      cellWidth: number;
      cellHeight: number;
    }): GridInteractionResult | null => {
      const rowCount = numberGrid.length;
      const colCount = numberGrid[0]?.length ?? 0;

      if (
        rowCount === 0 ||
        colCount === 0 ||
        row < 0 ||
        row >= rowCount ||
        col < 0 ||
        col >= colCount
      ) {
        return null;
      }

      const currentNumber = numberGrid[row]?.[col];
      if (typeof currentNumber !== "number") return null;

      const hasLeft = col > 0;
      const hasRight = col < colCount - 1;
      const hasTop = row > 0;
      const hasBottom = row < rowCount - 1;

      const baseThreshold = Math.min(cellWidth, cellHeight) * 0.3;
      const threshold = Math.max(Math.min(baseThreshold, 14), 6);

      const isNearLeft = hasLeft && xInCell < threshold;
      const isNearRight = hasRight && xInCell > cellWidth - threshold;
      const isNearTop = hasTop && yInCell < threshold;
      const isNearBottom = hasBottom && yInCell > cellHeight - threshold;

      const cornerCandidates: Array<{ rowDelta: -1 | 1; colDelta: -1 | 1 }> =
        [];

      if (isNearTop && isNearLeft) {
        cornerCandidates.push({ rowDelta: -1, colDelta: -1 });
      }
      if (isNearTop && isNearRight) {
        cornerCandidates.push({ rowDelta: -1, colDelta: 1 });
      }
      if (isNearBottom && isNearLeft) {
        cornerCandidates.push({ rowDelta: 1, colDelta: -1 });
      }
      if (isNearBottom && isNearRight) {
        cornerCandidates.push({ rowDelta: 1, colDelta: 1 });
      }

      for (const { rowDelta, colDelta } of cornerCandidates) {
        const verticalRow = row + rowDelta;
        const horizontalCol = col + colDelta;

        if (
          verticalRow < 0 ||
          verticalRow >= rowCount ||
          horizontalCol < 0 ||
          horizontalCol >= colCount
        ) {
          continue;
        }

        const numbers = [
          currentNumber,
          numberGrid[row][horizontalCol],
          numberGrid[verticalRow][col],
          numberGrid[verticalRow][horizontalCol],
        ];

        const uniqueNumbers = Array.from(new Set(numbers));

        if (uniqueNumbers.length === 4) {
          uniqueNumbers.sort((a, b) => a - b);
          return {
            type: "corner",
            numbers: uniqueNumbers,
            position: {
              row: row + rowDelta / 2,
              col: col + colDelta / 2,
            },
          };
        }
      }

      if (isNearLeft) {
        const neighbor = numberGrid[row][col - 1];
        if (typeof neighbor === "number") {
          const numbers = [currentNumber, neighbor].sort((a, b) => a - b);
          return {
            type: "split",
            numbers,
            position: { row, col: col - 0.5 },
          };
        }
      }

      if (isNearRight) {
        const neighbor = numberGrid[row][col + 1];
        if (typeof neighbor === "number") {
          const numbers = [currentNumber, neighbor].sort((a, b) => a - b);
          return {
            type: "split",
            numbers,
            position: { row, col: col + 0.5 },
          };
        }
      }

      if (isNearTop) {
        const neighbor = numberGrid[row - 1]?.[col];
        if (typeof neighbor === "number") {
          const numbers = [currentNumber, neighbor].sort((a, b) => a - b);
          return {
            type: "split",
            numbers,
            position: { row: row - 0.5, col },
          };
        }
      }

      if (isNearBottom) {
        const neighbor = numberGrid[row + 1]?.[col];
        if (typeof neighbor === "number") {
          const numbers = [currentNumber, neighbor].sort((a, b) => a - b);
          return {
            type: "split",
            numbers,
            position: { row: row + 0.5, col },
          };
        }
      }

      return {
        type: "number",
        numbers: [currentNumber],
        position: { row, col },
      };
    },
    [numberGrid]
  );

  const handleGridClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const rowCount = numberGrid.length;
      const colCount = numberGrid[0]?.length ?? 0;

      if (rowCount === 0 || colCount === 0) return;

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const cellWidth = rect.width / colCount;
      const cellHeight = rect.height / rowCount;

      const col = Math.floor(x / cellWidth);
      const row = Math.floor(y / cellHeight);

      if (row < 0 || row >= rowCount || col < 0 || col >= colCount) return;

      const interaction = resolveGridInteraction({
        row,
        col,
        xInCell: x % cellWidth,
        yInCell: y % cellHeight,
        cellWidth,
        cellHeight,
      });

      if (!interaction) return;

      if (interaction.type === "number") {
        const number = interaction.numbers[0];
        if (typeof number === "number") {
          handleNumberClick(number);
        }
        return;
      }

      const numbers = interaction.numbers;
      if (numbers.length === 0) return;

      addBet({
        type: interaction.type,
        value: numbers.join("-"),
        amount: betAmount * multiplier,
        numbers,
      });
    },
    [
      addBet,
      betAmount,
      disabled,
      handleNumberClick,
      multiplier,
      numberGrid,
      resolveGridInteraction,
    ]
  );

  const handleGridMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const rowCount = numberGrid.length;
      const colCount = numberGrid[0]?.length ?? 0;

      if (rowCount === 0 || colCount === 0) {
        setHoverPosition(null);
        return;
      }

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const cellWidth = rect.width / colCount;
      const cellHeight = rect.height / rowCount;

      const col = Math.floor(x / cellWidth);
      const row = Math.floor(y / cellHeight);

      if (row < 0 || row >= rowCount || col < 0 || col >= colCount) {
        setHoverPosition(null);
        return;
      }

      const interaction = resolveGridInteraction({
        row,
        col,
        xInCell: x % cellWidth,
        yInCell: y % cellHeight,
        cellWidth,
        cellHeight,
      });

      if (!interaction) {
        setHoverPosition(null);
        return;
      }

      setHoverPosition({
        type: interaction.type,
        position: interaction.position,
        numbers: interaction.numbers,
      });
    },
    [disabled, numberGrid, resolveGridInteraction]
  );

  const handleGridMouseLeave = useCallback(() => {
    setHoverPosition(null);
  }, []);

  const getBetOnPosition = useCallback(
    (type: string, value: number | string) => {
      return bets.find((bet) => bet.type === type && bet.value === value);
    },
    [bets]
  );

  const getTotalBet = useCallback(() => {
    return bets.reduce((sum, bet) => sum + bet.amount, 0);
  }, [bets]);

  const getPotentialWin = useCallback(() => {
    return getTotalBet() * 2;
  }, [getTotalBet]);

  const handlePlaceBet = useCallback(() => {
    if (bets.length > 0 && onPlaceBet) {
      onPlaceBet(bets);
    }
  }, [bets, onPlaceBet]);

  const clearBets = useCallback(() => {
    setBets([]);
    setBetHistory([]);
  }, []);

  const handleToggleMultiplier = useCallback(() => {
    setMultiplier((previous) => (previous === 1 ? 2 : 1));
  }, []);

  const handleDecreaseBetAmount = useCallback(() => {
    if (betAmountIndex > 0) {
      setCustomBetAmount(null);
      setBetAmountIndex((previous) => Math.max(previous - 1, 0));
    }
  }, [betAmountIndex]);

  const handleIncreaseBetAmount = useCallback(() => {
    if (betAmountIndex < BET_AMOUNTS.length - 1) {
      setCustomBetAmount(null);
      setBetAmountIndex((previous) =>
        Math.min(previous + 1, BET_AMOUNTS.length - 1)
      );
    }
  }, [betAmountIndex]);

  const handleBetAmountChange = useCallback((index: number) => {
    const nextIndex = Math.min(Math.max(index, 0), BET_AMOUNTS.length - 1);
    setCustomBetAmount(null);
    setBetAmountIndex(nextIndex);
  }, []);

  const handleCustomBetAmount = useCallback((amount: number) => {
    const normalizedAmount = Math.max(1, Math.round(amount));
    const presetIndex = BET_AMOUNTS.indexOf(normalizedAmount);

    if (presetIndex !== -1) {
      setCustomBetAmount(null);
      setBetAmountIndex(presetIndex);
      return;
    }

    setCustomBetAmount(normalizedAmount);
  }, []);

  const getChipPositionForBet = useCallback(
    (bet: Bet) => {
      return getChipPosition(bet, numberGrid);
    },
    [numberGrid]
  );

  return {
    bets,
    betAmount,
    betAmountIndex,
    clearBets,
    getBetOnPosition,
    getChipPositionForBet,
    getPotentialWin,
    getTotalBet,
    numberGrid,
    orientation,
    gridRef,
    handleBetAmountChange,
    handleCustomBetAmount,
    handleDecreaseBetAmount,
    handleGridClick,
    handleGridMouseLeave,
    handleGridMouseMove,
    handleIncreaseBetAmount,
    handleNumberClick,
    handleNumbersClick,
    handleOutsideBet,
    handlePlaceBet,
    handleToggleMultiplier,
    handleUndo,
    hoverPosition,
    multiplier,
  };
};

export default useBettingBoard;
