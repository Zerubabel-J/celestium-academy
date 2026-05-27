"use client";

import React, { useState } from 'react';
import { useRoundGambling } from './hooks/useRoundGambling';
import { SpinningWheel } from './components/SpinningWheel';
import { PlayerLeaderboard } from './components/PlayerLeaderboard';
import { BonusChart } from './components/BonusChart';
import { RoundHistory } from './components/RoundHistory';
import { PlaceBet } from './components/PlaceBet/PlaceBet';
import { cn } from '@/lib/utils';

export default function RoundGambling() {
  const {
    gameState,
    gameStats,
    bonusData,
    winningPlayer,
    placeBet,
    startSpin,
    totalBank,
    myBetVolume,
    isRoundRequested,
    handleSpinComplete,
    startNewRound,
  } = useRoundGambling();

  const [showResult, setShowResult] = useState(false);

  // Show result screen when stopped
  React.useEffect(() => {
    if (gameState.gamePhase === 'stopped' && winningPlayer) {
      const timer = setTimeout(() => {
        setShowResult(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResult(false);
    }
  }, [gameState.gamePhase, winningPlayer]);

  const handleBackToGame = () => {
    setShowResult(false);
    // Force start a new round immediately when user clicks back
    if (gameState.gamePhase === 'stopped') {
      startNewRound();
    }
  };

  const handleSpinTheWheel = () => {
    startSpin();
  };

  const round = gameState.currentRound?.roundNumber || 0;
  const mockBalance = 100000; // Mock balance

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white w-full h-full">
      <div className={cn('col-span-4 p-2 md:p-3 lg:p-4 lg:col-start-2 2xl:px-0')}>
        {/* Main Game Area - Responsive Grid */}
        <div className={cn(
          'grid grid-cols-4 md:grid-cols-3 lg:grid-cols-[repeat(21,minmax(0,1fr))] xl:grid-cols-12 gap-4 md:pt-4 relative'
        )}>
          {/* Left Column - Game Area */}
          <div className={cn(
            'col-span-4 md:col-span-2 lg:col-[span_15_/_span_15] xl:col-span-8 flex flex-col justify-between'
          )}>
            {/* Game Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-3 md:p-4 bg-gray-900/30 rounded-lg border border-gray-700/50 mb-4">
              <div className="flex items-center gap-4 md:gap-6 mb-2 md:mb-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-xs md:text-sm text-white/70">BTC/USDT</span>
                </div>
                <span className="text-xs md:text-sm text-white/70">
                  Lucky Round {round} timeframe
                </span>
              </div>

              <div className="flex items-center gap-4 md:gap-8 text-xs md:text-sm w-full md:w-auto justify-between md:justify-end">
                <div className="text-center">
                  <div className="text-white/50 text-xs">Total CELESTIUMs</div>
                  <div className="text-white font-medium text-xs md:text-sm">{totalBank.toLocaleString()}</div>
                </div>
                <div className="text-center hidden sm:block">
                  <div className="text-white/50 text-xs">Total staking</div>
                  <div className="text-white font-medium text-xs md:text-sm">{gameStats.paidToStaking.toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-2 md:gap-4 text-white/50 text-xs">
                  <span className="flex items-center gap-1">
                    <span>❓</span>
                    <span className="hidden md:inline">How to play</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span>⚠️</span>
                    <span className="hidden md:inline">Report</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Current Round - Wheel and PlaceBet */}
            <div className={cn(
              'flex flex-col my-2 justify-between gap-2 sm:flex-row sm:my-4 sm:gap-4 md:my-0 md:flex-col lg:flex-row'
            )}>
              {/* Spinning Wheel - Centered */}
              <div className="flex justify-center items-center py-4 md:py-8 w-full">
                <SpinningWheel
                  players={gameState.currentRound?.players || []}
                  gamePhase={gameState.gamePhase}
                  timeLeft={gameState.timeLeft}
                  winningPlayer={winningPlayer || undefined}
                  targetWinnerIndex={gameState.targetWinnerIndex}
                  onSpinComplete={handleSpinComplete}
                />
              </div>

              {/* PlaceBet Component */}
              <PlaceBet
                gameState={gameState}
                round={round}
                winningPlayer={winningPlayer}
                totalBank={totalBank}
                myBetVolume={myBetVolume}
                onPlaceBet={placeBet}
                onSpinTheWheel={handleSpinTheWheel}
                onBackToGame={handleBackToGame}
                isPending={false}
                balance={mockBalance}
              />
            </div>

            {/* Bonus Info - This height will be matched by right column */}
            <div className="bg-gray-900/30 rounded-lg border border-gray-700/50 p-4 md:p-6 mb-4 h-[300px]">
              <BonusChart data={bonusData} />
            </div>

            {/* Game Info */}
            <div className="text-center text-xs md:text-sm text-white/70 mb-4">
              <p>All wins are subject to 3.6% fee which is distributed into</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="flex items-center gap-1">
                  <span>🔗</span>
                  <span className="text-yellow-400">Conservative staking</span>
                </span>
              </div>
            </div>
            {/* Round History */}
            <RoundHistory rounds={gameState.roundHistory} />
          </div>

          {/* Right Column - Players and Info */}
          <div className={cn(
            'col-span-4 md:col-span-2 lg:col-[span_6_/_span_6] xl:col-span-4 flex flex-col gap-4 h-full'
          )}>
            {/* Player Leaderboard */}
            <div className="flex-1 min-h-0">
              <PlayerLeaderboard
                players={gameState.currentRound?.players || []}
                currentMultiplier={gameState.currentMultiplier}
                gamePhase={gameState.gamePhase}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
