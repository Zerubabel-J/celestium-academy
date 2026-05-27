import { useCallback, useEffect, useMemo, useState } from "react";
import { ROUND_DURATION_MS, STONES } from "../constants/stones";
import type { BetTicket, RoundResult, StoneStat } from "../types";
import {
  calculateStoneView,
  createId,
  createInitialStats,
  pickWinner,
} from "../utils";

export const useStonesGame = () => {
  const [round, setRound] = useState(4821);
  const [stats, setStats] = useState<StoneStat[]>(() => createInitialStats());
  const [selectedStoneId, setSelectedStoneId] = useState<string>(STONES[0].id);
  const [betAmount, setBetAmount] = useState<number>(125);
  const [orderCount, setOrderCount] = useState(0);
  const [roundEndTime, setRoundEndTime] = useState(
    () => Date.now() + ROUND_DURATION_MS
  );
  const [timeLeft, setTimeLeft] = useState(() => ROUND_DURATION_MS);
  const [spinTarget, setSpinTarget] = useState<string | null>(null);
  const [spinKey, setSpinKey] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winnerStoneId, setWinnerStoneId] = useState<string | null>(null);
  const [myBets, setMyBets] = useState<BetTicket[]>([]);
  const [results, setResults] = useState<RoundResult[]>([]);

  const stoneView = useMemo(() => calculateStoneView(stats), [stats]);
  const selectedStone = stoneView.byStoneId[selectedStoneId];
  const bonusPool = stoneView.totalVolume * 0.05;

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = roundEndTime - Date.now();
      setTimeLeft(Math.max(0, remaining));
    }, 1000);
    return () => clearInterval(interval);
  }, [roundEndTime]);

  const handleBetAmountInput = (value: number) => {
    const clamped = Math.min(5000, Math.max(10, value));
    setBetAmount(Number.isNaN(clamped) ? 10 : Math.round(clamped));
  };

  const triggerSpin = useCallback(() => {
    if (isSpinning) return;
    const winner = pickWinner(stoneView.views);
    setSpinTarget(winner);
    setSpinKey((prev) => prev + 1);
    setIsSpinning(true);
    setWinnerStoneId(null);
  }, [stoneView.views, isSpinning]);

  useEffect(() => {
    if (timeLeft > 0 || isSpinning) return;

    if (stoneView.totalVolume === 0) {
      const nextStats = createInitialStats();
      setStats(nextStats);
      setRound((prev) => prev + 1);
      setRoundEndTime(Date.now() + ROUND_DURATION_MS);
      setOrderCount(0);
      setWinnerStoneId(null);
    } else {
      triggerSpin();
    }
  }, [isSpinning, stoneView.totalVolume, timeLeft, triggerSpin]);

  const handleSpinComplete = useCallback(
    (stoneId: string) => {
      setIsSpinning(false);
      setWinnerStoneId(stoneId);
      const settlementRound = round;
      const totalPool = stoneView.totalVolume;
      const bonus = totalPool * 0.05;
      const stoneStats = stoneView.byStoneId[stoneId];
      const multiplier = stoneStats?.multiplier ?? 0;

      setMyBets((prev) => {
        const currentRoundBets = prev.filter(
          (bet) => bet.round === settlementRound && bet.status === "pending"
        );
        const winningBets = currentRoundBets.filter(
          (bet) => bet.stoneId === stoneId
        );
        const totalBonusWeight = winningBets.reduce(
          (sum, bet) => sum + bet.amount * bet.orderCoefficient,
          0
        );

        return prev.map((bet) => {
          if (bet.round !== settlementRound || bet.status !== "pending") {
            return bet;
          }

          if (bet.stoneId === stoneId) {
            const weight = bet.amount * bet.orderCoefficient;
            const bonusShare =
              totalBonusWeight > 0 ? (bonus * weight) / totalBonusWeight : 0;
            const payout = bet.amount * bet.multiplier + bonusShare;
            return {
              ...bet,
              status: "won" as const,
              payout,
              bonus: bonusShare,
            };
          }

          return {
            ...bet,
            status: "lost" as const,
            payout: 0,
            bonus: 0,
          };
        });
      });

      setResults((prev) => {
        const next: RoundResult[] = [
          {
            id: createId(),
            round: settlementRound,
            stoneId,
            multiplier,
            totalPool,
            bonusPool: bonus,
            timestamp: Date.now(),
          },
          ...prev,
        ];
        return next.slice(0, 8);
      });

      const nextStats = createInitialStats();
      setStats(nextStats);
      setRound((prev) => prev + 1);
      setOrderCount(0);
      setSpinTarget(null);
      setRoundEndTime(Date.now() + ROUND_DURATION_MS);
    },
    [round, stoneView]
  );

  const handlePlaceBet = () => {
    if (isSpinning) return;
    const amount = Math.round(betAmount);
    if (!selectedStone || amount < 10) return;

    const snapshot = stoneView.byStoneId[selectedStoneId];
    const multiplier = snapshot?.multiplier ?? 0;

    const orderIndex = orderCount % 10;
    const orderCoefficient = Math.max(10 - orderIndex, 1);

    const newBet: BetTicket = {
      id: createId(),
      round,
      stoneId: selectedStoneId,
      amount,
      multiplier,
      orderCoefficient,
      status: "pending",
      placedAt: Date.now(),
    };

    setMyBets((prev) => [newBet, ...prev].slice(0, 20));
    setOrderCount((prev) => prev + 1);
    setStats((prev) =>
      prev.map((entry) =>
        entry.stoneId === selectedStoneId
          ? {
              ...entry,
              volume: entry.volume + amount,
              players: entry.players + 1,
            }
          : entry
      )
    );
  };

  const potentialWinning =
    selectedStone && betAmount
      ? betAmount * (selectedStone.multiplier || 0)
      : 0;

  const nextBonusShareEstimate = useMemo(() => {
    if (!selectedStone) return 0;
    const orderIndex = orderCount % 10;
    const orderCoefficient = Math.max(10 - orderIndex, 1);
    const estimatedBonusPool = (stoneView.totalVolume + betAmount) * 0.05;

    const currentRoundBets = myBets.filter(
      (bet) => bet.round === round && bet.status === "pending"
    );
    const winningWeight =
      currentRoundBets
        .filter((bet) => bet.stoneId === selectedStoneId)
        .reduce((sum, bet) => sum + bet.amount * bet.orderCoefficient, 0) +
      betAmount * orderCoefficient;

    const bonusShare =
      winningWeight > 0
        ? (estimatedBonusPool * betAmount * orderCoefficient) / winningWeight
        : 0;

    return bonusShare;
  }, [
    betAmount,
    myBets,
    orderCount,
    round,
    selectedStone,
    selectedStoneId,
    stoneView.totalVolume,
  ]);

  const pendingBets = myBets.filter(
    (bet) => bet.round === round && bet.status === "pending"
  );

  return {
    round,
    stats,
    selectedStoneId,
    setSelectedStoneId,
    betAmount,
    setBetAmount: handleBetAmountInput,
    orderCount,
    timeLeft,
    spinTarget,
    spinKey,
    isSpinning,
    winnerStoneId,
    myBets,
    results,
    setResults,
    stoneView,
    selectedStone,
    bonusPool,
    triggerSpin,
    handleSpinComplete,
    handlePlaceBet,
    potentialWinning,
    nextBonusShareEstimate,
    pendingBets,
  };
};
