"use client";

import type React from "react";

import {
  INNER_RADIUS,
  OUTER_RADIUS,
  ROULETTE_NUMBERS,
  WHEEL_CENTER_X,
  WHEEL_CENTER_Y,
  WHEEL_VIEWBOX_HEIGHT,
  WHEEL_VIEWBOX_WIDTH,
} from "../constants/constants";
import type { BallPosition } from "../types/types";
import type { SpinResultSummary } from "../types/results";
import { createWedgePath, getBallCoordinates, getSegmentColor } from "../utils";
import CenterLock from "./CenterLock";

interface WheelSvgProps {
  ballPosition: BallPosition;
  rotation: number;
  segmentAngle: number;
  showBall: boolean;
  timeLeft: number;
  result?: SpinResultSummary | null;
  isSpinning?: boolean;
}

const formatCelestium = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

const WheelSvg: React.FC<WheelSvgProps> = ({
  ballPosition,
  rotation,
  segmentAngle,
  showBall,
  timeLeft,
  result,
  isSpinning = false,
}) => {
  const { ballX, ballY } = getBallCoordinates(ballPosition);

  // Determine if we should show overlay (result exists and spin is complete)
  const showOverlay = result !== null && result !== undefined && !isSpinning;
  const isWin = showOverlay && result && result.totalProfit > 0;
  const isLoss = showOverlay && result && result.totalProfit <= 0;

  return (
    <svg
      width={WHEEL_VIEWBOX_WIDTH}
      height={WHEEL_VIEWBOX_HEIGHT}
      viewBox={`0 0 ${WHEEL_VIEWBOX_WIDTH} ${WHEEL_VIEWBOX_HEIGHT}`}
      className="max-w-full h-auto"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodOpacity="0.5" />
        </filter>
        <filter id="ballGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="hubGradient" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#5a6b7d" />
          <stop offset="30%" stopColor="#3D4658" />
          <stop offset="70%" stopColor="#2a3544" />
          <stop offset="100%" stopColor="#1D2331" />
        </radialGradient>
        <linearGradient id="armGradient1" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#2a3544" />
          <stop offset="20%" stopColor="#3d4a5c" />
          <stop offset="50%" stopColor="#5a6b7d" />
          <stop offset="80%" stopColor="#3d4a5c" />
          <stop offset="100%" stopColor="#2a3544" />
        </linearGradient>
        <linearGradient id="armGradient2" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#2a3544" />
          <stop offset="20%" stopColor="#3d4a5c" />
          <stop offset="50%" stopColor="#5a6b7d" />
          <stop offset="80%" stopColor="#3d4a5c" />
          <stop offset="100%" stopColor="#2a3544" />
        </linearGradient>
        <radialGradient id="capGradient" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#6b7c8f" />
          <stop offset="40%" stopColor="#4a5a6d" />
          <stop offset="70%" stopColor="#3d4a5c" />
          <stop offset="100%" stopColor="#2a3544" />
        </radialGradient>
        <radialGradient id="hubInnerShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3D4658" stopOpacity="0" />
          <stop offset="70%" stopColor="#1D2331" stopOpacity="0.3" />
          <stop
            offset="100%"
            stopColor="var(--roulette-header)"
            stopOpacity="0.6"
          />
        </radialGradient>
        <radialGradient id="ballGradient" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f0f0f0" />
          <stop offset="100%" stopColor="#d0d0d0" />
        </radialGradient>
        {/* Win gradient - green */}
        <radialGradient id="winGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#22c55e" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0.8" />
        </radialGradient>
        {/* Loss gradient - red */}
        <radialGradient id="lossGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#b91c1c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#991b1b" stopOpacity="0.5" />
        </radialGradient>
      </defs>

      <circle
        cx={WHEEL_CENTER_X}
        cy={WHEEL_CENTER_Y}
        r={OUTER_RADIUS + 20}
        fill="var(--roulette-wheel-base)"
        filter="url(#glow)"
        opacity="0.6"
      />

      <g transform={`rotate(${rotation} ${WHEEL_CENTER_X} ${WHEEL_CENTER_Y})`}>
        {ROULETTE_NUMBERS.map((item, index) => {
          const startAngle = index * segmentAngle - 90;
          const endAngle = (index + 1) * segmentAngle - 90;
          const midAngle = (startAngle + endAngle) / 2;
          const midAngleRad = (midAngle * Math.PI) / 180;
          const textRadius = (OUTER_RADIUS + INNER_RADIUS) / 2;
          const textX = WHEEL_CENTER_X + textRadius * Math.cos(midAngleRad);
          const textY = WHEEL_CENTER_Y + textRadius * Math.sin(midAngleRad);

          return (
            <g key={index}>
              <path
                d={createWedgePath(
                  startAngle,
                  endAngle,
                  OUTER_RADIUS,
                  INNER_RADIUS
                )}
                fill={getSegmentColor(item.color)}
                stroke="var(--roulette-wheel-base)"
                strokeWidth="2"
              />
              <text
                x={textX}
                y={textY}
                fill="white"
                fontSize="20"
                fontWeight="bold"
                fontFamily="Geist, sans-serif"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${midAngle + 90} ${textX} ${textY})`}
              >
                {item.num}
              </text>
            </g>
          );
        })}
      </g>

      {showBall && (
        <g filter="url(#ballGlow)">
          <circle
            cx={ballX}
            cy={ballY}
            r="12"
            fill="url(#ballGradient)"
            stroke="#999"
            strokeWidth="1.5"
          />
          <circle
            cx={ballX - 3}
            cy={ballY - 3}
            r="4"
            fill="white"
            opacity="0.9"
          />
        </g>
      )}

      {/* <g filter="url(#shadow)">
        <line
          x1={WHEEL_CENTER_X}
          y1={WHEEL_CENTER_Y}
          x2={WHEEL_CENTER_X + 70}
          y2={WHEEL_CENTER_Y - 70}
          stroke="url(#armGradient1)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <circle
          cx={WHEEL_CENTER_X + 70}
          cy={WHEEL_CENTER_Y - 70}
          r="14"
          fill="url(#capGradient)"
          stroke="#1D2331"
          strokeWidth="1"
        />
        <circle
          cx={WHEEL_CENTER_X + 67}
          cy={WHEEL_CENTER_Y - 73}
          r="5"
          fill="#6b7c8f"
          opacity="0.5"
        />

        <line
          x1={WHEEL_CENTER_X}
          y1={WHEEL_CENTER_Y}
          x2={WHEEL_CENTER_X - 70}
          y2={WHEEL_CENTER_Y - 70}
          stroke="url(#armGradient1)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <circle
          cx={WHEEL_CENTER_X - 70}
          cy={WHEEL_CENTER_Y - 70}
          r="14"
          fill="url(#capGradient)"
          stroke="#1D2331"
          strokeWidth="1"
        />
        <circle
          cx={WHEEL_CENTER_X - 73}
          cy={WHEEL_CENTER_Y - 73}
          r="5"
          fill="#6b7c8f"
          opacity="0.5"
        />

        <line
          x1={WHEEL_CENTER_X}
          y1={WHEEL_CENTER_Y}
          x2={WHEEL_CENTER_X - 70}
          y2={WHEEL_CENTER_Y + 70}
          stroke="url(#armGradient1)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <circle
          cx={WHEEL_CENTER_X - 70}
          cy={WHEEL_CENTER_Y + 70}
          r="14"
          fill="url(#capGradient)"
          stroke="#1D2331"
          strokeWidth="1"
        />
        <circle
          cx={WHEEL_CENTER_X - 73}
          cy={WHEEL_CENTER_Y + 67}
          r="5"
          fill="#6b7c8f"
          opacity="0.4"
        />

        <line
          x1={WHEEL_CENTER_X}
          y1={WHEEL_CENTER_Y}
          x2={WHEEL_CENTER_X + 70}
          y2={WHEEL_CENTER_Y + 70}
          stroke="url(#armGradient1)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <circle
          cx={WHEEL_CENTER_X + 70}
          cy={WHEEL_CENTER_Y + 70}
          r="14"
          fill="url(#capGradient)"
          stroke="#1D2331"
          strokeWidth="1"
        />
        <circle
          cx={WHEEL_CENTER_X + 67}
          cy={WHEEL_CENTER_Y + 67}
          r="5"
          fill="#6b7c8f"
          opacity="0.4"
        />

        <circle
          cx={WHEEL_CENTER_X}
          cy={WHEEL_CENTER_Y}
          r="32"
          fill="url(#hubGradient)"
          stroke="#1D2331"
          strokeWidth="2"
        />
        <circle
          cx={WHEEL_CENTER_X}
          cy={WHEEL_CENTER_Y}
          r="32"
          fill="url(#hubInnerShadow)"
        />
        <ellipse
          cx={WHEEL_CENTER_X - 8}
          cy={WHEEL_CENTER_Y - 8}
          rx="12"
          ry="10"
          fill="#6b7c8f"
          opacity="0.4"
          transform={`rotate(-30 ${WHEEL_CENTER_X - 8} ${WHEEL_CENTER_Y - 8})`}
        />
      </g> */}

      {/* Inner circle background - changes color based on result */}
      <circle
        cx={WHEEL_CENTER_X}
        cy={WHEEL_CENTER_Y}
        r={INNER_RADIUS}
        fill={
          showOverlay
            ? isWin
              ? "url(#winGradient)"
              : "url(#lossGradient)"
            : "#1D2331"
        }
        opacity={showOverlay ? (isWin ? 0.85 : 0.65) : 0.6}
        style={{
          transition: "fill 0.3s ease, opacity 0.3s ease",
        }}
      />

      <CenterLock
        centerX={WHEEL_CENTER_X}
        centerY={WHEEL_CENTER_Y}
        rotation={rotation}
      />

      {/* Result Overlay Text */}
      {showOverlay && (
        <g>
          {/* Overlay text */}
          <text
            x={WHEEL_CENTER_X}
            y={WHEEL_CENTER_Y + (isWin ? -10 : 30)}
            fill="white"
            fontSize="32"
            fontWeight="bold"
            fontFamily="Geist, sans-serif"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {isWin ? "YOU WIN" : "ROUND IS OVER"}
          </text>

          {isWin && result && (
            <g>
              {/* Win amount text and coin icon group - centered together */}
              <g
                transform={`translate(${WHEEL_CENTER_X}, ${
                  WHEEL_CENTER_Y + 40
                })`}
              >
                {/* Text centered */}
                <text
                  x="0"
                  y="0"
                  fill="white"
                  fontSize="28"
                  fontWeight="bold"
                  fontFamily="Geist, sans-serif"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {formatCelestium(result.totalProfit)}
                </text>

                {/* Celestium coin icon - positioned right after text (estimate ~16px per character for fontSize 28) */}
                <g
                  transform={`translate(${
                    formatCelestium(result.totalProfit).length * 8 + 20
                  }, -12) scale(2)`}
                >
                  <defs>
                    <linearGradient
                      id="coinGradient"
                      x1="3"
                      y1="3"
                      x2="650.923"
                      y2="601.083"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop />
                      <stop offset="1" stopColor="#9134EA" />
                    </linearGradient>
                    <clipPath id="coinClip">
                      <rect width="12" height="12" fill="white" />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#coinClip)">
                    <circle cx="6" cy="6" r="6" fill="#D9D9D9" />
                    <path
                      d="M6 3L3 4.625V7.875L6 9.5L8.99914 7.87549L9 7.87419V4.625L6 3ZM6 3.62554L8.13343 4.781L7.5564 5.09365L6 4.25101L4.44394 5.09389L3.8664 4.781L6 3.62554ZM7.26814 5.56311V6.62416L6.28877 6.094V5.03288L7.26814 5.56311ZM5.71123 5.03288V6.09376L4.73211 6.62408V5.56311L5.71123 5.03288ZM5.71123 8.71813L3.57729 7.56235V5.24998L4.15449 5.56263V7.24946L5.71123 8.09275V8.71813ZM5.02037 7.09313L5.99974 6.56265L6.97937 7.09313L6 7.62345L5.02037 7.09313ZM8.42271 7.56235L6.28877 8.71813V8.09275L7.84543 7.24978V5.56263L8.42263 5.24998L8.42271 7.56235Z"
                      fill="url(#coinGradient)"
                    />
                  </g>
                </g>
              </g>
            </g>
          )}

          {/* Play again text - shown for both win and loss */}
          <text
            x={WHEEL_CENTER_X}
            y={WHEEL_CENTER_Y + (isWin && result ? 100 : 90)}
            fill="white"
            fontSize="24"
            textAnchor="middle"
            dominantBaseline="middle"
            opacity="0.9"
            textDecoration="underline"
          >
            Play again
          </text>
        </g>
      )}

      {/* Round info text - hidden during overlay */}
      {!showOverlay && (
        <g>
          <text
            x={WHEEL_CENTER_X}
            y={WHEEL_CENTER_Y - 30}
            fill="white"
            fontSize="28"
            fontWeight="bold"
            fontFamily="Geist, sans-serif"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Round #2323
          </text>

          <text
            x={WHEEL_CENTER_X}
            y={WHEEL_CENTER_Y + 110}
            fill="var(--roulette-text-muted)"
            fontSize="24"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Start game in:
          </text>

          <text
            x={WHEEL_CENTER_X}
            y={WHEEL_CENTER_Y + 150}
            fill="white"
            fontSize="48"
            fontWeight="bold"
            fontFamily="Geist, sans-serif"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            00:{timeLeft.toString().padStart(2, "0")}
          </text>
        </g>
      )}
    </svg>
  );
};

export default WheelSvg;
