"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Confetti from "react-confetti";
import { RouletteWheel } from "./components/roulette";
import { useStonesGame } from "./hooks/useStonesGame";
import { useLeaderboard } from "./hooks/useLeaderboard";
import { useWinLoss } from "./hooks/useWinLoss";
import { usePlayers } from "./hooks/usePlayers";
import { useCrystalFilter } from "./hooks/useCrystalFilter";
import { useResultsView } from "./hooks/useResultsView";
import { useGameState } from "./hooks/useGameState";
import { ChooseStone } from "./components/roulette/components/ChooseStone";
import CelestiumSlider from "./components/roulette/components/CelestiumSlider";
import { HistoryTable } from "./components/roulette/components/HistoryTable";
import { CrystalSelector } from "./components/player-list/CrystalSelector";
import { PlayerCard } from "./components/player-list/PlayerCard";
import { StatsBar } from "./components/player-list/StatsBar";
import { TabType, TabNavigation } from "./components/player-list/TabNavigation";
import { Leaderboard } from "./components/prize/LeaderBoard";
import { PrizeCard } from "./components/prize/PrizeCard";
import { Button } from "@/components/ui/button";
import { GameHeader } from "./components/page/GameHeader";
import { RoundInfoBar } from "./components/info-bar/RoundInfoBar";
import { RoundInfoWin } from "./components/info-bar/RoundInfoWin";
import { formatCurrency, formatUsers } from "./utils";
import { getEmptyLeaderboardEntries } from "./utils/leaderboard";
import totalUsersIcon from "./assets/Roulette/total_users.svg";
import totalCelestiumsIcon from "./assets/Roulette/total_celestiums.svg";
import paidToStakingIcon from "./assets/Roulette/paid_to_staking.svg";

