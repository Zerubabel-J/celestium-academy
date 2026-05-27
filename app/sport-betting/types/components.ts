export type BetOutcome = {
  amount: string;
  color: "green" | "gray" | "red";
};

export type BetEntry = {
  id: string;
  game: string;
  date: string;
  team1Logo: string;
  team2Logo: string;
  outcome1: BetOutcome;
  outcomeX: BetOutcome;
  outcome2: BetOutcome;
  totalBonus: string;
  totalCelestiums: string;
  isActive: boolean;
};

export interface BettingCardProps {
  league: string;
  date: string;
  team1: {
    name: string;
    logo: string;
  };
  team2: {
    name: string;
    logo: string;
  };
  userBet: number;
  winAmount: number;
  bonusAmount: number;
  team1Bets: {
    amount: number;
    users: number;
  };
  team2Bets: {
    amount: number;
    users: number;
  };
}

export interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}

export type BetTab = "all" | "my" | "big";

