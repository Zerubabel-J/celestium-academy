export const ROULETTE_NUMBERS = [
  { num: 0, color: "green" },
  { num: 32, color: "red" },
  { num: 15, color: "black" },
  { num: 19, color: "red" },
  { num: 4, color: "black" },
  { num: 21, color: "red" },
  { num: 2, color: "black" },
  { num: 25, color: "red" },
  { num: 17, color: "black" },
  { num: 34, color: "red" },
  { num: 6, color: "black" },
  { num: 27, color: "red" },
  { num: 13, color: "black" },
  { num: 36, color: "red" },
  { num: 11, color: "black" },
  { num: 30, color: "red" },
  { num: 8, color: "black" },
  { num: 23, color: "red" },
  { num: 10, color: "black" },
  { num: 5, color: "red" },
  { num: 24, color: "black" },
  { num: 16, color: "red" },
  { num: 33, color: "black" },
  { num: 1, color: "red" },
  { num: 20, color: "black" },
  { num: 14, color: "red" },
  { num: 31, color: "black" },
  { num: 9, color: "red" },
  { num: 22, color: "black" },
  { num: 18, color: "red" },
  { num: 29, color: "black" },
  { num: 7, color: "red" },
  { num: 28, color: "black" },
  { num: 12, color: "red" },
  { num: 35, color: "black" },
  { num: 3, color: "red" },
  { num: 26, color: "black" },
] as const;

const WHEEL_PADDING_X = 100;
const WHEEL_PADDING_TOP = -20;
const WHEEL_PADDING_BOTTOM = 300;

export const OUTER_RADIUS = 340;
export const INNER_RADIUS = 240;
export const WHEEL_CENTER_X = OUTER_RADIUS + WHEEL_PADDING_X;
export const WHEEL_CENTER_Y = OUTER_RADIUS + WHEEL_PADDING_TOP;
export const WHEEL_VIEWBOX_WIDTH = OUTER_RADIUS * 2 + WHEEL_PADDING_X * 2;
export const WHEEL_VIEWBOX_HEIGHT =
  OUTER_RADIUS * 2 + WHEEL_PADDING_TOP + WHEEL_PADDING_BOTTOM;
export const FINAL_BALL_ANGLE = 90;
const BALL_TRACK_RATIO = 0.68;
export const BALL_BASE_RADIUS =
  INNER_RADIUS + (OUTER_RADIUS - INNER_RADIUS) * BALL_TRACK_RATIO;
export const BALL_BOUNCE_AMPLITUDE = (OUTER_RADIUS - INNER_RADIUS) * 0.28;
export const FINAL_BALL_RADIUS = BALL_BASE_RADIUS;
export const FULL_ROTATIONS = 8;
export const SPIN_DURATION = 8000;
export const BALL_ROTATIONS = 12;
export const TIMER_START = 33;
const WHEEL_TOP_CROP_RATIO = 0.56;
const WHEEL_VISIBLE_BOTTOM_EXTRA = 150;
export const WHEEL_VISIBLE_HEIGHT = OUTER_RADIUS + WHEEL_VISIBLE_BOTTOM_EXTRA;
export const WHEEL_CANVAS_OFFSET_Y = -OUTER_RADIUS * WHEEL_TOP_CROP_RATIO;
export const WHEEL_STACK_GAP = 12;
