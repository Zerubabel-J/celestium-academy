export interface WinningBetSummary {
  label: string;
  amount: number;
  profit: number;
  totalReturn: number;
}

export interface SpinResultSummary {
  winningNumber: number;
  winningColor: "red" | "black" | "green";
  winningBets: WinningBetSummary[];
  totalProfit: number;
  totalReturn: number;
  hadBets: boolean;
}


