import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  BALL_BOUNCE_AMPLITUDE,
  BALL_ROTATIONS,
  FINAL_BALL_ANGLE,
  FINAL_BALL_RADIUS,
  FULL_ROTATIONS,
  ROULETTE_NUMBERS,
  SPIN_DURATION,
  TIMER_START,
} from "../constants/constants";
import type { BallPosition } from "../types/types";

interface RouletteWheelOptions {
  onSpinStart?: () => void;
  onSpinComplete?: (payload: { winningNumber: number }) => void;
}

const useRouletteWheel = (options: RouletteWheelOptions = {}) => {
  const [timeLeft, setTimeLeft] = useState(TIMER_START);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [ballPosition, setBallPosition] = useState<BallPosition>({
    angle: 0,
    radius: 0,
  });
  const [showBall, setShowBall] = useState(false);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const animationRef = useRef<number | null>(null);
  const spinStartTime = useRef<number>(0);
  const celebrationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const { onSpinStart, onSpinComplete } = options;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((previous) => (previous > 0 ? previous - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (celebrationTimeoutRef.current) {
        clearTimeout(celebrationTimeoutRef.current);
      }
    };
  }, []);

  const segmentAngle = useMemo(() => 360 / ROULETTE_NUMBERS.length, []);

  const spinWheel = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowBall(true);
    setShowCelebration(false);
    if (celebrationTimeoutRef.current) {
      clearTimeout(celebrationTimeoutRef.current);
      celebrationTimeoutRef.current = null;
    }

    onSpinStart?.();

    const serverWinningNumber =
      ROULETTE_NUMBERS[Math.floor(Math.random() * ROULETTE_NUMBERS.length)].num;
    setWinningNumber(serverWinningNumber);

    const winningIndex = ROULETTE_NUMBERS.findIndex(
      (item) => item.num === serverWinningNumber
    );

    const targetAngle =
      360 * FULL_ROTATIONS + 180 - (winningIndex + 0.5) * segmentAngle;

    const duration = SPIN_DURATION;
    spinStartTime.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - spinStartTime.current;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 4);

      const currentRotation = targetAngle * easeOut;
      setRotation(currentRotation);

      if (progress < 0.75) {
        const bounceIntensity = 1 - progress;

        const ballAngle = ((elapsed / 50) * 360) / (360 / BALL_ROTATIONS);

        const radiusVariation =
          Math.sin(elapsed / 60) * BALL_BOUNCE_AMPLITUDE * bounceIntensity;
        const ballRadius = FINAL_BALL_RADIUS + radiusVariation;

        setBallPosition({ angle: ballAngle, radius: ballRadius });
      } else {
        const settleProgress = (progress - 0.75) / 0.25;
        const settleEase = 1 - Math.pow(1 - settleProgress, 3);

        const settleStartTime = duration * 0.75;
        const settleStartAngle =
          ((settleStartTime / 50) * 360) / (360 / BALL_ROTATIONS);

        const targetAngle =
          settleStartAngle +
          ((FINAL_BALL_ANGLE - (settleStartAngle % 360) + 360) % 360);
        const ballAngle =
          settleStartAngle + (targetAngle - settleStartAngle) * settleEase;

        // Continue the same random bouncing effect, but decaying
        const bounceIntensity = 1 - settleEase;
        const radiusVariation =
          Math.sin(elapsed / 60) * BALL_BOUNCE_AMPLITUDE * bounceIntensity;
        const ballRadius = FINAL_BALL_RADIUS + radiusVariation;

        setBallPosition({
          angle: ballAngle,
          radius: ballRadius,
        });
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setBallPosition({ angle: FINAL_BALL_ANGLE, radius: FINAL_BALL_RADIUS });
        setIsSpinning(false);
        setShowCelebration(true);
        onSpinComplete?.({ winningNumber: serverWinningNumber });
        celebrationTimeoutRef.current = setTimeout(() => {
          setShowCelebration(false);
        }, 3500);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [isSpinning, segmentAngle, onSpinComplete, onSpinStart]);

  return {
    ballPosition,
    isSpinning,
    rotation,
    segmentAngle,
    showBall,
    showCelebration,
    spinWheel,
    timeLeft,
    winningNumber,
  };
};

export default useRouletteWheel;
