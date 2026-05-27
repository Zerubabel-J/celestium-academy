import { formatNumber, formatShortNumber } from "../../../utils/formatNumbers";

interface ExpectedWinningsProps {
  expectedWin: number;
  bonusAmount: number;
  coef: number;
}

export const ExpectedWinnings = ({
  expectedWin,
  bonusAmount,
  coef,
}: ExpectedWinningsProps) => {
  return (
    <>
      {/* Expected Winnings Label */}
      <div className="text-center pt-2">
        <p className="text-xs md:text-sm text-muted-foreground">
          Expected winnings from this CELESTIUM
        </p>
      </div>

      {/* Winnings Display */}
      <div className="text-center">
        <div className="inline-flex items-baseline gap-2 flex-wrap justify-center">
          <span className="text-2xl md:text-3xl font-bold text-green-500">
            {formatNumber(expectedWin)}
          </span>
          <span className="text-sm md:text-base text-blue-400 font-medium">
            (+ {formatShortNumber(bonusAmount)} bonus)
          </span>
        </div>
        {coef > 0 && (
          <div className="text-center text-muted-foreground font-thin text-xs mt-1">
            {(coef === Number.POSITIVE_INFINITY || Number.isNaN(coef)
              ? 0
              : coef
            ).toFixed(3)}
            x
          </div>
        )}
      </div>
    </>
  );
};

