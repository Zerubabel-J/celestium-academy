"use client";

import type React from "react";
import { useMediaQuery } from "react-responsive";

import SpinControls from "./components/SpinControls";
import WheelSvg from "./components/WheelSvg";
import {
  WHEEL_CANVAS_OFFSET_Y,
  WHEEL_VISIBLE_HEIGHT,
} from "./constants/constants";
import useRouletteWheel from "./hooks/useRouletteWheel";
import type { SpinResultSummary } from "./types/results";

interface RouletteWheelProps {
  onSpinStart?: () => void;
  onSpinComplete?: (payload: { winningNumber: number }) => void;
  result?: SpinResultSummary | null;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({
  onSpinStart,
  onSpinComplete,
  result,
}) => {
  const {
    ballPosition,
    isSpinning,
    rotation,
    segmentAngle,
    showBall,
    showCelebration,
    spinWheel,
    timeLeft,
  } = useRouletteWheel({
    onSpinStart,
    onSpinComplete,
  });

  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });

  const getScale = () => {
    if (isMobile) return 1.25;
    if (isTablet) return 0.95;
    return 1.2;
  };

  const scale = getScale();

  return (
    <div
      className="relative w-full flex flex-col items-center max-w-full"
      style={{ gap: 0 }}
    >
      <div
        className="w-full flex flex-col items-center relative overflow-visible"
        style={{ minHeight: `${WHEEL_VISIBLE_HEIGHT * scale}px` }}
      >
        <div
          className="transition-transform duration-300"
          style={{
            transform: `translateY(${WHEEL_CANVAS_OFFSET_Y}px) scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          <WheelSvg
            ballPosition={ballPosition}
            rotation={rotation}
            segmentAngle={segmentAngle}
            showBall={showBall}
            timeLeft={timeLeft}
            result={result}
            isSpinning={isSpinning}
          />
        </div>
        <div className="-mt-60 mb-20 relative z-10">
          <SpinControls
            isSpinning={isSpinning}
            onSpin={spinWheel}
            result={result}
          />
        </div>
      </div>
    </div>
  );
};

export default RouletteWheel;
