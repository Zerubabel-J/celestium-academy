"use client";

import { useEffect, useRef, useState } from "react";
import type { EChartsType } from "echarts";
import ReactECharts from "echarts-for-react";
import { ChevronRight } from "lucide-react";

interface ChartPoint {
  value: number;
  index: number;
}

export function CryptoChart() {
  const [price, setPrice] = useState(0.045341);
  const [change, setChange] = useState(0);
  const [data, setData] = useState<ChartPoint[]>(
    Array.from({ length: 50 }, (_, i) => ({
      value:
        0.0435 +
        Math.sin(i / 2.4) * 0.008 +
        Math.cos(i / 3.7) * 0.006 +
        (Math.random() - 0.5) * 0.004,
      index: i,
    }))
  );

  const basePriceRef = useRef(data[data.length - 1].value);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<EChartsType | null>(null);
  const downDamping = 0.6;
  const upAmplify = 1.1;

  // ---- Animated updates ----
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const prevVal = prev[prev.length - 1].value;
        const prevIndex = prev[prev.length - 1].index;

        const volatility = 0.008;
        const trend = (Math.random() - 0.48) * volatility * 1.6;
        const noise = (Math.random() - 0.5) * volatility * 0.8;

        // spikes
        let spike = 0;
        const spikeChance = Math.random();
        if (spikeChance > 0.93) spike = Math.random() * 0.02 + 0.005;
        else if (spikeChance < 0.07) spike = -(Math.random() * 0.02 + 0.005);

        const newVal = Math.max(
          0.025,
          Math.min(prevVal + trend + noise + spike, 0.065)
        );
        setPrice(newVal);

        const base = basePriceRef.current;
        let pct = ((newVal - base) / base) * 100;
        pct = pct < 0 ? pct * downDamping : pct * upAmplify;
        setChange(parseFloat(pct.toFixed(2)));

        return [...prev.slice(1), { value: newVal, index: prevIndex + 1 }];
      });
    }, 950);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const resizeChart = () => {
      chartInstanceRef.current?.resize();
    };

    const container = chartContainerRef.current;
    let observer: ResizeObserver | null = null;

    if (container && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => resizeChart());
      observer.observe(container);
    }

    window.addEventListener("resize", resizeChart);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", resizeChart);
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", resizeChart);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", resizeChart);
      }
    };
  }, []);

  // ---- ECharts Config ----
  const option = {
    animation: false,
    grid: { top: 0, left: 0, right: 0, bottom: 0 },
    xAxis: {
      type: "category",
      show: false,
      boundaryGap: false,
      data: data.map((d) => d.index),
    },
    yAxis: {
      type: "value",
      show: false,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(20,20,30,0.9)",
      borderColor: "transparent",
      textStyle: {
        color: "#FFD000",
        fontSize: 12,
        fontFamily: "Inter, sans-serif",
      },
      formatter: (params: any) => {
        const val = params[0].data.toFixed(6);
        return `$${val}`;
      },
      axisPointer: {
        lineStyle: {
          type: "dashed",
          color: "#FFD000",
        },
      },
    },
    series: [
      {
        data: data.map((d) => d.value),
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: {
          color: "#7B61FF",
          width: 3,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#8b7cff" },
              { offset: 0.5, color: "#6b5cdf" },
              { offset: 1, color: "rgba(26,27,46,0.15)" },
            ],
          },
        },
      },
    ],
  };

  // ---- Layout ----
  return (
    <div className="w-full rounded-2xl border border-white/5 bg-linear-to-br from-[#0f1117] to-[#0a0b0f] shadow-lg overflow-hidden h-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <img
            src="/celestium.png"
            alt="Celestium"
            className="w-8 h-8 rounded-full object-contain shadow-md"
          />
          <h1 className="text-[0.8rem] sm:text-sm font-semibold tracking-wide text-white select-none">
            CELESTIUM/USDT
          </h1>
        </div>
        <ChevronRight className="w-4 h-4 text-[#f4c542]" strokeWidth={2.5} />
      </div>

      {/* Chart area */}
      <div
        ref={chartContainerRef}
        className="w-full h-[90px] sm:h-[110px] md:h-[130px] min-w-0 px-2"
      >
        <ReactECharts
          option={option}
          style={{ width: "100%", height: "100%" }}
          opts={{
            renderer: "svg",
          }}
          onChartReady={(instance) => {
            chartInstanceRef.current = instance;
          }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 sm:px-6 pt-2 pb-3">
        <span className="text-base sm:text-lg font-semibold text-[#f4c542] tracking-tight truncate">
          ${price.toFixed(6)}
        </span>
        <span
          className={`text-xs sm:text-sm font-medium ${
            change >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {change >= 0 ? "+" : ""}
          {change}%
        </span>
      </div>
    </div>
  );
}
