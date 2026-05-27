import { useState, useCallback, useMemo } from "react";
import { filterPlayersByCrystal, toggleCrystalFilter } from "../utils/filters";
import type { Player } from "../types";

export const useCrystalFilter = (players: Player[]) => {
  const [filterCrystalId, setFilterCrystalId] = useState<string | null>(null);

  const handleCrystalFilter = useCallback(
    (crystalId: string) => {
      setFilterCrystalId(toggleCrystalFilter(filterCrystalId, crystalId));
    },
    [filterCrystalId]
  );

  const filteredPlayers = useMemo(
    () => filterPlayersByCrystal(players, filterCrystalId),
    [players, filterCrystalId]
  );

  return {
    filterCrystalId,
    setFilterCrystalId,
    handleCrystalFilter,
    filteredPlayers,
  };
};

