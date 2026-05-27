"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatNumber } from "../utils/formatNumbers";

interface ResultScreenProps {
  isWin: boolean;
  winAmount?: number;
  bonusAmount?: number;
  totalAmount?: number;
  onBackToGame: () => void;
  className?: string;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  isWin,
  winAmount = 200000,
  bonusAmount = 20000,
  totalAmount = 220000,
  onBackToGame,
  className,
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/80 flex items-center justify-center z-50",
        className
      )}
    >
      <div className="relative">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
            <div className="text-yellow-400 text-2xl mb-2">👥</div>
            <div className="text-2xl font-bold text-white">53.3M</div>
            <div className="text-sm text-gray-400">(234 users)</div>
            <div className="text-xs text-gray-500 mt-1">Total CELESTIUMs</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
            <div className="text-yellow-400 text-2xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-white">234k CELESTIUM</div>
            <div className="text-xs text-gray-500 mt-1">Total bonus</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
            <div className="text-yellow-400 text-2xl mb-2">💰</div>
            <div className="text-2xl font-bold text-white">344k CELESTIUM</div>
            <div className="text-xs text-gray-500 mt-1">Paid to staking</div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="relative">
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              className="transform"
            >
              {[
                "#10b981",
                "#8b5cf6",
                "#f59e0b",
                "#ef4444",
                "#06b6d4",
                "#ec4899",
                "#f97316",
                "#3b82f6",
              ].map((color, index) => {
                const angle = (360 / 8) * index;
                const nextAngle = (360 / 8) * (index + 1);
                const startX =
                  200 + 180 * Math.cos(((angle - 90) * Math.PI) / 180);
                const startY =
                  200 + 180 * Math.sin(((angle - 90) * Math.PI) / 180);
                const endX =
                  200 + 180 * Math.cos(((nextAngle - 90) * Math.PI) / 180);
                const endY =
                  200 + 180 * Math.sin(((nextAngle - 90) * Math.PI) / 180);

                return (
                  <path
                    key={index}
                    d={`M 200 200 L ${startX} ${startY} A 180 180 0 0 1 ${endX} ${endY} Z`}
                    fill={color}
                    stroke="#0a0e1a"
                    strokeWidth="3"
                  />
                );
              })}

              <circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="6"
              />

              <polygon points="200,20 215,40 185,40" fill="#fbbf24" />

              <circle
                cx="200"
                cy="200"
                r="120"
                fill="#10b981"
                className="animate-pulse"
              />

              <foreignObject x="120" y="160" width="160" height="80">
                <div className="text-center text-white">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
                    <span className="text-sm font-bold">player 777</span>
                    <div className="w-4 h-4 bg-yellow-400 rounded flex items-center justify-center text-xs">
                      🏆
                    </div>
                    <span className="text-sm">68.87%</span>
                  </div>
                  <div className="text-xs mb-1">23e4...661a</div>
                  <div className="text-lg font-bold">₿ 0.02</div>
                  <div className="text-sm">1.62x WIN</div>
                </div>
              </foreignObject>
            </svg>

            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-ping"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
              <div className="text-8xl">🐥</div>
              <div className="absolute bottom-4 text-2xl">📦</div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Button
              onClick={onBackToGame}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg text-lg mb-4"
            >
              Back to GAME ⚡
            </Button>

            <div className="bg-gray-900 border border-yellow-500 rounded-lg p-6 min-w-[200px]">
              {isWin ? (
                <div className="text-center">
                  <div className="text-green-400 text-xl font-bold mb-2">
                    You WIN!
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatNumber(winAmount)} CELESTIUM
                  </div>
                  <div className="text-sm text-blue-400 mb-2">
                    +bonus {formatNumber(bonusAmount)} CELESTIUM
                  </div>
                  <div className="border-t border-gray-700 pt-2">
                    <div className="text-xl font-bold text-yellow-400">
                      {formatNumber(totalAmount)} CELESTIUM
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-red-400 text-xl font-bold mb-2">
                    Round is over
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    You could win 200k CELESTIUM + bonus
                  </div>
                  <div className="text-xs text-gray-500">(unspecified sum)</div>
                </div>
              )}
            </div>

            {!isWin && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4 min-w-[200px]">
                <div className="text-center">
                  <div className="text-white text-lg font-bold mb-1">
                    Your bonus:
                  </div>
                  <div className="text-blue-400 text-xl font-bold">
                    +20k CELESTIUM
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="text-gray-400 text-sm mb-2">
            All wins are subject to 3.6% fee which is distributed into 🔗
            Conservative staking
          </div>

          <div className="text-gray-500 text-xs mb-1">CELESTIUM ID:</div>
          <div className="text-gray-400 text-sm font-mono mb-2">
            0x39c9a0b2c1a938991624ccaa561c3e8c6d88f000
          </div>
          <div className="text-gray-500 text-xs mb-4">
            2023-08-17, 15:15:55 (UTC +2)
          </div>

          <div className="text-gray-500 text-xs mb-2">Proof of random:</div>
          <div className="text-gray-400 text-sm font-mono">0x5696c...3f07a9</div>
        </div>

        <div className="mt-8 bg-gray-900/50 rounded-lg p-6">
          <div className="grid grid-cols-6 gap-4 text-sm">
            <div className="text-gray-400 font-medium">Player wallet</div>
            <div className="text-gray-400 font-medium">CELESTIUM amount</div>
            <div className="text-gray-400 font-medium">Total win amount</div>
            <div className="text-gray-400 font-medium">Basic win</div>
            <div className="text-gray-400 font-medium">Bonus</div>
            <div className="text-gray-400 font-medium">Total win</div>

            {[
              {
                wallet: "0x23...24e",
                amount: 23,
                total: "234k",
                basic: "200BET ↗",
                bonus: "7%",
                win: "87k (5.2%)",
              },
              {
                wallet: "0x23...24e",
                amount: 23,
                total: "234k",
                basic: "150BET ↗",
                bonus: "7%",
                win: "87k (5.2%)",
              },
              {
                wallet: "0x23...24e",
                amount: 23,
                total: "234k",
                basic: "100BET ↗",
                bonus: "7%",
                win: "87k (5.2%)",
              },
            ].map((row, index) => (
              <React.Fragment key={index}>
                <div className="text-white flex items-center gap-2">
                  <div
                    className={cn(
                      "w-3 h-3 rounded",
                      index === 0
                        ? "bg-green-500"
                        : index === 1
                        ? "bg-purple-500"
                        : "bg-yellow-500"
                    )}
                  ></div>
                  {row.wallet}
                </div>
                <div className="text-white">{row.amount}</div>
                <div className="text-white">{row.total}</div>
                <div className="text-green-400">{row.basic}</div>
                <div className="text-white">{row.bonus}</div>
                <div className="text-white">{row.win}</div>
              </React.Fragment>
            ))}

            {[...Array(5)].map((_, index) => (
              <React.Fragment key={`lose-${index}`}>
                <div className="text-white flex items-center gap-2">
                  <div
                    className={cn(
                      "w-3 h-3 rounded",
                      index === 0
                        ? "bg-red-500"
                        : index === 1
                        ? "bg-purple-500"
                        : index === 2
                        ? "bg-cyan-500"
                        : index === 3
                        ? "bg-blue-500"
                        : "bg-orange-500"
                    )}
                  ></div>
                  0x23...24e
                </div>
                <div className="text-white">23</div>
                <div className="text-white">234k</div>
                <div className="text-red-400">Lose</div>
                <div className="text-white">7%</div>
                <div className="text-white">87k (5.2%)</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
