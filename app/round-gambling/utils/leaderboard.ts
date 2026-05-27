import type { Player } from "../types";
import trophyGoldIcon from "../assets/trophy_gold.svg";
import trophySilverIcon from "../assets/trophy_silver.svg";
import trophyBronzeIcon from "../assets/trohpy_bronze.svg";
import { RANK_BORDER_RIGHT_COLORS, ACCENT_COLORS } from "../constants/leaderboard";

export const getTrophyIcon = (rank?: number) => {
  if (rank === 1) return trophyGoldIcon;
  if (rank === 2) return trophySilverIcon;
  if (rank === 3) return trophyBronzeIcon;
  return null;
};

export const getRankBorderColor = (rank?: number) => {
  if (rank === 1) return "border-r-[#22C55E] border-[#FBB040]";
  if (rank === 2) return "border-r-[#A855F7] border-[#C0C0C0]";
  if (rank === 3) return "border-r-[#EF4444] border-[#CD7F32]";
  return "";
};

export const getAccentColor = (index: number) => {
  return ACCENT_COLORS[index % ACCENT_COLORS.length];
};

export const getRankBorderRightColor = (rank?: number) => {
  if (!rank || rank < 1 || rank > 3) return undefined;
  return RANK_BORDER_RIGHT_COLORS[rank as keyof typeof RANK_BORDER_RIGHT_COLORS];
};

export const getShortAddressFromPlayer = (player: Player) => {
  const id = player.id || player.username;
  if (id.length > 8) {
    return `${id.slice(0, 4)}...${id.slice(-4)}`;
  }
  return id;
};

export const getMultiplierDisplay = (player: Player, gamePhase: string) => {
  const status = gamePhase === "stopped" 
    ? (player.status === "won" ? "won" : "lost")
    : player.status;
    
  if (status === "won" && player.cashOutAt) {
    return `${player.cashOutAt.toFixed(2)}%`;
  }
  if (status === "lost") {
    return "0.00%";
  }
  return `${player.multiplier.toFixed(2)}%`;
};

export const getCelestiumDisplay = (player: Player, gamePhase: string) => {
  const status = gamePhase === "stopped"
    ? (player.status === "won" ? "won" : "lost")
    : player.status;
    
  if (status === "won" && player.cashOutAt) {
    return (player.betAmount * player.cashOutAt).toFixed(2);
  }
  return player.betAmount.toFixed(2);
};

