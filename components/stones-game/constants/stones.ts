import crystal1 from "../assets/Roulette/crystal1.svg";
import crystal2 from "../assets/Roulette/crystal2.svg";
import crystal3 from "../assets/Roulette/crystal3.svg";
import crystal4 from "../assets/Roulette/crystal4.svg";
import crystal5 from "../assets/Roulette/crystal5.svg";
import type { Stone } from "../types";

export const STONES: Stone[] = [
  {
    id: "onyx",
    name: "Onyx",
    description: "Steady odds with reliable payouts.",
    color: "#1E293B",
    glow: "rgba(96, 165, 250, 0.4)",
    border: "rgba(59, 130, 246, 0.95)",
    icon: crystal1,
  },
  {
    id: "amethyst",
    name: "Amethyst",
    description: "High volatility, massive rewards.",
    color: "#581C87",
    glow: "rgba(192, 132, 252, 0.5)",
    border: "rgba(168, 85, 247, 0.95)",
    icon: crystal2,
  },
  {
    id: "sapphire",
    name: "Sapphire",
    description: "Balanced risk and payout potential.",
    color: "#1E40AF",
    glow: "rgba(129, 140, 248, 0.5)",
    border: "rgba(99, 102, 241, 0.95)",
    icon: crystal3,
  },
  {
    id: "emerald",
    name: "Emerald",
    description: "Underdog pick with high multiplier.",
    color: "#047857",
    glow: "rgba(52, 211, 153, 0.55)",
    border: "rgba(16, 185, 129, 0.9)",
    icon: crystal4,
  },
  {
    id: "ruby",
    name: "Ruby",
    description: "The crowd favourite with lower multiplier.",
    color: "#991B1B",
    glow: "rgba(248, 113, 113, 0.55)",
    border: "rgba(248, 113, 113, 0.95)",
    icon: crystal5,
  },
];

export const MIN_BET = 10;
export const MAX_BET = 5000;
export const ROUND_DURATION_MS = 5 * 60 * 1000;

export const SEGMENTS_PER_STONE = 2;

export const STONE_LOOKUP = STONES.reduce<Record<string, Stone>>(
  (acc, stone) => {
    acc[stone.id] = stone;
    return acc;
  },
  {}
);

export const STONE_ICON_MAP = STONES.reduce<Record<string, Stone["icon"]>>(
  (acc, stone) => {
    acc[stone.id] = stone.icon;
    return acc;
  },
  {}
);
