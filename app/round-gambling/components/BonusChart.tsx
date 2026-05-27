"use client";

import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { cn } from "@/lib/utils";
import type { BonusData } from "../types";
import { SEGMENT_COLORS } from "../constants/betting";

interface BonusChartProps {
  data: BonusData;
  className?: string;
}

const CHART_COLORS = [
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
  "#f97316",
  "#3b82f6",
];

export const BonusChart: React.FC<BonusChartProps> = ({ data, className }) => {
  const option = useMemo(() => {
    return {
      backgroundColor: "transparent",
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: data.rounds.map((round) => round.toString()),
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          type: "bar",
          data: data.multipliers,
          itemStyle: {
            color: (params: any) => {
              return CHART_COLORS[params.dataIndex % CHART_COLORS.length];
            },
            borderRadius: [2, 2, 0, 0],
          },
          barWidth: "60%",
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderColor: "#374151",
        borderWidth: 1,
        textStyle: {
          color: "#fff",
        },
        formatter: (params: any) => {
          const point = params[0];
          return `Round ${point.name}<br/>Multiplier: ${point.value.toFixed(
            2
          )}x`;
        },
      },
      animation: true,
      animationDuration: 1000,
      animationEasing: "elasticOut",
    };
  }, [data]);

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4">
        <h3 className="text-white/70 text-sm mb-2">
          Your potential Bonus: 3.27k CELESTIUM
        </h3>
        <div className="flex items-center justify-between text-xs text-white/50">
          <span>First CELESTIUM</span>
          <span>Last CELESTIUM</span>
        </div>
      </div>
      <div className="h-32 w-full">
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
          opts={{ renderer: "canvas" }}
        />
      </div>
      <div className="flex items-center justify-between mt-2 text-xs text-white/50">
        <span>Coefficient 1.01</span>
        <span>Coefficient 10</span>
      </div>
    </div>
  );
};
