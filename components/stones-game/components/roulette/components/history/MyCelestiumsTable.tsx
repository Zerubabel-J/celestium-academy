import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { STONES, STONE_ICON_MAP } from "../../../../constants/stones";
import { formatCurrency } from "../../../../utils";
import cashCelestiumIcon from "../../../../assets/Roulette/cash_celestium.svg";
import cashBonusIcon from "../../../../assets/Roulette/cash_bonus.svg";

type MyCelestiumsRow = {
  id: string;
  date: string;
  roundNumber: string;
  sum: number;
  stoneId: string;
  winning: number;
  bonus: number | null;
  transactionId: string;
  transactionIdShort: string;
};

interface MyCelestiumsTableProps {
  data: MyCelestiumsRow[];
  getStoneById: (stoneId: string) => (typeof STONES)[0] | undefined;
}

const getStoneIcon = (stoneId: string) => {
  return STONE_ICON_MAP[stoneId] || STONES[0].icon;
};

export function MyCelestiumsTable({
  data,
  getStoneById,
}: MyCelestiumsTableProps) {
  return (
    <>
      <div className="grid grid-cols-7 gap-4 px-6 py-4 text-xs uppercase text-muted-foreground font-medium">
        <div>Date</div>
        <div>Round №</div>
        <div>Sum</div>
        <div>Stone</div>
        <div className="text-primary">Winning</div>
        <div className="text-cyan-400">Bonus</div>
        <div>ID of transaction</div>
      </div>

      {data.length === 0 ? (
        <div className="grid grid-cols-7 gap-4 items-center px-6 py-4 bg-[#131624]">
          <div className="text-muted-foreground">-</div>
          <div className="text-muted-foreground">-</div>
          <div className="text-muted-foreground">-</div>
          <div className="text-muted-foreground">-</div>
          <div className="text-muted-foreground">-</div>
          <div className="text-muted-foreground">-</div>
          <div className="text-muted-foreground">-</div>
        </div>
      ) : (
        data.map((round, index) => (
          <div
            key={round.id}
            className={`grid grid-cols-7 gap-4 items-center px-6 py-4 ${
              index % 2 === 0 ? "bg-[#131624]" : "bg-transparent"
            }`}
          >
            <div className="text-foreground">{round.date}</div>
            <div className="text-foreground underline cursor-pointer hover:text-primary truncate">
              <span className="hidden md:inline">{round.roundNumber}</span>
              <span className="md:hidden text-xs">
                {round.roundNumber.replace("#", "").slice(0, 4)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">
                {formatCurrency(round.sum)}
              </span>
              <Image
                src={cashCelestiumIcon}
                alt="CELESTIUM"
                width={16}
                height={16}
                className="shrink-0"
              />
            </div>
            <div className="flex items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer">
                    <Image
                      src={getStoneIcon(round.stoneId)}
                      alt="Stone"
                      width={24}
                      height={24}
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-base">
                  <p>
                    {getStoneById(round.stoneId)?.name || "Unknown Stone"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">
                {formatCurrency(round.winning)}
              </span>
              <Image
                src={cashCelestiumIcon}
                alt="CELESTIUM"
                width={16}
                height={16}
                className="shrink-0"
              />
            </div>
            <div className="flex items-center gap-2">
              {round.bonus !== null ? (
                <>
                  <span className="text-cyan-400 font-bold">
                    {formatCurrency(round.bonus)}
                  </span>
                  <Image
                    src={cashBonusIcon}
                    alt="Bonus"
                    width={16}
                    height={16}
                    className="shrink-0"
                  />
                </>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </div>
            <div className="text-foreground truncate">
              <span className="hidden md:inline">{round.transactionId}</span>
              <span className="md:hidden text-xs">
                {round.transactionIdShort}
              </span>
            </div>
          </div>
        ))
      )}
    </>
  );
}

