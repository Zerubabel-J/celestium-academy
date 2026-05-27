import { useMemo } from "react";
import { BETTING_CONSTANTS } from "../constants/betting";

interface UseBetCalculationsProps {
  amount: string;
  totalBank: number;
  myBetVolume: number;
}

export const useBetCalculations = ({
  amount,
  totalBank,
  myBetVolume,
}: UseBetCalculationsProps) => {
  const betAmountNum = parseFloat(amount) || 0;

  // Calculate expected win with new bet
  const expectedWin = useMemo(() => {
    if (betAmountNum === 0) return 0;
    const newBank = totalBank + betAmountNum - myBetVolume;
    const netBank = newBank * BETTING_CONSTANTS.FEE_MULTIPLIER;
    return netBank;
  }, [betAmountNum, totalBank, myBetVolume]);

  // Calculate coefficient (multiplier)
  const coef = useMemo(() => {
    if (betAmountNum === 0) return 0;
    const newBank = totalBank + betAmountNum - myBetVolume;
    const netBank = newBank * BETTING_CONSTANTS.FEE_MULTIPLIER;
    return netBank / betAmountNum;
  }, [amount, totalBank, myBetVolume, betAmountNum]);

  // Calculate bonus amount (24% of expected win)
  const bonusAmount = useMemo(() => {
    return expectedWin * BETTING_CONSTANTS.BONUS_PERCENTAGE;
  }, [expectedWin]);

  // Calculate my percentage of total bank
  const myPercent = useMemo(() => {
    if (totalBank === 0) return "0.00";
    return myBetVolume > 0
      ? ((myBetVolume / totalBank) * 100).toFixed(2)
      : "0.00";
  }, [totalBank, myBetVolume]);

  // Calculate potential win (if I win with current bet)
  const potentialWin = useMemo(() => {
    if (totalBank === 0) return 0;
    return totalBank * BETTING_CONSTANTS.FEE_MULTIPLIER;
  }, [totalBank]);

  // Calculate my coefficient (multiplier for my current bet)
  const myCoef = useMemo(() => {
    if (myBetVolume === 0) return 0;
    return potentialWin / myBetVolume;
  }, [potentialWin, myBetVolume]);

  return {
    betAmountNum,
    expectedWin,
    coef,
    bonusAmount,
    myPercent,
    potentialWin,
    myCoef,
  };
};

