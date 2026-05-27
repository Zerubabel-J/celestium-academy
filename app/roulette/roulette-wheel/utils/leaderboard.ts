import trophyGold from "../assets/trophy_gold.svg";
import trophySilver from "../assets/trophy_silver.svg";
import trophyBronze from "../assets/trohpy_bronze.svg";

export const getTrophyIcon = (rank: number): string | null => {
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
};

export const getBorderColor = (rank: number): string => {
  switch (rank) {
    case 1:
      return "border-yellow-500";
    case 2:
      return "border-gray-300";
    case 3:
      return "border-orange-500";
    default:
      return "border-gray-700";
  }
};

