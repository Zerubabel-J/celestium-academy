import type { CSSProperties } from "react";

interface GlowEntry {
  minAmount: number;
  glowVariable: string;
}

const CHIP_GLOW_MAP: GlowEntry[] = [
  { minAmount: 500_000, glowVariable: "--roulette-chip-glow-red" },
  { minAmount: 200_000, glowVariable: "--roulette-chip-glow-pink" },
  { minAmount: 50_000, glowVariable: "--roulette-chip-glow-gold" },
  { minAmount: 10_000, glowVariable: "--roulette-chip-glow-purple" },
  { minAmount: 1_000, glowVariable: "--roulette-chip-glow-blue" },
];

const defaultGlowVariable = "--roulette-chip-glow-blue";

export const getChipGlowStyle = (amount: number): CSSProperties => {
  const entry = CHIP_GLOW_MAP.find((item) => amount >= item.minAmount);
  const glowVariable = entry?.glowVariable ?? defaultGlowVariable;

  return {
    background: `radial-gradient(circle at center, var(${glowVariable}) 0%, transparent 28%)`,
    boxShadow: `0 0 10px 2px var(${glowVariable})`,
  };
};

export const getChipHoverGlowStyle = (amount: number): CSSProperties => {
  const entry = CHIP_GLOW_MAP.find((item) => amount >= item.minAmount);
  const glowVariable = entry?.glowVariable ?? defaultGlowVariable;

  return {
    background: `radial-gradient(circle at center, var(${glowVariable}) 0%, transparent 35%)`,
    boxShadow: `0 0 22px 6px var(${glowVariable})`,
  };
};
