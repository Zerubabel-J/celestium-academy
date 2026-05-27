import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { GAME_CONFIG } from "../../../constants";

interface BetAmountInputProps {
  amount: string;
  balance: number;
  sliderParams: {
    min: number;
    max: number;
    value: number;
  };
  onBetChange: (value: string) => void;
  onSliderChange: (value: number[]) => void;
}

export const BetAmountInput = ({
  amount,
  balance,
  sliderParams,
  onBetChange,
  onSliderChange,
}: BetAmountInputProps) => {
  return (
    <div className="bg-[#0f121d] rounded-lg p-4 border border-border/50">
      <div className="flex items-center gap-2 mb-2">
        <Input
          type="number"
          className="border-0 bg-transparent text-xl md:text-2xl font-normal text-center text-foreground tracking-wide flex-1 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="0"
          value={amount}
          onChange={(e) => onBetChange(e.target.value)}
          min={GAME_CONFIG.MIN_BET}
          max={GAME_CONFIG.MAX_BET}
        />
        <span className="text-xl md:text-2xl font-normal text-foreground">
          CELESTIUM
        </span>
      </div>

      {/* Slider */}
      <div
        className={cn(
          "relative mt-3 h-[20px]",
          balance === 0 && "grayscale pointer-events-none"
        )}
      >
        <Slider
          min={sliderParams.min}
          max={sliderParams.max}
          value={[balance > 0 ? sliderParams.value : 0]}
          defaultValue={[sliderParams.value]}
          disabled={balance <= 0}
          onValueChange={onSliderChange}
        />
      </div>
    </div>
  );
};

