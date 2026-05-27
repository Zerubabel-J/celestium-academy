export const SERIE_58_NUMBERS = [33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27];

export const ORPHELINS_NUMBERS = [1, 20, 14, 31, 9, 6, 34, 17];

export const SERIE_023_NUMBERS = [22, 18, 29, 7, 28, 25, 2, 21, 4, 19];

export const ZERO_SPIEL_NUMBERS = [12, 35, 3, 26, 0, 32, 15];

export const TRACK_GROUPS: Record<string, number[]> = {
  "serie-5-8": SERIE_58_NUMBERS,
  "serie-58": SERIE_58_NUMBERS,
  orphelins: ORPHELINS_NUMBERS,
  "serie-0-2-3": SERIE_023_NUMBERS,
  "serie-02-3-4": SERIE_023_NUMBERS,
  "zero-spiel": ZERO_SPIEL_NUMBERS,
};

export const ROULETTE_MAP_DATA: Array<{ name: string; value: number }> = [
  { name: "0", value: 0 },
  { name: "32", value: 0 },
  { name: "15", value: 0 },
  { name: "19", value: 0 },
  { name: "4", value: 0 },
  { name: "21", value: 0 },
  { name: "2", value: 0 },
  { name: "25", value: 0 },
  { name: "17", value: 0 },
  { name: "34", value: 0 },
  { name: "6", value: 0 },
  { name: "27", value: 0 },
  { name: "13", value: 0 },
  { name: "36", value: 0 },
  { name: "11", value: 0 },
  { name: "30", value: 0 },
  { name: "8", value: 0 },
  { name: "23", value: 0 },
  { name: "10", value: 0 },
  { name: "5", value: 0 },
  { name: "24", value: 0 },
  { name: "16", value: 0 },
  { name: "33", value: 0 },
  { name: "1", value: 0 },
  { name: "20", value: 0 },
  { name: "14", value: 0 },
  { name: "31", value: 0 },
  { name: "9", value: 0 },
  { name: "22", value: 0 },
  { name: "18", value: 0 },
  { name: "29", value: 0 },
  { name: "7", value: 0 },
  { name: "28", value: 0 },
  { name: "12", value: 0 },
  { name: "35", value: 0 },
  { name: "3", value: 0 },
  { name: "26", value: 0 },
  { name: "serie-5-8", value: 0 },
];

export const ROULETTE_MAP_NAME = "Roulette_Map";

export const ROULETTE_MAP_SVG_PATH = "/ROULETA.svg";

export const GROUP_HIGHLIGHT_COLOR = "rgba(255, 255, 255, 0.08)";

type SizeConfig = {
  maxWidth: number;
  width: number;
  height: number;
};

export const ROULETTE_MAP_RESPONSIVE_SIZES: SizeConfig[] = [
  { maxWidth: 640, width: 280, height: 280 },
  { maxWidth: 1024, width: 420, height: 420 },
];

export const ROULETTE_MAP_DEFAULT_SIZE = { width: 484, height: 81 };
