import { motion } from "motion/react";
import clsx from "clsx";
import type { StoneView } from "../../types";
import { formatCurrency } from "../../utils";

type StonesListProps = {
  stones: StoneView[];
  selectedStoneId: string;
  onSelectStone: (stoneId: string) => void;
};

export const StonesList = ({
  stones,
  selectedStoneId,
  onSelectStone,
}: StonesListProps) => (
  <motion.div
    layout
    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
  >
    <h3 className="text-lg font-semibold tracking-tight">Stones breakdown</h3>
    <div className="mt-4 grid gap-3">
      {stones.map((stone) => (
        <button
          key={stone.id}
          onClick={() => onSelectStone(stone.id)}
          className={clsx(
            "group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition",
            selectedStoneId === stone.id
              ? "border-sky-400/70 bg-sky-400/10"
              : "border-white/5 bg-white/0 hover:border-sky-400/40 hover:bg-white/5"
          )}
        >
          <span
            className="h-10 w-10 shrink-0 rounded-full border-2"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${stone.glow}, transparent 70%)`,
              borderColor: stone.border,
            }}
          />
          <div className="flex flex-1 items-center justify-between gap-4">
            <div>
              <p className="font-medium text-slate-100">{stone.name}</p>
              <p className="text-xs text-slate-400">{stone.description}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-300">
                Pool {formatCurrency(stone.volume)}
              </p>
              <p className="text-xs text-slate-500">
                {stone.players} players • {(stone.share * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          <motion.span
            layout
            className="rounded-xl px-3 py-1 text-sm font-semibold text-emerald-200"
          >
            {stone.multiplier.toFixed(2)}x
          </motion.span>
        </button>
      ))}
    </div>
  </motion.div>
);

