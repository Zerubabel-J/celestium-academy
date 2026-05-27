"use client";

import type React from "react";

import { Button } from "@/components/ui/button";

interface ClearBetsProps {
  betsLength: number;
  totalBet: number;
  formatAmount: (amount: number) => string;
  onClear: () => void;
}

const ClearBets: React.FC<ClearBetsProps> = ({
  betsLength,
  totalBet,
  formatAmount,
  onClear,
}) => {
  if (betsLength === 0) return null;

  return (
    <div className="mt-4 text-center">
      <Button
        onClick={onClear}
        variant="ghost"
        className="rounded-lg bg-slate-700 px-6 py-2 font-semibold text-white transition-all duration-200 hover:bg-slate-600"
      >
        Clear All Bets ({betsLength})
      </Button>
      <div className="mt-2 text-sm text-gray-400">
        +{formatAmount(totalBet)} from placed CELESTIUMs
      </div>
    </div>
  );
};

export default ClearBets;
