"use client";

import { AnimatePresence } from "motion/react";
import { RoundResultScreen } from "./screens/RoundResultScreen";
import { SpinningScreen } from "./screens/SpinningScreen";
import { StandByScreen } from "./screens/StandByScreen";
import { WaitingScreen } from "./screens/WaitingScreen";
import type { GameState, Player } from "../../types";

interface PlaceBetProps {
  gameState: GameState;
  round: number;
  winningPlayer?: Player | null;
  totalBank?: number;
  myBetVolume?: number;
  onPlaceBet: (amount: number) => void;
  onSpinTheWheel?: () => void;
  onBackToGame: () => void;
  isPending?: boolean;
  balance?: number;
}

export const PlaceBet = ({
  gameState,
  round,
  winningPlayer,
  totalBank = 0,
  myBetVolume = 0,
  onPlaceBet,
  onSpinTheWheel,
  onBackToGame,
  isPending = false,
  balance = 100000,
}: PlaceBetProps) => {
  const renderScreen = () => {
    const state = gameState.gamePhase;

    switch (state) {
      case "standby":
        return (
          <StandByScreen
            round={round}
            playerBet={gameState.playerBet}
            totalBank={totalBank}
            myBetVolume={myBetVolume}
            onPlaceBet={onPlaceBet}
            isPending={isPending}
            balance={balance}
            winningPlayer={winningPlayer}
          />
        );
      case "waiting":
        return (
          <WaitingScreen onSpinTheWheel={onSpinTheWheel} isSpinning={false} />
        );
      case "spinning":
      case "landed":
        return <SpinningScreen />;
      case "stopped":
        return (
          <RoundResultScreen
            round={round}
            isWin={winningPlayer?.username === "You"}
            winAmount={winningPlayer?.winnings || 0}
            bonusAmount={
              winningPlayer?.winnings ? winningPlayer.winnings * 0.1 : 0
            }
            totalAmount={
              (winningPlayer?.winnings || 0) +
              (winningPlayer?.winnings ? winningPlayer.winnings * 0.1 : 0)
            }
            totalBank={totalBank}
            myBetVolume={myBetVolume}
            onBackToGame={onBackToGame}
          />
        );
      default:
        return (
          <StandByScreen
            round={round}
            playerBet={gameState.playerBet}
            totalBank={totalBank}
            myBetVolume={myBetVolume}
            onPlaceBet={onPlaceBet}
            isPending={isPending}
            balance={balance}
            winningPlayer={winningPlayer}
          />
        );
    }
  };

  return <AnimatePresence>{renderScreen()}</AnimatePresence>;
};
