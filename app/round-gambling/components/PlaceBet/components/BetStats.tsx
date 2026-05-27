import { Card } from "@/components/ui/card";
import { formatShortNumber } from "../../../utils/formatNumbers";

interface BetStatsProps {
  myBetVolume: number;
  myPercent: string;
  potentialWin: number;
  myCoef: number;
}

export const BetStats = ({
  myBetVolume,
  myPercent,
  potentialWin,
  myCoef,
}: BetStatsProps) => {
  return (
    <Card className="relative bg-[#131624] border-border p-3 md:p-4 shrink-0 z-20 isolate mt-4">
      <div className="grid grid-cols-2 gap-3">
        {/* Your CELESTIUM */}
        <div
          className="rounded-lg p-3 text-center border border-border"
          style={{ backgroundColor: "#0f121d" }}
        >
          <p className="text-xs text-muted-foreground mb-1">Your CELESTIUM</p>
          <p className="text-lg md:text-xl font-bold text-yellow-500">
            {formatShortNumber(myBetVolume)}{" "}
            <span className="text-sm">({myPercent}%)</span>
          </p>
        </div>

        {/* Potential Win */}
        <div
          className="rounded-lg p-3 text-center border border-border"
          style={{ backgroundColor: "#0f121d" }}
        >
          <p className="text-xs text-muted-foreground mb-1">Potential win</p>
          <p className="text-lg md:text-xl font-bold text-green-500">
            {formatShortNumber(potentialWin)}{" "}
            {myBetVolume > 0 && (
              <span className="text-sm">({myCoef.toFixed(2)}x)</span>
            )}
          </p>
        </div>
      </div>
    </Card>
  );
};

