"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import * as echarts from "echarts";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Player } from "../types";
import foxIcon from "../assets/fox.svg";
import cashCelestiumIcon from "../assets/cash_celestium.svg";
import { getShortAddress, formatNumber } from "../utils/formatNumbers";
import { SEGMENT_COLORS } from "../constants/betting";

interface SpinningWheelProps {
  players: Player[];
  gamePhase:
    | "standby"
    | "waiting"
    | "betting"
    | "spinning"
    | "landed"
    | "stopped";
  timeLeft: number;
  winningPlayer?: Player;
  targetWinnerIndex?: number;
  onSpinComplete?: (winner: Player, winnerIndex: number) => void;
  className?: string;
}

const getWheelSize = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth >= 768 ? 640 : 560;
  }
  return 560;
};

const createTooltipFormatter = (players: Player[]) => (params: any) => {
  const player =
    params.data?.player ||
    players.find((p) => p.username === params.name) ||
    players[0];
  const segmentColor = params.data?.segmentColor || SEGMENT_COLORS[0];
  const betAmount = formatNumber(player.betAmount || 0);
  const walletAddress = getShortAddress(player.walletAddress || "");

  return `
    <div style="
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      border-radius: 8px;
      background: white;
      padding: 12px 16px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      min-width: 280px;
    ">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 40px; height: 40px; flex-shrink: 0;">
          <img 
            src="${(foxIcon as any)?.src || foxIcon}" 
            alt="Player avatar" 
            style="width: 100%; height: 100%; object-fit: contain;"
            loading="eager"
          />
        </div>
        <div style="display: flex; flex-direction: column;">
          <span style="font-size: 14px; font-weight: 500; color: #111827;">
            ${player.username || "Unknown"}
          </span>
          <span style="font-size: 12px; color: #6b7280;">
            ${walletAddress}
          </span>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 24px; font-weight: 600; color: #111827;">
          ${betAmount}
        </span>
        <img 
          src="${(cashCelestiumIcon as any)?.src || cashCelestiumIcon}" 
          alt="Bet token" 
          style="width: 48px; height: 48px;"
          loading="eager"
        />
      </div>
      <div style="
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 4px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        background: ${segmentColor};
      "></div>
    </div>
  `;
};

export const SpinningWheel: React.FC<SpinningWheelProps> = ({
  players,
  gamePhase,
  timeLeft,
  winningPlayer,
  targetWinnerIndex,
  onSpinComplete,
  className,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [wheelSize, setWheelSize] = useState(560);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!chartRef.current) return;

    const size = getWheelSize();
    setWheelSize(size);
    chartRef.current.style.width = `${size}px`;
    chartRef.current.style.height = `${size}px`;

    chartInstance.current = echarts.init(chartRef.current, null, {
      renderer: "svg",
      width: size,
      height: size,
    });

    const handleResize = () => {
      if (chartInstance.current && chartRef.current) {
        const newSize = getWheelSize();
        setWheelSize(newSize);
        chartRef.current.style.width = `${newSize}px`;
        chartRef.current.style.height = `${newSize}px`;
        chartInstance.current.resize({ width: newSize, height: newSize });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartInstance.current || players.length === 0) return;

    const chartData = players.map((player, index) => ({
      value: player.betAmount || 1,
      name: player.username,
      player,
      segmentColor: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
      itemStyle: {
        color: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
        opacity:
          player.status === "won" ? 1 : player.status === "lost" ? 0.35 : 0.85,
        borderColor: player.status === "won" ? "#fbbf24" : "transparent",
        borderWidth: player.status === "won" ? 4 : 1,
      },
    }));

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "item",
        formatter: createTooltipFormatter(players),
        backgroundColor: "transparent",
        borderWidth: 0,
        padding: 0,
        extraCssText: "box-shadow: none;",
        enterable: true,
        hideDelay: 100,
        transitionDuration: 0,
      },
      series: [
        {
          name: "Player Bets",
          type: "pie",
          radius: ["65%", "85%"],
          center: ["50%", "50%"],
          startAngle: 90,
          avoidLabelOverlap: false,
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
              color: "#fff",
            },
          },
          data: chartData,
        },
      ],
    };

    chartInstance.current.setOption(option);

    if (chartRef.current) {
      chartInstance.current.resize({ width: wheelSize, height: wheelSize });
    }
  }, [players, wheelSize]);

  useEffect(() => {
    if (gamePhase === "spinning") {
      const startTime = Date.now();
      const duration = 3000;
      let animationFrame: number;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const newRotation = easeOut * 1080;
        setRotation(newRotation);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setRotation(1080);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    } else {
      setRotation(0);
    }
  }, [gamePhase]);

  const centerData = useMemo(() => {
    const totalMoney = players.reduce((sum, p) => sum + (p.betAmount || 0), 0);
    const playersPlaced = players.length;

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return {
      time: formatTime(timeLeft),
      money: totalMoney,
      placed: playersPlaced,
    };
  }, [players, timeLeft]);
  const wheelRadius = wheelSize / 2;
  const chartRadius = wheelRadius * 0.85;
  const borderRadius = wheelRadius * 0.9;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full",
        className
      )}
    >
      <div
        className="relative mx-auto"
        style={{ width: `${wheelSize}px`, height: `${wheelSize}px` }}
      >
        <div
          ref={chartRef}
          className="w-full h-full transition-transform duration-300"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center",
          }}
        />

        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox={`0 0 ${wheelSize} ${wheelSize}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <circle
              cx={wheelRadius}
              cy={wheelRadius}
              r={borderRadius}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="8"
            />
          </svg>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center gap-3">
          <div className="text-white text-sm md:text-base font-medium">
            {centerData.time}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white text-lg md:text-xl font-semibold">
              {formatNumber(centerData.money)}
            </span>
            <Image
              src={cashCelestiumIcon}
              alt="CELESTIUM"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </div>
          <div className="text-white text-sm md:text-base font-medium">
            {centerData.placed} placed
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div
            className="absolute"
            style={{
              transform: `rotate(0deg)`,
              transformOrigin: "center",
            }}
          >
            <div
              className="w-0 h-0 border-l-10 border-r-10 border-b-20 border-transparent border-b-yellow-400"
              style={{
                position: "absolute",
                top: `-${borderRadius}px`,
                left: "50%",
                transform: "translateX(-50%) rotate(180deg)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
