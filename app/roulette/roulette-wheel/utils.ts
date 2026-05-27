import { WHEEL_CENTER_X, WHEEL_CENTER_Y } from "./constants/constants";
import type { BallPosition } from "./types/types";

export const getSegmentColor = (color: string) => {
  if (color === "green") return "var(--roulette-zero)";
  if (color === "red") return "var(--roulette-number-red)";
  return "var(--roulette-wheel-black)";
};

export const createWedgePath = (
  startAngle: number,
  endAngle: number,
  outerR: number,
  innerR: number
) => {
  const centerX = WHEEL_CENTER_X;
  const centerY = WHEEL_CENTER_Y;

  const startAngleRad = (startAngle * Math.PI) / 180;
  const endAngleRad = (endAngle * Math.PI) / 180;

  const x1 = centerX + outerR * Math.cos(startAngleRad);
  const y1 = centerY + outerR * Math.sin(startAngleRad);
  const x2 = centerX + outerR * Math.cos(endAngleRad);
  const y2 = centerY + outerR * Math.sin(endAngleRad);
  const x3 = centerX + innerR * Math.cos(endAngleRad);
  const y3 = centerY + innerR * Math.sin(endAngleRad);
  const x4 = centerX + innerR * Math.cos(startAngleRad);
  const y4 = centerY + innerR * Math.sin(startAngleRad);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return `
      M ${x1} ${y1}
      A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${x4} ${y4}
      Z
    `;
};

export const getBallCoordinates = (ballPosition: BallPosition) => {
  const centerX = WHEEL_CENTER_X;
  const centerY = WHEEL_CENTER_Y - 30;

  const ballX =
    centerX +
    ballPosition.radius * Math.cos((ballPosition.angle * Math.PI) / 180);
  const ballY =
    centerY +
    ballPosition.radius * Math.sin((ballPosition.angle * Math.PI) / 180);

  return { ballX, ballY };
};
