"use client";

import Image from "next/image";
import { Users } from "lucide-react";
import { Leaderboard } from "./LeaderBoard";
import type { SpinResultSummary } from "../types/results";
import rouletteDuck from "../assets/roulette-duck.png";
import celestiumCoinIcon from "../assets/celestium_coin.svg";

interface RouletteResultOverlayProps {
  result: SpinResultSummary;
  totalCelestiums?: number;
  totalUsers?: number;
  onBackToGame: () => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

export function RouletteResultOverlay({
  result,
  totalCelestiums = 35500,
  totalUsers = 1000,
  onBackToGame,
}: RouletteResultOverlayProps) {
  const hasWon = result.totalProfit > 0;
  const winningNumber = result.winningNumber;
  const winningColor = result.winningColor;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-7xl h-full max-h-[90vh] flex flex-col lg:flex-row gap-6">
        {/* Prize Card - Left Side */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="relative w-full h-full p-1 rounded-3xl bg-gradient-to-br from-yellow-600/50 via-yellow-500/30 to-yellow-600/50">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-500/20 via-transparent to-yellow-500/20 blur-xl" />

            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden h-full flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-2 md:gap-4 p-3 md:p-6 h-full items-stretch flex-1">
                {/* Left Column - Info */}
                <div className="flex flex-col items-center justify-center space-y-2 md:space-y-3 text-center min-w-0 py-2 md:py-0">
                  {/* Proof of Random */}
                  <div className="text-gray-400 text-sm mb-2">
                    Proof of random:{" "}
                    <span className="underline">0x411a....5be114</span>
                  </div>

                  {/* Result Display */}
                  <div
                    className={`rounded-xl p-6 mb-2 ${
                      winningColor === "red"
                        ? "bg-red-500/90"
                        : winningColor === "black"
                        ? "bg-gray-800/90"
                        : "bg-green-500/90"
                    }`}
                  >
                    <div className="text-6xl font-bold text-white mb-2">
                      {winningNumber}
                    </div>
                    <div className="text-white text-lg capitalize">
                      {winningColor} {winningNumber % 2 === 0 ? "Even" : "Odd"}
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-yellow-400">
                      {formatCurrency(totalCelestiums)} Total CELESTIUMs
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <span className="text-base">
                        {formatCurrency(totalUsers)} users
                      </span>
                      <Users className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Win/Lose Status */}
                  <div
                    className={`text-5xl font-bold tracking-tight ${
                      hasWon ? "text-white" : "text-red-400"
                    }`}
                  >
                    {hasWon ? "WIN!" : "LOSE"}
                  </div>

                  {/* Prize Amount */}
                  {hasWon && (
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-bold text-yellow-400">
                        {formatCurrency(result.totalProfit)}
                      </span>
                      <Image
                        src={celestiumCoinIcon}
                        alt="CELESTIUM"
                        width={32}
                        height={32}
                        className="drop-shadow-[0_0_10px_rgba(252,211,77,0.6)]"
                      />
                    </div>
                  )}
                </div>

                {/* Right Column - Duck */}
                <div className="flex items-end justify-center md:justify-end h-auto md:h-full min-w-0 -mt-4 md:mt-0">
                  <div className="relative w-full h-auto md:h-full flex items-end justify-center md:justify-end">
                    <Image
                      src={rouletteDuck}
                      alt="Roulette Duck"
                      width={400}
                      height={500}
                      className="w-full h-auto md:h-full object-contain object-bottom drop-shadow-2xl md:scale-100 scale-[0.9] max-h-[300px] md:max-h-none md:min-h-[450px]"
                      style={{
                        maxWidth: "100%",
                      }}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard - Right Side */}
        <div className="w-full lg:w-96 flex-shrink-0 flex flex-col min-h-0">
          <div className="flex-1 overflow-hidden">
            <Leaderboard />
          </div>
        </div>

        {/* Back to Game Button */}
        <button
          onClick={onBackToGame}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 z-10"
        >
          <Image
            src={celestiumCoinIcon}
            alt="CELESTIUM"
            width={20}
            height={20}
          />
          Back to GAME
        </button>
      </div>
    </div>
  );
}

