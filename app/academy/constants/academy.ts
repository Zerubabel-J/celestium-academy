import type { CSSProperties } from "react";

export const ACADEMY_PAGE_CLASS =
  "min-h-screen bg-[var(--academy-background)] text-white py-12 px-4 md:px-8";
export const ACADEMY_WRAPPER_CLASS = "max-w-7xl mx-auto";
export const ACADEMY_HEADER_CLASS = "text-center mb-16";
export const ACADEMY_TITLE_CLASS =
  "text-3xl md:text-4xl font-light tracking-wider mb-6";
export const ACADEMY_SCORE_CLASS = "text-xl md:text-2xl mr-2";

export const ACADEMY_PROGRESS = {
  score: "67%",
  total: "100",
  label: "= Advanced Celestium user",
};

export const ACADEMY_ARCHER_STROKE_COLOR = "var(--academy-connector)";
export const ACADEMY_ARCHER_STROKE_WIDTH = 1.2;
export const ACADEMY_ARCHER_LINE_STYLE = "angle" as const;
export const ACADEMY_ARCHER_OFFSET = 4;
export const ACADEMY_ARCHER_END_SHAPE = {
  arrow: {
    arrowLength: 6,
    arrowThickness: 4,
  },
};

export const ACADEMY_ARCHER_STYLE: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
};

export const ACADEMY_SVG_CONTAINER_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 20,
  pointerEvents: "none",
  strokeLinejoin: "round",
  strokeLinecap: "round",
};
