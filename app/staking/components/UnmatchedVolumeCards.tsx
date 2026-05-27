"use client";

import { LeftVolumeIcon } from "./icons/LeftVolumeIcon";
import { RightVolumeIcon } from "./icons/RightVolumeIcon";

function CornerBadge() {
  return (
    <div className="relative h-[18px] w-[18px]">
      <div className="absolute left-[1.5px] top-[1.5px] h-[15px] w-[15px] border border-[#6A6F84]" />
      <div className="absolute left-[6.82px] top-[5.25px] h-[4.5px] w-[4.37px] border border-[#6A6F84]" />
    </div>
  );
}

interface VolumeCardProps {
  side: "left" | "right";
  unmatched: string;
  share: string;
  cumulative: string;
  percentage: string;
}

function UnmatchedVolumeCard({ side, unmatched, share, cumulative, percentage }: VolumeCardProps) {
  const isRight = side === "right";
  const Icon = isRight ? RightVolumeIcon : LeftVolumeIcon;

  return (
    <div className="flex w-full flex-col">
      <div
        className={`relative flex w-full flex-col items-center gap-6 rounded-[10px] border border-[#151A2A] bg-[#131624] px-6 py-6 sm:h-[151px] sm:flex-row sm:gap-10 ${
          isRight ? "sm:flex-row-reverse" : ""
        }`}
      >
        <div className="absolute right-[10px] top-[10px]">
          <CornerBadge />
        </div>
        <Icon className="h-12 w-12 shrink-0" />
        <div
          className={`flex flex-col gap-2 text-center sm:text-left ${
            isRight ? "sm:items-end sm:text-right" : "sm:items-start"
          }`}
        >
          <div>
            <span className="font-abel text-base text-white">Unmatched </span>
            <span className="font-abel text-base text-[#FFC800]">
              {isRight ? "Right" : "Left"}{" "}
            </span>
            <span className="font-abel text-base text-white">volume</span>
          </div>
          <div className="font-teko text-base text-white sm:text-left">{unmatched}</div>
          <div className="font-teko text-sm text-[#FFC800]">{share} share</div>
        </div>
      </div>
      <div className="mt-4 text-center font-abel text-xs text-[#6A6F84]">
        <span>
          Cumulative {isRight ? "right" : "left"} volume {cumulative}
        </span>
        <span className="font-teko"> = </span>
        <span className="font-teko text-[#FFC800]">{percentage}</span>
        <span className="font-teko"> of total volume.</span>
      </div>
    </div>
  );
}

export function UnmatchedVolumeCards() {
  const leftVolume = {
    unmatched: "3,503,000 CELESTIUM",
    share: "35%",
    cumulative: "10,000,000 CELESTIUM",
    percentage: "40%",
  };

  const rightVolume = {
    unmatched: "3,503,000 CELESTIUM",
    share: "65%",
    cumulative: "15,000,000 CELESTIUM",
    percentage: "60%",
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <UnmatchedVolumeCard side="left" {...leftVolume} />
      <UnmatchedVolumeCard side="right" {...rightVolume} />
    </div>
  );
}
