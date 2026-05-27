"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import type { GameState, GameRound, Player, GameStats, BonusData } from '../types';
import { GAME_CONFIG } from '../constants';

const MOCK_PLAYER_NAMES = [
  'player_777',
  'crypto_king',
  'lucky_dog',
  'bet_master',
  'wheel_spinner',
  'jackpot_hunter',
  'coin_flipper',
  'dice_roller',
];

const createMockPlayers = (): Player[] =>
  MOCK_PLAYER_NAMES.map((name, index) => ({
    id: `mock-player-${index}`,
    username: name,
    betAmount: Math.floor(Math.random() * 50000) + 1000,
    multiplier: 0,
    status: 'active',
  }));

export const useRoundGambling = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentRound: null,
    roundHistory: [],
    currentMultiplier: 0.01,
    timeLeft: 300, // 5 minutes in seconds
    gamePhase: 'standby',
    playerBet: GAME_CONFIG.DEFAULT_BET,
    isPlaying: false,
    targetWinnerIndex: undefined,
  });

  const [gameStats, setGameStats] = useState<GameStats>({
    totalCelestiums: 53300000,
    totalBonus: 234000,
    paidToStaking: 344000,
    totalUsers: 234,
    currentRoundNumber: 123456,
  });

  const [bonusData, setBonusData] = useState<BonusData>({
    rounds: [],
    multipliers: [],
    timestamps: [],
  });

  const [winningPlayer, setWinningPlayer] = useState<Player | null>(null);
  const [isRoundRequested, setIsRoundRequested] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [isStartingNewRound, setIsStartingNewRound] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const roundStartTimeRef = useRef<number>(Date.now());
  const roundDuration = 300000; // 5 minutes in milliseconds

  // Generate mock bonus chart data
  useEffect(() => {
    const generateBonusData = () => {
      const rounds: number[] = [];
      const multipliers: number[] = [];
      const timestamps: string[] = [];

      for (let i = 0; i < 50; i++) {
        rounds.push(i + 1);
        multipliers.push(Math.random() * 10 + 1);
        timestamps.push(new Date(Date.now() - (50 - i) * 60000).toISOString());
      }

      setBonusData({ rounds, multipliers, timestamps });
    };

    generateBonusData();
  }, []);

  const startNewRound = useCallback(() => {
    if (isStartingNewRound) return; // Prevent multiple calls

    setIsStartingNewRound(true);

    const mockPlayers = createMockPlayers();
    const totalBets = mockPlayers.reduce((sum, player) => sum + player.betAmount, 0);

    const newRound: GameRound = {
      id: `round-${Date.now()}`,
      roundNumber: gameStats.currentRoundNumber + 1,
      startTime: new Date(),
      crashPoint: 0, // Not used in spinning wheel game
      status: 'waiting',
      players: mockPlayers,
      totalBets,
      totalWinnings: 0,
    };

    roundStartTimeRef.current = Date.now();
    setIsRoundRequested(false);
    setWinningPlayer(null);
    setWinnerIndex(null);

    setGameState(prev => ({
      ...prev,
      currentRound: newRound,
      gamePhase: 'standby',
      timeLeft: 300, // 5 minutes
      currentMultiplier: 0.01,
      isPlaying: false,
      playerCashOut: undefined,
      winnerOffset: undefined,
      targetWinnerIndex: undefined,
    }));

    setGameStats(prev => ({
      ...prev,
      currentRoundNumber: prev.currentRoundNumber + 1,
    }));

    // Reset the flag after a short delay
    setTimeout(() => {
      setIsStartingNewRound(false);
    }, 1000);
  }, [gameStats.currentRoundNumber, isStartingNewRound]);

  const placeBet = useCallback((amount: number) => {
    if (gameState.gamePhase !== 'standby' && gameState.gamePhase !== 'waiting') return;

    // Transition to waiting if first bet
    if (gameState.gamePhase === 'standby') {
      setGameState(prev => ({
        ...prev,
        gamePhase: 'waiting',
      }));
    }

    setGameState(prev => ({
      ...prev,
      playerBet: amount,
      isPlaying: true,
    }));

    // Add player to current round if they're not already in it
    setGameState(prev => {
      if (!prev.currentRound) return prev;

      const existingPlayers = prev.currentRound.players ?? [];
      const currentPlayerIndex = existingPlayers.findIndex(p => p.id === 'current-player');
      let updatedPlayers: Player[];

      if (currentPlayerIndex === -1) {
        const newPlayer: Player = {
          id: 'current-player',
          username: 'You',
          betAmount: amount,
          multiplier: 0,
          status: 'active',
        };
        updatedPlayers = [...existingPlayers.map(player => ({ ...player, status: 'active' })), newPlayer];
      } else {
        updatedPlayers = existingPlayers.map(player =>
          player.id === 'current-player'
            ? { ...player, betAmount: amount, status: 'active' }
            : { ...player, status: 'active' }
        );
      }

      const totalBets = updatedPlayers.reduce((sum, player) => sum + player.betAmount, 0);

      return {
        ...prev,
        currentRound: {
          ...prev.currentRound,
          players: updatedPlayers,
          totalBets,
        },
        targetWinnerIndex: undefined,
      };
    });
  }, [gameState.gamePhase]);

  const handleSpinComplete = useCallback((winner: Player, winnerIndex: number) => {
    if (!gameState.currentRound || gameState.currentRound.players.length === 0) {
      // No players, start new round
      setTimeout(() => {
        startNewRound();
      }, 2000);
      return;
    }

    const players = gameState.currentRound.players;
    const totalBank = players.reduce((sum, p) => sum + p.betAmount, 0);

    // Use the winner from the wheel (based on actual rotation)
    const winnerPlayer = winner || players[winnerIndex] || players[0];

    // Calculate winnings
    const netBank = totalBank * 0.914; // 3.6% fee
    const winnerWinnings = netBank;
    const bonusAmount = (totalBank / 100) * 5 * 0.1; // 10% of bonus pool

    const winnerWithWinnings: Player = {
      ...winnerPlayer,
      winnings: winnerWinnings,
      status: 'won',
    };

    setWinningPlayer(winnerWithWinnings);
    setWinnerIndex(winnerIndex);
    setIsRoundRequested(false);

    // Calculate the angle offset for the wheel
    const segmentAngle = players.length > 0 ? 360 / players.length : 0;
    const winnerOffset = winnerIndex * segmentAngle;

    setGameState(prev => {
      if (!prev.currentRound) return prev;

      const updatedPlayers = prev.currentRound.players.map((player, index) => {
        if (index === winnerIndex) {
          return { ...player, status: 'won' };
        }
        return { ...player, status: 'lost' };
      });

      const completedRound: GameRound = {
        ...prev.currentRound,
        status: 'completed',
        endTime: new Date(),
        players: updatedPlayers,
        totalWinnings: winnerWinnings,
      };

      return {
        ...prev,
        currentRound: {
          ...prev.currentRound,
          players: updatedPlayers,
          totalWinnings: winnerWinnings,
        },
        roundHistory: [completedRound, ...prev.roundHistory].slice(0, 20),
        gamePhase: 'landed',
        winnerOffset,
        targetWinnerIndex: winnerIndex,
      };
    });

    // After landing animation, show result
    setTimeout(() => {
      setGameState(prev => {
        // Only transition to stopped if we're still in landed state
        if (prev.gamePhase === 'landed') {
          return {
            ...prev,
            gamePhase: 'stopped',
            timeLeft: 5, // 5 seconds to show result
          };
        }
        return prev;
      });
    }, 1000);

    // Add to bonus data
    setGameState(prev => {
      setBonusData(bonusData => ({
        rounds: [...bonusData.rounds.slice(-49), prev.currentRound?.roundNumber || 0],
        multipliers: [...bonusData.multipliers.slice(-49), Math.random() * 10 + 1],
        timestamps: [...bonusData.timestamps.slice(-49), new Date().toISOString()],
      }));
      return prev;
    });
  }, [gameState.currentRound, startNewRound]);

  const startSpin = useCallback(() => {
    if (gameState.gamePhase !== 'waiting') return;

    setIsRoundRequested(true);
    setWinningPlayer(null);
    setWinnerIndex(null);
    setGameState(prev => {
      if (!prev.currentRound || prev.currentRound.players.length === 0) {
        return prev;
      }

      const players = prev.currentRound.players;
      const totalBets = players.reduce((sum, player) => sum + player.betAmount, 0);
      let randomValue = totalBets > 0 ? Math.random() * totalBets : Math.random() * players.length;
      let targetIndex = 0;

      for (let i = 0; i < players.length; i++) {
        const weight = totalBets > 0 ? players[i].betAmount : 1;
        randomValue -= weight;
        if (randomValue <= 0) {
          targetIndex = i;
          break;
        }
      }

      const resetPlayers = players.map(player => ({
        ...player,
        status: 'active',
      }));

      return {
        ...prev,
        currentRound: {
          ...prev.currentRound,
          players: resetPlayers,
        },
        gamePhase: 'spinning',
        targetWinnerIndex: targetIndex,
      };
    });
  }, [gameState.gamePhase]);


  // Main game loop - handles phase transitions and timer
  useEffect(() => {
    const runGameLoop = () => {
      setGameState(prev => {
        const now = Date.now();
        const elapsed = now - roundStartTimeRef.current;
        const remaining = Math.max(0, roundDuration - elapsed);
        const timeLeftSeconds = Math.floor(remaining / 1000);

        // Update time left
        if (prev.gamePhase === 'standby' || prev.gamePhase === 'waiting') {
          if (remaining <= 0 && prev.gamePhase === 'waiting' && !isRoundRequested) {
            // Auto-start spin if time runs out
            setTimeout(() => {
              startSpin();
            }, 100);
          }
          return {
            ...prev,
            timeLeft: timeLeftSeconds,
          };
        } else if (prev.gamePhase === 'stopped') {
          // After showing result for 5 seconds, start new round
          if (prev.timeLeft <= 0 && !isStartingNewRound) {
            // Only start new round if not already starting
            setTimeout(() => {
              startNewRound();
            }, 1000);
            return {
              ...prev,
              timeLeft: 0,
            };
          } else if (prev.timeLeft > 0) {
            return {
              ...prev,
              timeLeft: prev.timeLeft - 1,
            };
          }
          // If already starting new round, don't update
          return prev;
        }

        return prev;
      });
    };

    gameLoopRef.current = setInterval(runGameLoop, 500);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [startNewRound, startSpin, isRoundRequested, isStartingNewRound]);

  // Start first round
  useEffect(() => {
    if (!gameState.currentRound) {
      startNewRound();
    }
  }, [gameState.currentRound, startNewRound]);

  // Calculate mock bank and bet volumes
  const totalBank = gameState.currentRound?.players.reduce((sum, p) => sum + p.betAmount, 0) || 0;
  const myBetVolume = gameState.currentRound?.players.find(p => p.id === 'current-player')?.betAmount || 0;

  return {
    gameState,
    gameStats,
    bonusData,
    winningPlayer,
    placeBet,
    handleSpinComplete,
    startNewRound,
    startSpin,
    totalBank,
    myBetVolume,
    isRoundRequested,
    winnerIndex,
  };
};
