import { getStoneIdFromCrystal } from "./crystals";
import type { Player } from "../types";

export const filterPlayersByCrystal = (
  players: Player[],
  filterCrystalId: string | null
): Player[] => {
  if (!filterCrystalId) return players;

  return players.filter((player) => {
    const playerStoneId = getStoneIdFromCrystal(player.crystal);
    return playerStoneId === filterCrystalId;
  });
};

export const toggleCrystalFilter = (
  currentFilter: string | null,
  newFilter: string
): string | null => {
  return currentFilter === newFilter ? null : newFilter;
};

