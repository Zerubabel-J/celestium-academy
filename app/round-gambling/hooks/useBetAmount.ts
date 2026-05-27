import { useState, useMemo } from "react";
import { GAME_CONFIG } from "../constants";

interface UseBetAmountProps {
  initialBet?: number;
  balance: number;
}

export const useBetAmount = ({
  initialBet = 0,
  balance,
}: UseBetAmountProps) => {
  const [amount, setAmount] = useState<string>(
    initialBet.toString() || "10000"
  );

  const handleBetChange = (value: string) => {
    const numValue = parseFloat(value);
    if (
      !isNaN(numValue) &&
      numValue >= GAME_CONFIG.MIN_BET &&
      numValue <= GAME_CONFIG.MAX_BET
    ) {
      setAmount(value);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setAmount(value[0].toFixed(0));
  };

  const sliderParams = useMemo(() => {
    if (balance <= 1000) {
      return {
        min: 0,
        max: 100,
        value: 0,
      };
    }
    return {
      min: GAME_CONFIG.MIN_BET,
      max: Math.min(balance - 1, GAME_CONFIG.MAX_BET),
      value: parseFloat(amount) || 0,
    };
  }, [balance, amount]);

  return {
    amount,
    setAmount,
    handleBetChange,
    handleSliderChange,
    sliderParams,
  };
};

