import {
  motion,
  useMotionTemplate,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import clsx from "clsx";
import type { StoneView } from "../../../types";
import { formatCurrency } from "../../../utils";
import cashCelestiumIcon from "../../../assets/Roulette/cash_celestium.svg";

const DEFAULT_GLOW_RGB: [number, number, number] = [56, 189, 248];

const extractRgb = (value: string | undefined): [number, number, number] => {
  if (!value) return DEFAULT_GLOW_RGB;

  const rgbaMatch = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbaMatch) {
    return [Number(rgbaMatch[1]), Number(rgbaMatch[2]), Number(rgbaMatch[3])];
  }

  const hexMatch = value.match(/^#?([0-9a-f]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }

  return DEFAULT_GLOW_RGB;
};

type StoneBadgeProps = {
  stone: StoneView;
  angle: number;
  radius: number;
  labelOffset: number;
  isSelected: boolean;
  isWinner: boolean;
  onSelectStone: (stoneId: string) => void;
  wheelRotation: MotionValue<number>;
  bonusPool?: number;
};

export const StoneBadge = ({
  stone,
  angle,
  radius,
  labelOffset,
  isSelected,
  isWinner,
  onSelectStone,
  wheelRotation,
  bonusPool = 0,
}: StoneBadgeProps) => {
  const bonusAmount = bonusPool * stone.share;
  const bonusValue = bonusAmount > 0 ? formatCurrency(bonusAmount) : "0";
  const normalizedAngle = ((angle % 360) + 360) % 360;
  const [glowR, glowG, glowB] = extractRgb(stone.glow ?? stone.color);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const normalize = (value: number) => ((value % 360) + 360) % 360;

  const shortestDelta = (target: number, current: number) => {
    const delta = normalize(target) - normalize(current);
    return ((((delta + 540) % 360) + 360) % 360) - 180;
  };

  const iconRotateRaw = useTransform(wheelRotation, (wheelRotationValue) => {
    const totalAngle = normalize(normalizedAngle + wheelRotationValue);
    const desiredOrientation = clamp(
      Math.sin(((totalAngle - 180) * Math.PI) / 180) * 10,
      -10,
      10
    );

    return shortestDelta(desiredOrientation, angle + wheelRotationValue);
  });

  const iconRotate = useSpring(iconRotateRaw, {
    stiffness: 160,
    damping: 26,
    mass: 0.7,
  });

  const glowIntensity = useTransform(iconRotate, (rotation) =>
    clamp(Math.abs(rotation) / 8, 0, 1)
  );

  const glowRadius = useTransform(
    glowIntensity,
    (intensity) => (12 + intensity * 24) * 0.3
  );
  const glowAlpha = useTransform(
    glowIntensity,
    (intensity) => (0.18 + intensity * 0.42) * 0.15
  );
  const glowScale = useTransform(
    glowIntensity,
    (intensity) => 1 + intensity * 0.05
  );
  const glowBrightness = useTransform(
    glowIntensity,
    (intensity) => 1 + intensity * 0.2
  );
  const glowSaturate = useTransform(
    glowIntensity,
    (intensity) => 1 + intensity * 0.25
  );

  const glowColor = useMotionTemplate`rgba(${glowR}, ${glowG}, ${glowB}, ${glowAlpha})`;
  const glowDropShadow = useMotionTemplate`drop-shadow(0 0 ${glowRadius}px ${glowColor})`;
  const glowFilter = useMotionTemplate`brightness(${glowBrightness}) saturate(${glowSaturate}) ${glowDropShadow}`;

  const labelRotate = useTransform(
    wheelRotation,
    (wheelRotationValue) => -(angle + wheelRotationValue)
  );

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: `rotate(${angle}deg) translateY(-${radius}px)`,
      }}
    >
      <div
        className="relative flex flex-col items-center justify-center gap-2 md:gap-2"
        style={{ fontSize: "clamp(0.5rem, 1.5vw, 1rem)" }}
      >
        <button
          type="button"
          onClick={() => onSelectStone(stone.id)}
          className={clsx(
            "flex items-center justify-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
            isWinner
              ? "drop-shadow-[0_0_10px_rgba(34,197,94,0.2)] md:drop-shadow-[0_0_42px_rgba(34,197,94,0.55)]"
              : isSelected
              ? "drop-shadow-[0_0_8px_rgba(59,130,246,0.2)] md:drop-shadow-[0_0_33px_rgba(59,130,246,0.45)]"
              : ""
          )}
          style={{
            width: "clamp(2.5rem, 5vw, 5rem)",
            height: "clamp(2.5rem, 5vw, 5rem)",
          }}
        >
          <motion.div
            className="flex items-center justify-center w-full h-full"
            animate={{
              scale: isWinner ? [1, 1.1, 1] : isSelected ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: isWinner || isSelected ? 1.6 : 0.5,
              repeat: isWinner || isSelected ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="flex h-full w-full items-center justify-center"
              style={{
                rotate: iconRotate,
                scale: glowScale,
                filter: glowFilter,
              }}
            >
              <Image
                src={stone.icon}
                alt={stone.name}
                width={63}
                height={63}
                className="select-none w-full h-full md:w-full md:h-full scale-90 md:scale-100"
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          </motion.div>
        </button>

        <motion.div
          className="pointer-events-none flex flex-col items-center gap-0 md:gap-1 text-center font-medium text-slate-400 -translate-y-2 md:translate-y-0"
          style={{
            rotate: labelRotate,
          }}
        >
          <span className="text-lg font-semibold text-slate-100 hidden md:block">
            {stone.name}
          </span>
          <div className="flex items-center justify-center gap-1 scale-90 md:scale-100">
            <Image
              src={cashCelestiumIcon}
              alt="CELESTIUM"
              width={12}
              height={12}
              className="w-2.5 h-2.5 md:w-3 md:h-3"
            />
            <span className="text-sm font-semibold text-white">
              {formatCurrency(stone.volume)}
            </span>
          </div>
          <span className="text-[10px] md:text-xs text-blue-400">
            {bonusValue} BONUS
          </span>
        </motion.div>
      </div>
    </div>
  );
};
