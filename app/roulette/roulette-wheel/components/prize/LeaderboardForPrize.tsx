import Image from "next/image";
import trophyGold from "../../assets/trophy_gold.svg";
import trophySilver from "../../assets/trophy_silver.svg";
import trophyBronze from "../../assets/trohpy_bronze.svg";
import foxIcon from "../../assets/fox.svg";
import cashIcon from "@/components/stones-game/assets/Roulette/cash.svg";
import cashBonusIcon from "@/components/stones-game/assets/Roulette/cash_bonus.svg";

export interface LeaderboardEntry {
  rank: number;
  username: string;
  prize: number;
  bonus: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

function getTrophyIcon(rank: number) {
  switch (rank) {
    case 1:
      return trophyGold;
    case 2:
      return trophySilver;
    case 3:
      return trophyBronze;
    default:
      return null;
  }
}

function getRowStyle(rank: number) {
  switch (rank) {
    case 1:
      return "gradient-border-gold";
    case 2:
      return "gradient-border-silver";
    case 3:
      return "gradient-border-bronze";
    default:
      return "bg-[#1a1d2e]";
  }
}

export function LeaderboardForPrize({ entries }: LeaderboardProps) {
  return (
    <div className="w-full h-full flex flex-col bg-[#1a1d2e] rounded-3xl p-6">
      <div className="grid grid-cols-4 gap-4 mb-3 px-2 text-[#6B7280] text-sm font-medium uppercase tracking-wide">
        <div className="text-left">№</div>
        <div className="text-left">Players</div>
        <div className="text-center">To be won</div>
        <div className="text-center">Bonus</div>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto pr-2">
        {entries.map((entry) => {
          const trophy = getTrophyIcon(entry.rank);
          const isWinner = entry.rank <= 3;

          return (
            <div key={entry.rank}>
              {isWinner ? (
                <div
                  className={`rounded-2xl p-[2px] bg-linear-to-r ${
                    entry.rank === 1
                      ? "from-[#FFB800] via-[#FFB800]/50 to-transparent"
                      : entry.rank === 2
                      ? "from-[#9CA3AF] via-[#9CA3AF]/50 to-transparent"
                      : "from-[#D97706] via-[#D97706]/50 to-transparent"
                  }`}
                >
                  <div
                    className={`grid grid-cols-4 gap-4 items-center px-4 py-4 rounded-2xl ${
                      entry.rank === 1
                        ? "bg-linear-to-r from-[#D4A024] via-[#8B6914]/40 to-[#1a1d2e]"
                        : "bg-[#1a1d2e]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#E5E7EB] font-semibold text-lg">
                        #{entry.rank}
                      </span>
                      {trophy && (
                        <Image
                          src={trophy || "/placeholder.svg"}
                          alt={`Rank ${entry.rank} trophy`}
                          width={24}
                          height={24}
                          className="ml-1"
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <Image
                        src={foxIcon}
                        alt="Player avatar"
                        width={32}
                        height={32}
                      />
                      <span className="text-[#E5E7EB] font-medium">
                        {entry.username}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[#FFC800] font-bold text-lg">
                        {formatCurrency(entry.prize)}
                      </span>
                      <Image
                        src={cashIcon}
                        alt="Prize token"
                        width={20}
                        height={20}
                      />
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[#00ACE7] font-bold text-lg">
                        {formatCurrency(entry.bonus)}
                      </span>
                      <Image
                        src={cashBonusIcon}
                        alt="Bonus crystal"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4 items-center px-4 py-4 rounded-2xl bg-[#1a1d2e]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#E5E7EB] font-semibold text-lg">
                      #{entry.rank}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Image
                      src={foxIcon}
                      alt="Player avatar"
                      width={32}
                      height={32}
                    />
                    <span className="text-[#E5E7EB] font-medium">
                      {entry.username}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[#FFC800] font-bold text-lg">
                      {formatCurrency(entry.prize)}
                    </span>
                    <Image
                      src={cashIcon}
                      alt="Prize token"
                      width={20}
                      height={20}
                    />
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[#00ACE7] font-bold text-lg">
                      {formatCurrency(entry.bonus)}
                    </span>
                    <Image
                      src={cashBonusIcon}
                      alt="Bonus crystal"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
