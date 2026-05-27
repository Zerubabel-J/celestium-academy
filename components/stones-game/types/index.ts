import type { StaticImageData } from "next/image";

export type Stone = {
  id: string;
  name: string;
  description: string;
  color: string;
  glow: string;
  border: string;
  icon: StaticImageData | string;
};

export type StoneStat = {
  stoneId: string;
  volume: number;
  players: number;
};

export type BetStatus = "pending" | "won" | "lost";

export type BetTicket = {
  id: string;
  round: number;
  stoneId: string;
  amount: number;
  multiplier: number;
  orderCoefficient: number;
  status: BetStatus;
  placedAt: number;
  payout?: number;
  bonus?: number;
};

export type RoundResult = {
  id: string;
  round: number;
  stoneId: string;
  multiplier: number;
  totalPool: number;
  bonusPool: number;
  timestamp: number;
};

export type StoneView = Stone & {
  volume: number;
  players: number;
  share: number;
  multiplier: number;
};

export type Player = {
  id: number;
  name: string;
  address: string;
  celestiums: number;
  crystal: any;
  avatar: any;
  status?: "win" | "lose";
};

export type LeaderboardEntry = {
  rank: number;
  username: string;
  prize: number;
  bonus: number;
  status?: "win" | "lose";
};

