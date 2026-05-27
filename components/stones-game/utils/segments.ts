import type { StoneView } from "../types";
import {
  OUTER_SEGMENT_COLORS,
  PREFERRED_STONE_ORDER,
  ROTATION_OFFSET,
} from "../constants/roulette";

export type Segment = {
  stone: StoneView;
  index: number;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  baseColor: string;
};

export const reorderStones = (stones: StoneView[]): StoneView[] => {
  const map = new Map(stones.map((stone) => [stone.id, stone]));
  const ordered = PREFERRED_STONE_ORDER.map((id) => map.get(id)).filter(
    (stone): stone is StoneView => Boolean(stone)
  );
  const remaining = stones.filter(
    (stone) => !PREFERRED_STONE_ORDER.includes(stone.id as any)
  );
  return ordered.length ? [...ordered, ...remaining] : stones;
};

export const buildSegments = (
  stones: StoneView[]
): { segments: Segment[]; ordered: StoneView[] } => {
  const orderedStones = reorderStones(stones);
  const totalSegments = orderedStones.length * 2;
  const sliceAngle = 360 / totalSegments;

  const segments = Array.from({ length: totalSegments }, (_, index) => {
    const stone = orderedStones[index % orderedStones.length];
    const startAngle = ROTATION_OFFSET + index * sliceAngle;
    const endAngle = startAngle + sliceAngle;
    const midAngle = startAngle + sliceAngle / 2;
    return {
      stone,
      index,
      startAngle,
      endAngle,
      midAngle,
      baseColor: OUTER_SEGMENT_COLORS[index % OUTER_SEGMENT_COLORS.length],
    };
  });

  return { segments, ordered: orderedStones };
};

