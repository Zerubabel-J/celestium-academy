import { motion } from "motion/react";
import {
  WHEEL_SIZE,
  OUTER_RADIUS,
  INNER_RING_RADIUS,
  INNER_CORE_RADIUS,
  INNER_SEGMENT_COLORS,
} from "../../../constants/roulette";
import { describeSector, describeRingSegment } from "../../../utils/geometry";
import type { Segment } from "../../../utils/segments";

type WheelSvgProps = {
  segments: Segment[];
  selectedStoneId: string;
  winnerStoneId: string | null;
};

export const WheelSvg = ({
  segments,
  selectedStoneId,
  winnerStoneId,
}: WheelSvgProps) => {
  const center = WHEEL_SIZE / 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
      className="h-full w-full"
    >
      <defs>
        {segments.map((segment) => (
          <radialGradient
            key={`base-${segment.index}`}
            id={`segment-base-${segment.index}`}
            cx="50%"
            cy="50%"
            r="75%"
          >
            <stop offset="0%" stopColor="rgba(60, 64, 118, 0.55)" />
            <stop offset="55%" stopColor={segment.baseColor} />
            <stop offset="100%" stopColor="#0A0D1C" />
          </radialGradient>
        ))}

        {segments.map((segment) => (
          <linearGradient
            key={`active-${segment.index}`}
            id={`segment-active-${segment.index}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor={segment.stone.glow}
              stopOpacity={0.35}
            />
            <stop
              offset="60%"
              stopColor={segment.stone.border}
              stopOpacity={0.6}
            />
            <stop
              offset="100%"
              stopColor={segment.stone.glow}
              stopOpacity={0.2}
            />
          </linearGradient>
        ))}

        <radialGradient id="inner-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#29315D" />
          <stop offset="60%" stopColor="#151B37" />
          <stop offset="100%" stopColor="#0C1024" />
        </radialGradient>
      </defs>

      {segments.map((segment) => {
        const isSelected = segment.stone.id === selectedStoneId;
        const isWinner = segment.stone.id === winnerStoneId;
        const fill = isWinner
          ? `url(#segment-active-${segment.index})`
          : `url(#segment-base-${segment.index})`;

        return (
          <path
            key={`outer-${segment.index}`}
            d={describeSector(
              center,
              OUTER_RADIUS,
              segment.startAngle,
              segment.endAngle
            )}
            fill={fill}
            stroke={isSelected ? segment.stone.border : "#141326"}
            strokeWidth={isSelected ? 2 : 0.5}
          />
        );
      })}

      {segments.map((segment) => (
        <path
          key={`inner-${segment.index}`}
          d={describeSector(
            center,
            INNER_RING_RADIUS,
            segment.startAngle,
            segment.endAngle
          )}
          fill={
            INNER_SEGMENT_COLORS[segment.index % INNER_SEGMENT_COLORS.length]
          }
        />
      ))}

      <circle
        cx={center}
        cy={center}
        r={INNER_CORE_RADIUS}
        fill="url(#inner-glow)"
        stroke="#201C40"
        strokeWidth={1.5}
      />

      <circle
        cx={center}
        cy={center}
        r={OUTER_RADIUS}
        fill="none"
        stroke="#131624"
        strokeWidth={0.5}
      />

      {segments.map((segment) => {
        const isSelection =
          segment.stone.id === selectedStoneId ||
          (winnerStoneId && segment.stone.id === winnerStoneId);
        if (!isSelection) return null;

        const isWinner = segment.stone.id === winnerStoneId;
        const strokeColor = segment.stone.border;

        return (
          <motion.path
            key={`highlight-${segment.index}`}
            d={describeRingSegment(
              center,
              OUTER_RADIUS + 3,
              OUTER_RADIUS - 20,
              segment.startAngle,
              segment.endAngle
            )}
            fill="none"
            stroke={strokeColor}
            strokeWidth={isWinner ? 5 : 3}
            strokeOpacity={isWinner ? 1 : 0.7}
            strokeDasharray={isWinner ? "none" : "8 4"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
            style={{
              filter: isWinner
                ? `drop-shadow(0 0 12px ${strokeColor})`
                : `drop-shadow(0 0 4px ${strokeColor})`,
            }}
          />
        );
      })}

      <circle
        cx={center}
        cy={center}
        r={INNER_RING_RADIUS + 2}
        fill="none"
        stroke="rgba(59,130,246,0.12)"
        strokeWidth={1}
      />
    </svg>
  );
};
