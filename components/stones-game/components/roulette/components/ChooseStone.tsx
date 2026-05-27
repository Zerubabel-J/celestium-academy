import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { StoneView } from "../../../types";
import { formatCurrency } from "../../../utils";
import { STONE_ICON_MAP, STONE_LOOKUP } from "../../../constants/stones";
import cashCelestiumIcon from "../../../assets/Roulette/cash_celestium.svg";
import totalUsersIcon from "../../../assets/Roulette/total_users.svg";
import totalCelestiumsIcon from "../../../assets/Roulette/total_celestiums.svg";
import paidToStakingIcon from "../../../assets/Roulette/paid_to_staking.svg";

interface ChooseStoneProps {
  stone: StoneView;
  totalVolume: number;
  bonusPool?: number;
  isSelected?: boolean;
  onSelectStone?: (stoneId: string) => void;
  disabled?: boolean;
  className?: string;
}

export function ChooseStone({
  stone,
  totalVolume,
  bonusPool,
  isSelected = false,
  onSelectStone,
  disabled = false,
  className,
}: ChooseStoneProps) {
  const baseStone = STONE_LOOKUP[stone.id];
  const crystalImage =
    stone.icon ?? STONE_ICON_MAP[stone.id] ?? "/placeholder.svg";
  const glowColor = baseStone?.glow ?? stone.glow;

  const hasBids = stone.volume > 0;
  const value = formatCurrency(stone.volume);
  const bonusAmount = bonusPool
    ? bonusPool * stone.share
    : hasBids
    ? stone.volume * 0.05
    : 0;
  const bonusValue =
    bonusAmount > 0 ? `${formatCurrency(bonusAmount)} BONUS` : "Bonus pending";
  const users = `${stone.players.toLocaleString()} player${
    stone.players === 1 ? "" : "s"
  }`;
  const celestiums = `${formatCurrency(stone.volume)} pooled`;
  const volume = `${(stone.share * 100).toFixed(1)}% pool share`;

  const mobileCrystalSize = 56;
  const desktopCrystalSize = 72;

  return (
    <div
      className={`relative flex h-full flex-col items-center w-full ${
        className ?? ""
      }`}
    >
      <div className="relative w-full h-full md:hidden">
        <div
          className={`relative rounded-4xl p-4 pr-6 shadow-2xl h-full ${
            isSelected
              ? "bg-linear-to-tr from-[#0F0819] to-[#7B6FE8]"
              : "bg-[#131624]"
          }`}
          style={{
            marginLeft: `${mobileCrystalSize / 2}px`,
            width: `calc(100% - ${mobileCrystalSize / 2}px)`,
            boxSizing: "border-box",
          }}
        >
          <div
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: mobileCrystalSize, height: mobileCrystalSize }}
          >
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 blur-3xl"
                style={{
                  background: `radial-gradient(circle, ${glowColor}80 0%, transparent 70%)`,
                }}
              />
              <Image
                src={crystalImage}
                alt={`${stone.name} crystal`}
                width={mobileCrystalSize}
                height={mobileCrystalSize}
                className="relative z-10 object-contain"
                priority
              />
            </div>
          </div>

          <div
            className="flex items-center gap-2 min-w-0"
            style={{ paddingLeft: `${mobileCrystalSize / 2}px` }}
          >
            <div className="flex flex-col items-center gap-2 shrink-0">
              <span className="text-xl font-bold text-white">
                {stone.multiplier.toFixed(2)}x
              </span>
              <Button
                variant={isSelected ? "default" : "outline"}
                disabled={disabled}
                onClick={() => onSelectStone?.(stone.id)}
                className={
                  isSelected
                    ? "w-auto px-3 py-2.5 text-xs font-bold text-slate-950 hover:opacity-90 whitespace-nowrap"
                    : "w-auto px-3 py-2.5 text-xs font-bold text-[#ffc800] border-2 bg-transparent hover:bg-[#ffc800]/10 whitespace-nowrap"
                }
                style={
                  isSelected
                    ? { backgroundColor: "#ffc800" }
                    : { borderColor: "#ffc800" }
                }
              >
                {isSelected ? "Selected" : "Choose"}
              </Button>
            </div>

            {!hasBids ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-1 min-w-0">
                <Image
                  src={cashCelestiumIcon}
                  alt="CELESTIUM token"
                  width={14}
                  height={14}
                  className="opacity-50 shrink-0"
                  style={{ width: "14px", height: "14px" }}
                />
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">No bids yet?</p>
                  <p className="text-sm font-bold text-white">Be the first</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center gap-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <Image
                    src={cashCelestiumIcon}
                    alt="CELESTIUM token"
                    width={12}
                    height={12}
                    className="shrink-0"
                    style={{ width: "12px", height: "12px" }}
                  />
                  <span className="text-lg font-bold text-white truncate">
                    {value}
                  </span>
                </div>
                <div className="text-sm font-semibold text-blue-400 truncate w-full text-center">
                  {bonusValue}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5 text-right shrink-0 min-w-0">
              <div className="flex items-center gap-1">
                <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ffc800] shrink-0">
                  <Image
                    src={totalUsersIcon}
                    alt="Users"
                    width={8}
                    height={8}
                    style={{ width: "8px", height: "8px" }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground truncate max-w-[60px]">
                  {users}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={totalCelestiumsIcon}
                  alt="Celestiums"
                  width={10}
                  height={10}
                  className="shrink-0"
                  style={{ width: "10px", height: "10px" }}
                />
                <span className="text-[10px] text-muted-foreground truncate max-w-[60px]">
                  {celestiums}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={paidToStakingIcon}
                  alt="Pool share"
                  width={12}
                  height={9}
                  className="shrink-0"
                  style={{ width: "12px", height: "9px" }}
                />
                <span className="text-[10px] text-muted-foreground truncate max-w-[60px]">
                  {volume}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block relative w-full">
        <div className="flex h-full flex-col items-center">
          <div
            className="absolute top-[60px] left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-80 pointer-events-none z-20"
            style={{ backgroundColor: glowColor }}
          />

          <div
            className="absolute top-[60px] left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-60 pointer-events-none z-20"
            style={{ backgroundColor: glowColor }}
          />

          <div className="relative z-30 -mb-12 flex h-[120px] w-full shrink-0 items-center justify-center">
            <Image
              src={crystalImage}
              alt={`${stone.name} crystal`}
              width={desktopCrystalSize}
              height={desktopCrystalSize}
              className="object-contain drop-shadow-2xl relative z-30"
              priority
            />
          </div>

          <div
            className={`relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-xl border border-border p-6 pt-16 text-center backdrop-blur-sm z-10 ${
              isSelected
                ? "bg-linear-to-tr from-[#0F0819] to-[#7B6FE8]"
                : "bg-[#131624]"
            }`}
          >
            <div className="shrink-0 relative z-20">
              <div className="text-3xl font-bold text-foreground">
                {stone.multiplier.toFixed(2)}x
              </div>

              <p className="mt-2 h-10 text-xs leading-tight text-muted-foreground line-clamp-2">
                {stone.description}
              </p>
            </div>

            <Button
              variant={isSelected ? "default" : "outline"}
              disabled={disabled}
              onClick={() => onSelectStone?.(stone.id)}
              className={
                isSelected
                  ? "mt-4 h-12 mb-6 shrink-0 w-full rounded-lg font-semibold text-slate-950 hover:opacity-90"
                  : "mt-4 h-12 mb-6 shrink-0 w-full rounded-lg border-2 bg-transparent font-semibold text-foreground hover:bg-[#ffc800]/10"
              }
              style={
                isSelected
                  ? { backgroundColor: "#ffc800" }
                  : { borderColor: "#ffc800" }
              }
            >
              {isSelected ? "Selected" : "Choose"}
            </Button>

            <div className="mt-auto shrink-0 min-h-[140px] flex flex-col justify-end">
              {hasBids ? (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      src={cashCelestiumIcon}
                      alt="Value"
                      width={24}
                      height={24}
                    />
                    <span className="text-lg font-bold text-white">
                      {value}
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-blue-400">
                    {bonusValue}
                  </div>

                  <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Image
                        src={totalUsersIcon}
                        alt="Users"
                        width={20}
                        height={20}
                      />
                      <span>{users}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Image
                        src={totalCelestiumsIcon}
                        alt="Celestiums"
                        width={20}
                        height={20}
                      />
                      <span>{celestiums}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Image
                        src={paidToStakingIcon}
                        alt="Pool share"
                        width={20}
                        height={20}
                      />
                      <span>{volume}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src={cashCelestiumIcon}
                    alt="No bids"
                    width={32}
                    height={32}
                    className="opacity-60"
                  />
                  <p className="text-sm text-muted-foreground">No bids yet?</p>
                  <p className="font-semibold text-primary">Be the first</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
