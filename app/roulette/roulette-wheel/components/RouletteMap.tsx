"use client";
import { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { MapChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";

import { useRouletteMapHighlight } from "../hooks/useRouletteMapHighlight";
import { useRouletteMapSize } from "../hooks/useRouletteMapSize";
import useRouletteMapData from "../hooks/useRouletteMapData";
import useRouletteMapEvents from "../hooks/useRouletteMapEvents";
import type { Bet } from "../../betting-board/types/types";

echarts.use([MapChart, TooltipComponent, SVGRenderer]);

interface RouletteMapProps {
  disabled?: boolean;
  bets: Bet[];
  onNumberSelect: (value: number) => void;
  onNumbersSelect?: (values: number[]) => void;
  winningNumber?: number | null;
}

export default function RouletteMap({
  disabled = false,
  bets,
  onNumberSelect,
  onNumbersSelect,
  winningNumber,
}: RouletteMapProps) {
  const { handleHover, handleLeave, highlightNumber, registerChart } =
    useRouletteMapHighlight();

  const { width, height } = useRouletteMapSize();

  const option = useRouletteMapData({ bets });

  const onEvents = useRouletteMapEvents({
    disabled,
    onNumberSelect,
    onNumbersSelect,
    handleHover,
    handleLeave,
  });

  useEffect(() => {
    highlightNumber(winningNumber ?? null);
  }, [highlightNumber, winningNumber]);

  if (!option) return null;

  return (
    <div className="roulette-map-container">
      <ReactECharts
        echarts={echarts}
        option={option}
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: `${width}/${height}`,
        }}
        opts={{ renderer: "svg" }}
        onEvents={onEvents}
        onChartReady={(instance) => {
          registerChart(instance);
        }}
      />
    </div>
  );
}