const StonesGamePage = () => {
  const game = useStonesGame();
  const stones = game.stoneView.views;
  const [activeTab, setActiveTab] = useState<TabType>("celestiums");

  const latestResult = game.results[0];
  const latestRound = latestResult?.round ?? game.round;

  const allPlayers = usePlayers(game.winnerStoneId, latestResult);
  const {
    filterCrystalId,
    handleCrystalFilter,
    filteredPlayers: players,
  } = useCrystalFilter(allPlayers);

  const { showResultsView, setShowResultsView } = useResultsView(
    !!game.winnerStoneId && !!latestResult
  );

  const { totalPlayers, winnerStone, hasWinner, showResults } = useGameState(
    stones,
    game.winnerStoneId,
    latestResult,
    showResultsView,
    game.stoneView.byStoneId
  );

  const leaderboardEntries = useLeaderboard(game.winnerStoneId, game.myBets);

  const { hasWon, hasLost, totalWinningAmount, totalBonusAmount } = useWinLoss(
    game.winnerStoneId,
    latestResult,
    latestRound,
    game.myBets
  );

  return (
    <div className="bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 min-h-screen text-white w-full">
      <section className="relative w-full">
        <div className="absolute inset-0 bg-[#0f121d]" />
        <div className="relative mx-auto px-4 py-4 md:px-6 pb-12 w-full">
          <GameHeader
            round={game.round}
            winnerStoneId={game.winnerStoneId}
            winnerName={
              game.stoneView.byStoneId[game.winnerStoneId ?? ""]?.name
            }
            timeLeft={game.timeLeft}
            totalVolume={game.stoneView.totalVolume}
            bonusPool={game.bonusPool}
            onSpin={game.triggerSpin}
            isSpinning={game.isSpinning}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.5fr)] w-full">
            <motion.section
              layout
              className="relative flex flex-col gap-2 md:gap-3 p-4 md:p-8 w-full min-w-0"
            >
              <div className="relative -mt-16 overflow-hidden w-full h-[450px] md:h-[800px]">
                <div
                  className="absolute left-0 right-0 z-10 pointer-events-none"
                  style={{
                    height: "200px",
                    background:
                      "linear-gradient(to bottom, rgba(15, 18, 29, 1) 0%, rgba(15, 18, 29, 0.95) 30%, rgba(15, 18, 29, 0.8) 60%, rgba(15, 18, 29, 0) 100%)",
                  }}
                />

                <div
                  className={`absolute left-0 right-0 z-20 px-4 ${
                    showResults ? "top-4" : "top-8 lg:top-8"
                  }`}
                >
                  <div className="max-w-[1200px] mx-auto">
                    {showResults ? (
                      <RoundInfoWin
                        roundId={`#${game.round}`}
                        winningPoolUsers={formatUsers(totalPlayers)}
                        bonusPoolAmount={`${formatCurrency(
                          game.bonusPool
                        )} CELESTIUM`}
                        roundIdIcon={paidToStakingIcon}
                        winningPoolIcon={totalUsersIcon}
                        bonusPoolIcon={totalCelestiumsIcon}
                      />
                    ) : (
                      <RoundInfoBar
                        roundId={`#${game.round}`}
                        winningPoolUsers={formatUsers(totalPlayers)}
                        bonusPoolAmount={`${formatCurrency(
                          game.bonusPool
                        )} CELESTIUM`}
                        onPaytableClick={() => console.log("Paytable clicked")}
                        onHowToPlayClick={() =>
                          console.log("How to play clicked")
                        }
                        onReportClick={() => console.log("Report clicked")}
                      />
                    )}
                  </div>
                </div>

                {hasWon && showResults && (
                  <div
                    className="absolute left-0 right-0 z-30 pointer-events-none overflow-hidden"
                    style={{
                      top: showResults ? "120px" : "160px",
                      bottom: 0,
                    }}
                  >
                    <Confetti
                      width={
                        typeof window !== "undefined" ? window.innerWidth : 0
                      }
                      height={
                        typeof window !== "undefined"
                          ? window.innerHeight - (showResults ? 120 : 160)
                          : 0
                      }
                      recycle={false}
                      numberOfPieces={3000}
                      gravity={0.6}
                      initialVelocityY={15}
                      initialVelocityX={5}
                      wind={0.05}
                    />
                  </div>
                )}

                <div className="relative w-full translate-y-[50px] md:-translate-y-[350px] flex justify-center">
                  <RouletteWheel
                    stones={game.stoneView.views}
                    selectedStoneId={game.selectedStoneId}
                    spinKey={game.spinKey}
                    spinTarget={game.spinTarget}
                    isSpinning={game.isSpinning}
                    winnerStoneId={showResults ? game.winnerStoneId : null}
                    onSpinComplete={game.handleSpinComplete}
                    onSelectStone={game.setSelectedStoneId}
                    bonusPool={game.bonusPool}
                    timeLeft={game.timeLeft}
                    hasWon={hasWon}
                    hasLost={hasLost}
                    winningAmount={totalWinningAmount}
                    bonusAmount={totalBonusAmount}
                  />
                </div>
              </div>

              {showResults ? (
                <>
                  <div className="flex justify-start mb-4">
                    <Button
                      onClick={() => {
                        setShowResultsView(false);
                      }}
                      variant="outline"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border-2 bg-transparent text-white hover:bg-white/10 transition-all duration-200"
                      style={{ borderColor: "#ffc800" }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Come back to the game
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full min-h-[550px]">
                    <PrizeCard
                      totalCelestiums={latestResult.totalPool}
                      totalUsers={totalPlayers}
                      prize={latestResult.totalPool}
                      bonus={latestResult.bonusPool}
                      crystalIcon={winnerStone?.icon}
                      hasWon={hasWon}
                    />
                    <div className="bg-[#131624] rounded-3xl p-6 flex flex-col h-full">
                      <Leaderboard
                        entries={
                          leaderboardEntries.length > 0
                            ? leaderboardEntries
                            : getEmptyLeaderboardEntries()
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid w-full -my-10 auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {stones.map((stone) => (
                      <ChooseStone
                        key={stone.id}
                        stone={stone}
                        totalVolume={game.stoneView.totalVolume}
                        bonusPool={game.bonusPool}
                        isSelected={game.selectedStoneId === stone.id}
                        onSelectStone={game.setSelectedStoneId}
                        disabled={game.isSpinning}
                        className="h-full"
                      />
                    ))}
                  </div>

                  <div className="flex justify-center w-full mt-26">
                    <div className="w-full max-w-3xl min-w-0">
                      <CelestiumSlider
                        betAmount={game.betAmount}
                        onBetAmountChange={game.setBetAmount}
                        selectedStoneId={game.selectedStoneId}
                        onSelectStone={game.setSelectedStoneId}
                        onPlaceBet={game.handlePlaceBet}
                        isSpinning={game.isSpinning}
                        selectedStone={game.selectedStone}
                        bonusEstimate={game.nextBonusShareEstimate}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mt-16 w-full">
                <HistoryTable
                  myBets={game.myBets}
                  results={game.results}
                  getStoneById={(id) => game.stoneView.byStoneId[id]}
                />
              </div>
            </motion.section>

            <section className="flex flex-col gap-8 w-full min-w-0 lg:min-w-[280px]">
              <div className="bg-[#131624] rounded-3xl p-6 min-h-[1000px] flex flex-col w-full min-w-0">
                <div className="mb-6">
                  <CrystalSelector
                    selectedCrystal={filterCrystalId ?? ""}
                    onSelectCrystal={handleCrystalFilter}
                  />
                </div>

                <div className="mb-6">
                  <TabNavigation
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                </div>

                <div className="h-[600px] overflow-y-auto space-y-3">
                  {players.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </div>

              <StatsBar
                totalVolume={game.stoneView.totalVolume}
                totalPlayers={totalPlayers}
                yourCelestium={game.betAmount}
                potentialWin={game.potentialWinning}
                multiplier={game.selectedStone?.multiplier ?? 0}
              />
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StonesGamePage;
