import type useBettingBoard from "../hooks/useBettingBoard";

export type BoardOrientation = "horizontal" | "vertical";

export interface Bet {
  type: string;
  value: number | string;
  amount: number;
  numbers?: number[];
}

export interface HoverPosition {
  type: "number" | "split" | "corner" | null;
  position: { row: number; col: number };
  numbers?: number[];
}

export interface BettingBoardProps {
  betting: ReturnType<typeof useBettingBoard>;
  disabled?: boolean;
  winningNumber?: number | null;
}
