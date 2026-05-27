import { motion, useMotionValue } from "motion/react";
import { useMemo, useRef, useEffect, useState } from "react";
import type { StoneView } from "../../types";
import { buildSegments } from "../../utils/segments";
import {
  CRYSTAL_RING_RADIUS,
  LABEL_OFFSET,
  WHEEL_SIZE,
} from "../../constants/roulette";
import { useRouletteAnimation } from "./hooks/useRouletteAnimation";
import { WheelSvg } from "./components/WheelSvg";
import { StoneBadge } from "./components/StoneBadge";
import { Pointer } from "./components/Pointer";
import { CenterBadge } from "./components/CenterBadge";

type RouletteWheelProps = {
  stones: StoneView[];
  selectedStoneId: string;
  spinKey: number;
  spinTarget: string | null;
  isSpinning: boolean;
  winnerStoneId: string | null;
  onSpinComplete: (stoneId: string) => void;
  onSelectStone: (stoneId: string) => void;
  bonusPool?: number;
  timeLeft: number;
  hasWon?: boolean;
  hasLost?: boolean;
  winningAmount?: number;
  bonusAmount?: number;
};

const RouletteWheel = ({
  stones,
  selectedStoneId,
  spinKey,
  spinTarget,
  isSpinning,
  winnerStoneId,
  onSpinComplete,
  onSelectStone,
  bonusPool = 0,
  timeLeft,
  hasWon = false,
  hasLost = false,
  winningAmount = 0,
  bonusAmount = 0,
}: RouletteWheelProps) => {
  const { segments, ordered } = useMemo(() => buildSegments(stones), [stones]);
  const sliceAngle = segments.length > 0 ? 360 / segments.length : 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState(WHEEL_SIZE);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width > 0) {
          setContainerSize(width);
        }
      }
    };

    // Use ResizeObserver for more reliable size tracking
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(containerRef.current);

    // Initial update
    updateSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const stoneSlots = useMemo(() => {
    if (segments.length === 0) return [];

    // Calculate radius scaled to current container size
    const scaleFactor = containerSize / WHEEL_SIZE;
    const scaledRadius = CRYSTAL_RING_RADIUS * scaleFactor;

    return segments.map((segment) => ({
      stone: segment.stone,
      angle: segment.midAngle,
      radius: scaledRadius,
      labelOffset: LABEL_OFFSET,
    }));
  }, [segments, containerSize]);

  const rotation = useMotionValue(0);

  useRouletteAnimation({
    spinKey,
    spinTarget,
    segments,
    sliceAngle,
    rotation,
    onSpinComplete,
  });

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[1200px]">
      <div className="relative mx-auto aspect-square w-full scale-125 md:scale-100">
        <motion.div
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.28)_0%,rgba(10,11,22,0.45)_45%,rgba(5,6,15,0)_75%)] opacity-0 md:opacity-100"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: [0.85, 1.02, 1] }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />

        <div className="absolute inset-[14%] rounded-full border-[0.5px] border-sky-500/15 bg-[#131624] shadow-[0_0_30px_rgba(56,189,248,0.1)] md:shadow-[0_0_120px_rgba(56,189,248,0.18)]" />

        <motion.div
          className="absolute inset-[12%]"
          style={{ rotate: rotation }}
        >
          <WheelSvg
            segments={segments}
            selectedStoneId={selectedStoneId}
            winnerStoneId={winnerStoneId}
          />

          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: [0, 4, -4, 0],
            }}
            transition={{
              duration: 14,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {stoneSlots.map(({ stone, angle, radius, labelOffset }, index) => (
              <StoneBadge
                key={`${stone.id}-${index}`}
                stone={stone}
                angle={angle}
                radius={radius}
                labelOffset={labelOffset}
                isSelected={stone.id === selectedStoneId}
                isWinner={stone.id === winnerStoneId}
                onSelectStone={onSelectStone}
                wheelRotation={rotation}
                bonusPool={bonusPool}
              />
            ))}
          </motion.div>
        </motion.div>

        <Pointer isSpinning={isSpinning} />
        <CenterBadge
          timeLeft={timeLeft}
          hasWon={hasWon}
          hasLost={hasLost}
          winningAmount={winningAmount}
          bonusAmount={bonusAmount}
        />
      </div>
    </div>
  );
};

export default RouletteWheel;
