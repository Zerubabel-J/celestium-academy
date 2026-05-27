import { useMemo } from "react";
import type { Player } from "../types";
import { getStoneIdFromCrystal } from "../utils/crystals";
import {
  crystal1,
  crystal2,
  crystal3,
  crystal4,
  crystal5,
} from "../constants/crystals";
import foxIcon from "../assets/Roulette/fox.svg";

const BASE_PLAYERS: Omit<Player, "status">[] = [
  {
    id: 1,
    name: "Cezar_777",
    address: "23e4...661a",
    celestiums: 500,
    crystal: crystal4,
    avatar: foxIcon,
  },
  {
    id: 2,
    name: "CryptoKing_88",
    address: "4f7c...9d2b",
    celestiums: 750,
    crystal: crystal1,
    avatar: foxIcon,
  },
  {
    id: 3,
    name: "GemHunter_42",
    address: "8a1e...5c3f",
    celestiums: 320,
    crystal: crystal3,
    avatar: foxIcon,
  },
  {
    id: 4,
    name: "Diamond_Hands",
    address: "2b9d...7e4a",
    celestiums: 890,
    crystal: crystal5,
    avatar: foxIcon,
  },
];

export const usePlayers = (
  winnerStoneId: string | null,
  latestResult: any
): Player[] => {
  return useMemo(() => {
    if (winnerStoneId && latestResult) {
      return BASE_PLAYERS.map((player) => {
        const playerStoneId = getStoneIdFromCrystal(player.crystal);
        const status = playerStoneId === winnerStoneId ? "win" : "lose";
        return { ...player, status };
      });
    }

    return BASE_PLAYERS;
  }, [winnerStoneId, latestResult]);
};
