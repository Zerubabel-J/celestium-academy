import { STONES } from "../constants/stones";
import type { StoneStat, StoneView } from "../types";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);

export const formatCountdown = (ms: number) => {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
};

export const createInitialStats = (): StoneStat[] =>
  STONES.map((stone, index) => {
    const base = 180 + Math.random() * 420;
    const volatility = 1 + Math.sin(Date.now() / 30000 + index);
    return {
      stoneId: stone.id,
      volume: Math.round(base * volatility),
      players: Math.max(3, Math.round(4 + Math.random() * 28)),
    };
  });

export const calculateStoneView = (stats: StoneStat[]) => {
  const totals = stats.reduce(
    (acc, stat) => {
      acc.totalVolume += stat.volume;
      acc.byStoneId[stat.stoneId] = stat;
      return acc;
    },
    {
      totalVolume: 0,
      byStoneId: {} as Record<string, StoneStat>,
    }
  );

  const views: StoneView[] = STONES.map((stone) => {
    const stat = totals.byStoneId[stone.id];
    const volume = stat?.volume ?? 0;
    const players = stat?.players ?? 0;
    const share = totals.totalVolume > 0 ? volume / totals.totalVolume : 0;
    const multiplier =
      volume > 0 ? Number(((totals.totalVolume * 0.95) / volume).toFixed(2)) : 0;

    return {
      ...stone,
      volume,
      players,
      share,
      multiplier,
    };
  });

  return {
    totalVolume: totals.totalVolume,
    byStoneId: views.reduce<Record<string, StoneView>>((acc, view) => {
      acc[view.id] = view;
      return acc;
    }, {}),
    views,
  };
};

export const pickWinner = (views: StoneView[]): string => {
  const totalWeight = views.reduce((sum, stone) => sum + stone.share, 0);
  if (totalWeight <= 0) {
    return STONES[Math.floor(Math.random() * STONES.length)].id;
  }
  const target = Math.random() * totalWeight;
  let cursor = 0;
  for (const stone of views) {
    cursor += stone.share;
    if (target <= cursor) {
      return stone.id;
    }
  }
  return views.at(-1)?.id ?? STONES[0].id;
};

export const formatUsers = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M users`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k users`;
  }
  return `${count} users`;
};

