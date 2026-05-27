import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { STONES, STONE_ICON_MAP } from "../../../../constants/stones";
import { formatCurrency } from "../../../../utils";
import cashCelestiumIcon from "../../../../assets/Roulette/cash_celestium.svg";
import paidToStakingIcon from "../../../../assets/Roulette/paid_to_staking.svg";

type AllRoundsRow = {
  id: string;
  roundTime: string;
  roundId: string;
  roundIdShort: string;
  usersCount: number;
  celestiumsCount: number;
  sumOfCelestiums: number;
  winningStoneId: string;
  paidToStaking: number;
};

interface AllRoundsTableProps {
  data: AllRoundsRow[];
  getStoneById: (stoneId: string) => (typeof STONES)[0] | undefined;
}

const getStoneIcon = (stoneId: string) => {
  return STONE_ICON_MAP[stoneId] || STONES[0].icon;
};

export function AllRoundsTable({
  data,
  getStoneById,
}: AllRoundsTableProps) {
  return (
    <>
      <div className="grid grid-cols-7 gap-4 px-6 py-4 text-xs uppercase text-muted-foreground font-medium">
        <div>Round time</div>
        <div>ID of the round</div>
        <div>Users count</div>
        <div>CELESTIUMs count</div>
        <div>Sum of CELESTIUMs</div>
        <div>Winning stone</div>
        <div>Paid to staking</div>
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
            <div className="text-foreground font-medium">{round.roundTime}</div>
            <div className="text-foreground underline cursor-pointer hover:text-primary truncate">
              <span className="hidden md:inline">{round.roundId}</span>
              <span className="md:hidden text-xs">{round.roundIdShort}</span>
            </div>
            <div className="text-foreground">{round.usersCount}</div>
            <div className="text-foreground">{round.celestiumsCount}</div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">
                {formatCurrency(round.sumOfCelestiums)}
              </span>
              <Image
                src={cashCelestiumIcon}
                alt="CELESTIUM token"
                width={20}
                height={20}
                className="shrink-0"
              />
            </div>
            <div className="flex items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer">
                    <Image
                      src={getStoneIcon(round.winningStoneId)}
                      alt="Winning stone"
                      width={24}
                      height={24}
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-base">
                  <p>
                    {getStoneById(round.winningStoneId)?.name ||
                      "Unknown Stone"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">
                {formatCurrency(round.paidToStaking)}
              </span>
              <Image
                src={paidToStakingIcon}
                alt="Paid to staking"
                width={20}
                height={20}
                className="shrink-0"
              />
            </div>
          </div>
        ))
      )}
    </>
  );
}

