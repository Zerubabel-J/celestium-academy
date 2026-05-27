"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SEGMENT_COLORS } from "../constants/betting";

interface GameWheelProps {
  multiplier: number;
  timeLeft: number;
  gamePhase: "waiting" | "betting" | "flying" | "crashed";
  className?: string;
  winningSegment?: number;
  showWinningTooltip?: boolean;
}

const createSegmentPath = (
  index: number,
  totalSegments: number,
  radius: number
) => {
  const anglePerSegment = 360 / totalSegments;
  const startAngle = (index * anglePerSegment - 90) * (Math.PI / 180);
  const endAngle = ((index + 1) * anglePerSegment - 90) * (Math.PI / 180);

  const x1 = radius + radius * Math.cos(startAngle);
  const y1 = radius + radius * Math.sin(startAngle);
  const x2 = radius + radius * Math.cos(endAngle);
  const y2 = radius + radius * Math.sin(endAngle);

  const largeArcFlag = anglePerSegment > 180 ? 1 : 0;

  return `M ${radius} ${radius} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
};

export const GameWheel: React.FC<GameWheelProps> = ({
  multiplier,
  timeLeft,
  gamePhase,
  className,
  winningSegment,
  showWinningTooltip = false,
}) => {
  const segments = SEGMENT_COLORS.slice(0, 8).map((color, index) => ({
    color,
    angle: 45,
  }));

  const getDisplayValue = () => {
    switch (gamePhase) {
      case "waiting":
        return "0";
      case "betting":
        return timeLeft.toString();
      case "flying":
        return multiplier.toFixed(2);
      case "crashed":
        return multiplier.toFixed(2);
      default:
        return "0";
    }
  };

  const getDisplayLabel = () => {
    switch (gamePhase) {
      case "waiting":
        return "$0.00";
      case "betting":
        return "5 mins 48 sec";
      case "flying":
        return "$0.00";
      case "crashed":
        return "$0.00";
      default:
        return "$0.00";
    }
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {showWinningTooltip && gamePhase === "flying" && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-bold z-20">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center text-xs">
              🦊
            </span>
            <span>player 777</span>
            <span>0.02 ₿</span>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-500 rotate-45"></div>
        </div>
      )}

      <div className="relative">
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          className="transform"
        >
          {segments.map((segment, index) => (
            <path
              key={index}
              d={createSegmentPath(index, segments.length, 150)}
              fill={segment.color}
              stroke="#0a0e1a"
              strokeWidth="2"
              className={cn(
                "transition-all duration-300",
                winningSegment === index && "drop-shadow-lg"
              )}
            />
          ))}

          <circle
            cx="160"
            cy="160"
            r="150"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="4"
          />

          {gamePhase === "flying" && (
            <polygon
              points="160,10 170,25 150,25"
              fill="#fbbf24"
              className="animate-pulse"
            />
          )}
        </svg>

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            width: "320px",
            height: "320px",
            background: "radial-gradient(circle, #1a1f2e 0%, #0a0e1a 100%)",
          }}
        >
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-gray-700 flex flex-col items-center justify-center relative">
            <div className="mb-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">₿</span>
              </div>
            </div>

            <div className="text-4xl font-bold text-white font-mono">
              {getDisplayValue()}
            </div>

            <div className="text-sm text-white/70 mt-1">
              {getDisplayLabel()}
            </div>

            {gamePhase === "flying" && (
              <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-pulse"></div>
            )}

            {gamePhase === "crashed" && (
              <div className="absolute inset-0 rounded-full border-4 border-red-400"></div>
            )}
          </div>
        </div>
      </div>

      {gamePhase === "crashed" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-6xl animate-bounce">💥</div>
        </div>
      )}
    </div>
  );
};
