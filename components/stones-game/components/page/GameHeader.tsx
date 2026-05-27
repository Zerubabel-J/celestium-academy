import { Button } from "@/components/ui/button";

type GameHeaderProps = {
  round: number;
  timeLeft: number;
  winnerName?: string;
  winnerStoneId: string | null;
  bonusPool: number;
  totalVolume: number;
  onSpin?: () => void;
  isSpinning?: boolean;
};

export const GameHeader = ({ onSpin, isSpinning = false }: GameHeaderProps) => (
  <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <p className="uppercase tracking-[0.4em] text-slate-400 text-sm">
        Stones
      </p>
      <h1 className="mt-2 text-4xl lg:text-5xl font-semibold tracking-tight">
        Decentralized Stone Wheel
      </h1>
      <p className="mt-4 text-slate-300 max-w-2xl">
        Pick your crystal, place your bet, and let the Chainlink-powered wheel
        decide the fate of the round. Earlier bets earn stronger bonus
        multipliers.
      </p>
    </div>
    <div className="flex flex-col gap-4">
      {onSpin && (
        <Button
          onClick={onSpin}
          disabled={isSpinning}
          className="w-full px-6 py-6 text-base font-bold rounded-xl bg-linear-to-r from-[#ffc800] to-[#ffd84d] text-slate-950 hover:from-[#ffd84d] hover:to-[#ffc800] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isSpinning ? "Spinning..." : "Spin to Win"}
        </Button>
      )}
    </div>
  </header>
);
