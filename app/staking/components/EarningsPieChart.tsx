"use client";

import { useState, useRef, useEffect } from "react";

interface Segment {
  name: string;
  value: number;
  percentage: number;
  color: string;
  path: string;
  filter?: string;
}

const BASE_WIDTH = 410;
const BASE_HEIGHT = 500;

export function EarningsPieChart() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const newScale = Math.min(width / BASE_WIDTH, 1);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Exact paths from the SVG
  const segments: Segment[] = [
    {
      name: "Depth",
      value: 75,
      percentage: 75,
      color: "#201C40",
      path: "M167.5 11.3682C200.885 11.3682 233.39 22.0689 260.246 41.8999C287.102 61.731 306.895 89.6481 316.719 121.554C326.543 153.46 325.882 187.675 314.832 219.178C303.782 250.681 282.925 277.812 255.323 296.59L202.814 219.408C213.913 211.857 222.3 200.947 226.743 188.28C231.186 175.613 231.452 161.855 227.502 149.025C223.551 136.195 215.593 124.97 204.794 116.996C193.995 109.022 180.924 104.719 167.5 104.719V11.3682Z",
    },
    {
      name: "Staking",
      value: 11.25,
      percentage: 11.25,
      color: "#FFC800",
      path: "M244.729 281.765C229.39 292.132 212.121 299.305 193.951 302.856C175.782 306.406 157.083 306.262 138.97 302.433C120.857 298.603 103.7 291.165 88.5228 280.563C73.3454 269.962 60.4578 256.413 50.6283 240.724L114.299 200.832C118.773 207.974 124.64 214.141 131.549 218.967C138.458 223.793 146.268 227.179 154.513 228.922C162.758 230.666 171.27 230.731 179.541 229.115C187.812 227.499 195.673 224.234 202.656 219.514L244.729 281.765Z",
      filter: "url(#filter0_d_1_68177)",
    },
    {
      name: "Remaining",
      value: 13.75,
      percentage: 13.75,
      color: "#201C40",
      path: "M69.0143 94.4534C80.3958 79.1083 95.2056 66.635 112.263 58.0284C129.319 49.4218 148.151 44.92 167.257 44.8821L167.375 104.562C157.569 104.581 147.902 106.892 139.147 111.31C130.392 115.727 122.79 122.13 116.948 130.006L69.0143 94.4534Z",
    },
    {
      name: "Staking2",
      value: 0,
      percentage: 0,
      color: "#FFC800",
      path: "M31.9027 251.678C14.9689 224.4 6.6556 192.65 8.04897 160.573C9.44235 128.497 20.4775 97.5868 39.713 71.8803L117.252 129.9C109.688 140.009 105.349 152.163 104.801 164.776C104.253 177.389 107.522 189.874 114.181 200.6L31.9027 251.678Z",
    },
  ];

  // Gradient overlay paths
  const gradientOverlays = [
    {
      path: "M167.408 25.1543C197.825 25.1543 227.441 34.9038 251.91 52.9721C276.379 71.0404 294.412 96.476 303.363 125.546C312.314 154.616 311.711 185.79 301.643 214.492C291.576 243.194 272.573 267.914 247.424 285.023L214.303 236.339C229.042 226.311 240.179 211.824 246.079 195.002C251.98 178.181 252.333 159.911 247.087 142.874C241.841 125.837 231.272 110.93 216.932 100.341C202.592 89.7513 185.235 84.0373 167.408 84.0373V25.1543Z",
      gradient: "url(#paint0_linear_1_68177)",
      opacity: 0.25,
    },
    {
      path: "M241.236 276.643C226.573 286.554 210.064 293.411 192.694 296.805C175.324 300.199 157.449 300.062 140.133 296.401C122.817 292.739 106.416 285.629 91.907 275.494C77.3978 265.359 65.0776 252.407 55.6809 237.409L97.3893 211.277C103.278 220.676 110.999 228.793 120.092 235.145C129.185 241.496 139.463 245.952 150.315 248.247C161.166 250.541 172.369 250.627 183.254 248.5C194.14 246.373 204.486 242.076 213.675 235.865L241.236 276.643Z",
      gradient: "url(#paint1_linear_1_68177)",
      opacity: 0.6,
    },
    {
      path: "M46.5496 242.436C31.4563 218.123 24.0467 189.824 25.2886 161.234C26.5305 132.644 36.3662 105.094 53.5109 82.1816L100.749 117.529C90.7153 130.938 84.9589 147.062 84.232 163.795C83.5052 180.527 87.8417 197.089 96.6751 211.318L46.5496 242.436Z",
      gradient: "url(#paint2_linear_1_68177)",
      opacity: 0.5,
    },
    {
      path: "M72.6614 97.1586C83.6214 82.3817 97.8828 70.3703 114.308 62.0825C130.733 53.7946 148.868 49.4595 167.266 49.423L167.335 84.3492C154.379 84.3749 141.608 87.4277 130.042 93.2641C118.475 99.1005 108.432 107.559 100.714 117.965L72.6614 97.1586Z",
      gradient: "url(#paint3_linear_1_68177)",
      opacity: 0.5,
    },
  ];

  // Separator lines
  const separatorLines = [
    { x1: 168.407, y1: 11.2764, x2: 168.407, y2: 104.955 },
    { x1: 202.931, y1: 218.891, x2: 255.843, y2: 296.957 },
    { x1: 114.349, y1: 200.349, x2: 32.624, y2: 251.526 },
    { x1: 40.5023, y1: 72.0624, x2: 117.701, y2: 130.178 },
  ];

  // Handle mouse move for tooltip
  const handleMouseMove = (e: React.MouseEvent<SVGElement>, segment: Segment) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltip({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        text: `${segment.name}: ${segment.value}%`,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
    setTooltip(null);
  };

  const scaledHeight = BASE_HEIGHT * scale;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[410px]"
      style={{ height: scaledHeight }}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* Legends at the top */}
        <div className="absolute left-0 right-0 top-0" style={{ height: "46px" }}>
          {/* Direct */}
          <div className="absolute" style={{ left: "8px", top: "0px" }}>
            <div
              className="absolute rounded-full"
              style={{
                width: "20px",
                height: "20px",
                background: "#DD375F",
                borderRadius: "9999px",
              }}
            ></div>
            <div
              className="absolute text-white font-abel text-xs leading-[21px]"
              style={{
                left: "30px",
                top: "0px",
                color: "white",
                fontSize: "12px",
                fontFamily: "Abel",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              Direct
            </div>
          </div>

          {/* Depth */}
          <div className="absolute" style={{ left: "113px", top: "0px" }}>
            <div
              className="absolute rounded-full"
              style={{
                width: "20px",
                height: "20px",
                background: "#6A6F84",
                borderRadius: "9999px",
                border: "2px solid #50566B",
              }}
            ></div>
            <div
              className="absolute text-white font-abel text-xs leading-[21px]"
              style={{
                left: "30px",
                top: "0px",
                color: "white",
                fontSize: "12px",
                fontFamily: "Abel",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              Depth
            </div>
          </div>

          {/* Staking */}
          <div className="absolute" style={{ left: "218px", top: "0px" }}>
            <div
              className="absolute rounded-full"
              style={{
                width: "20px",
                height: "20px",
                background: "#7366FF",
                borderRadius: "9999px",
              }}
            ></div>
            <div
              className="absolute text-white font-abel text-xs leading-[21px]"
              style={{
                left: "30px",
                top: "0px",
                color: "white",
                fontSize: "12px",
                fontFamily: "Abel",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              Staking
            </div>
          </div>

          {/* CELESTIUMs */}
          <div className="absolute" style={{ left: "336px", top: "1px" }}>
            <div
              className="absolute rounded-full"
              style={{
                width: "20px",
                height: "20px",
                background: "#00B929",
                borderRadius: "9999px",
              }}
            ></div>
            <div
              className="absolute text-white font-abel text-xs leading-[21px]"
              style={{
                left: "30px",
                top: "0px",
                color: "white",
                fontSize: "12px",
                fontFamily: "Abel",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              CELESTIUMs
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          className="absolute text-[#6A6F84] font-teko text-xs"
          style={{
            left: "0px",
            top: "46px",
            color: "#6A6F84",
            fontSize: "12px",
            fontFamily: "Teko",
            fontWeight: 400,
          }}
        >
          Direct commision: 8% from stake + 1% from CELESTIUM
          <br />
          Depth: 10% from weak leg.
        </div>

        {/* Custom SVG Pie Chart - Exact match from Figma */}
        <div className="absolute" style={{ top: "109px", left: "31px", width: "335px", height: "335px" }}>
          <svg width="335" height="335" viewBox="0 0 335 335" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Filter for yellow segment glow */}
              <filter id="filter0_d_1_68177" x="30.6284" y="185.832" width="234.101" height="144.584" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="5" />
                <feGaussianBlur stdDeviation="10" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.784314 0 0 0 0 0 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_68177" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_68177" result="shape" />
              </filter>

              {/* Gradients */}
              <linearGradient id="paint0_linear_1_68177" x1="167.408" y1="25.1543" x2="240.27" y2="261.954" gradientUnits="userSpaceOnUse">
                <stop stopColor="#201C40" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
              <linearGradient id="paint1_linear_1_68177" x1="82.4025" y1="221.62" x2="228.559" y2="257.184" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint2_linear_1_68177" x1="77.6322" y1="102.786" x2="75.03" y2="227.692" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFC800" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
              <linearGradient id="paint3_linear_1_68177" x1="85.4387" y1="109.726" x2="167.408" y2="67.6574" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6A6F84" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Main segments */}
            {segments.map((segment, index) => {
              const isHovered = hoveredSegment === segment.name;
              return (
                <path
                  key={`segment-${index}`}
                  d={segment.path}
                  fill={segment.color}
                  filter={segment.filter}
                  style={{
                    cursor: "pointer",
                    opacity: isHovered ? 0.9 : 1,
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={() => setHoveredSegment(segment.name)}
                  onMouseMove={(e) => handleMouseMove(e, segment)}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}

            {/* Gradient overlays */}
            {gradientOverlays.map((overlay, index) => (
              <path
                key={`gradient-${index}`}
                d={overlay.path}
                fill={overlay.gradient}
                fillOpacity={overlay.opacity}
                style={{ pointerEvents: "none" }}
              />
            ))}

            {/* Separator lines */}
            {separatorLines.map((line, index) => (
              <line
                key={`separator-${index}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#121820"
                strokeWidth="2"
                style={{ pointerEvents: "none" }}
              />
            ))}

            {/* Labels */}
            {/* 75% label - rotated 90 degrees */}
            <text
              x="179.943"
              y="48.5488"
              fill="white"
              fontSize="16"
              fontFamily="Abel"
              fontWeight="400"
              style={{ lineHeight: "21px" }}
              transform="rotate(90 179.943 48.5488)"
            >
              75 %
            </text>

            {/* 11,25% label - rotated -30 degrees */}
            <text
              x="41.9775"
              y="228.104"
              fill="white"
              fontSize="16"
              fontFamily="Abel"
              fontWeight="400"
              style={{ lineHeight: "21px" }}
              transform="rotate(-30 41.9775 228.104)"
            >
              11,25 %
            </text>

            {/* Center text */}
            <text
              x="167.5"
              y="167.5"
              fill="white"
              fontSize="16"
              fontFamily="Abel"
              fontWeight="400"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ lineHeight: "21px" }}
            >
              132 050
            </text>
            <text
              x="167.5"
              y="188.5"
              fill="white"
              fontSize="16"
              fontFamily="Abel"
              fontWeight="400"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ lineHeight: "21px" }}
            >
              CELESTIUM
            </text>
          </svg>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 -translate-x-1/2 rounded bg-black/90 px-3 py-2 font-abel text-sm text-white shadow-lg"
          style={{
            left: tooltip.x,
            top: tooltip.y - 40,
            whiteSpace: "nowrap",
          }}
        >
          {tooltip.text}
        </div>
      )}
      <div
        className="absolute left-0 top-0"
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
      {/* Legends at the top */}
      <div className="absolute top-0 left-0 right-0" style={{ height: "46px" }}>
        {/* Direct */}
        <div className="absolute" style={{ left: "8px", top: "0px" }}>
          <div
            className="absolute rounded-full"
            style={{
              width: "20px",
              height: "20px",
              background: "#DD375F",
              borderRadius: "9999px",
            }}
          ></div>
          <div
            className="absolute text-white font-abel text-xs leading-[21px]"
            style={{
              left: "30px",
              top: "0px",
              color: "white",
              fontSize: "12px",
              fontFamily: "Abel",
              fontWeight: 400,
              lineHeight: "21px",
            }}
          >
            Direct
          </div>
        </div>

        {/* Depth */}
        <div className="absolute" style={{ left: "113px", top: "0px" }}>
          <div
            className="absolute rounded-full"
            style={{
              width: "20px",
              height: "20px",
              background: "#6A6F84",
              borderRadius: "9999px",
              border: "2px solid #50566B",
            }}
          ></div>
          <div
            className="absolute text-white font-abel text-xs leading-[21px]"
            style={{
              left: "30px",
              top: "0px",
              color: "white",
              fontSize: "12px",
              fontFamily: "Abel",
              fontWeight: 400,
              lineHeight: "21px",
            }}
          >
            Depth
          </div>
        </div>

        {/* Staking */}
        <div className="absolute" style={{ left: "218px", top: "0px" }}>
          <div
            className="absolute rounded-full"
            style={{
              width: "20px",
              height: "20px",
              background: "#7366FF",
              borderRadius: "9999px",
            }}
          ></div>
          <div
            className="absolute text-white font-abel text-xs leading-[21px]"
            style={{
              left: "30px",
              top: "0px",
              color: "white",
              fontSize: "12px",
              fontFamily: "Abel",
              fontWeight: 400,
              lineHeight: "21px",
            }}
          >
            Staking
          </div>
        </div>

        {/* CELESTIUMs */}
        <div className="absolute" style={{ left: "336px", top: "1px" }}>
          <div
            className="absolute rounded-full"
            style={{
              width: "20px",
              height: "20px",
              background: "#00B929",
              borderRadius: "9999px",
            }}
          ></div>
          <div
            className="absolute text-white font-abel text-xs leading-[21px]"
            style={{
              left: "30px",
              top: "0px",
              color: "white",
              fontSize: "12px",
              fontFamily: "Abel",
              fontWeight: 400,
              lineHeight: "21px",
            }}
          >
            CELESTIUMs
          </div>
        </div>
      </div>

      {/* Description */}
      <div
        className="absolute text-[#6A6F84] font-teko text-xs"
        style={{
          left: "0px",
          top: "46px",
          color: "#6A6F84",
          fontSize: "12px",
          fontFamily: "Teko",
          fontWeight: 400,
        }}
      >
        Direct commision: 8% from stake + 1% from CELESTIUM
        <br />
        Depth: 10% from weak leg.
      </div>

      {/* Custom SVG Pie Chart - Exact match from Figma */}
      <div className="absolute" style={{ top: "109px", left: "31px", width: "335px", height: "335px" }}>
        <svg width="335" height="335" viewBox="0 0 335 335" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Filter for yellow segment glow */}
            <filter id="filter0_d_1_68177" x="30.6284" y="185.832" width="234.101" height="144.584" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="5" />
              <feGaussianBlur stdDeviation="10" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.784314 0 0 0 0 0 0 0 0 1 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_68177" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_68177" result="shape" />
            </filter>

            {/* Gradients */}
            <linearGradient id="paint0_linear_1_68177" x1="167.408" y1="25.1543" x2="240.27" y2="261.954" gradientUnits="userSpaceOnUse">
              <stop stopColor="#201C40" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
            <linearGradient id="paint1_linear_1_68177" x1="82.4025" y1="221.62" x2="228.559" y2="257.184" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint2_linear_1_68177" x1="77.6322" y1="102.786" x2="75.03" y2="227.692" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFC800" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
            <linearGradient id="paint3_linear_1_68177" x1="85.4387" y1="109.726" x2="167.408" y2="67.6574" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6A6F84" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Main segments */}
          {segments.map((segment, index) => {
            const isHovered = hoveredSegment === segment.name;
            return (
              <path
                key={`segment-${index}`}
                d={segment.path}
                fill={segment.color}
                filter={segment.filter}
                style={{
                  cursor: "pointer",
                  opacity: isHovered ? 0.9 : 1,
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={() => setHoveredSegment(segment.name)}
                onMouseMove={(e) => handleMouseMove(e, segment)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}

          {/* Gradient overlays */}
          {gradientOverlays.map((overlay, index) => (
            <path
              key={`gradient-${index}`}
              d={overlay.path}
              fill={overlay.gradient}
              fillOpacity={overlay.opacity}
              style={{ pointerEvents: "none" }}
            />
          ))}

          {/* Separator lines */}
          {separatorLines.map((line, index) => (
            <line
              key={`separator-${index}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#121820"
              strokeWidth="2"
              style={{ pointerEvents: "none" }}
            />
          ))}

          {/* Labels */}
          {/* 75% label - rotated 90 degrees */}
          <text
            x="179.943"
            y="48.5488"
            fill="white"
            fontSize="16"
            fontFamily="Abel"
            fontWeight="400"
            style={{ lineHeight: "21px" }}
            transform="rotate(90 179.943 48.5488)"
          >
            75 %
          </text>

          {/* 11,25% label - rotated -30 degrees */}
          <text
            x="41.9775"
            y="228.104"
            fill="white"
            fontSize="16"
            fontFamily="Abel"
            fontWeight="400"
            style={{ lineHeight: "21px" }}
            transform="rotate(-30 41.9775 228.104)"
          >
            11,25 %
          </text>

          {/* Center text */}
          <text
            x="167.5"
            y="167.5"
            fill="white"
            fontSize="16"
            fontFamily="Abel"
            fontWeight="400"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ lineHeight: "21px" }}
          >
            132 050
          </text>
          <text
            x="167.5"
            y="188.5"
            fill="white"
            fontSize="16"
            fontFamily="Abel"
            fontWeight="400"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ lineHeight: "21px" }}
          >
            CELESTIUM
          </text>
        </svg>
      </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-50 -translate-x-1/2 rounded bg-black/90 px-3 py-2 font-abel text-sm text-white shadow-lg"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y - 40}px`,
              whiteSpace: "nowrap",
            }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    </div>
  );
}
