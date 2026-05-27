import { BetEntry } from "../types/components";

export const MOCK_BET_DATA: BetEntry[] = [
  {
    id: "1",
    game: "Chelsea x Barcelona",
    date: "25.03.2023 | 18:05",
    team1Logo: "/sport-betting/teams/chelsea.png",
    team2Logo: "/sport-betting/teams/barcelona.png",
    outcome1: { amount: "120.215,25 DBL", color: "green" },
    outcomeX: { amount: "19.215 DBL", color: "gray" },
    outcome2: { amount: "101.139,30 DBL", color: "red" },
    totalBonus: "250.550,55 DBL",
    totalCelestiums: "250.550,55 DBL",
    isActive: true,
  },
  {
    id: "2",
    game: "Manchester United x Liverpool",
    date: "26.03.2023 | 20:00",
    team1Logo: "/sport-betting/teams/man-city.png",
    team2Logo: "/sport-betting/teams/real-madrid.png",
    outcome1: { amount: "120.215,25 DBL", color: "green" },
    outcomeX: { amount: "19.215 DBL", color: "gray" },
    outcome2: { amount: "101.139,30 DBL", color: "red" },
    totalBonus: "250.550,55 DBL",
    totalCelestiums: "250.550,55 DBL",
    isActive: false,
  },
];

export const DEFAULT_BONUS_AMOUNT = 50;
export const DEFAULT_TEAM_LOGO = "/sport-betting/teams/default.png";

