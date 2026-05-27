import { useMemo } from "react";
import type { Player } from "../types";
import { BETTING_CONSTANTS } from "../constants/betting";

interface UseProcessedPlayersProps {
  players: Player[];
  gamePhase: string;
}

export const useProcessedPlayers = ({
  players,
  gamePhase,
}: UseProcessedPlayersProps) => {
  const getPlayerStatus = (player: Player) => {
    if (gamePhase === "stopped") {
      return player.status === "won" ? "won" : "lost";
    }
    return player.status;
  };

  const processedPlayers = useMemo(() => {
    const totalBetAmount = players.reduce((sum, p) => sum + p.betAmount, 0);

    const playersWithWinnings = players.map((player) => {
      const status = getPlayerStatus(player);
      let winnings = 0;

      if (status === "won" && player.cashOutAt) {
        winnings = player.betAmount * player.cashOutAt;
      } else if (status === "active") {
        winnings = player.betAmount * player.multiplier;
      }

      return {
        ...player,
        winnings,
        percentage:
          totalBetAmount > 0 ? (player.betAmount / totalBetAmount) * 100 : 0,
      };
    });

    const sorted = [...playersWithWinnings].sort((a, b) => {
      if (gamePhase === "stopped") {
        return b.winnings - a.winnings;
      }
      return b.betAmount - a.betAmount;
    });

    return sorted.map((player, index) => ({
      ...player,
      rank: index < 3 ? index + 1 : undefined,
    }));
  }, [players, gamePhase]);

  const summaryStats = useMemo(() => {
    const getPlayerStatus = (player: Player) => {
      if (gamePhase === "stopped") {
        return player.status === "won" ? "won" : "lost";
      }
      return player.status;
    };

    const totalCelestiums = players.reduce((sum, p) => {
      const status = getPlayerStatus(p);
      if (status === "won" && p.cashOutAt) {
        return sum + p.betAmount * p.cashOutAt;
      }
      return sum + p.betAmount;
    }, 0);

    const totalPlayers = players.length;
    const totalBonus = totalCelestiums * BETTING_CONSTANTS.BONUS_PERCENTAGE;

    return {
      totalCelestiums,
      totalPlayers,
      totalBonus,
      bonusPercentage: BETTING_CONSTANTS.BONUS_PERCENTAGE * 100,
    };
  }, [players, gamePhase]);

  return {
    processedPlayers,
    summaryStats,
  };
};

