export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

export const describeSector = (
  center: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(center, center, radius, endAngle);
  const end = polarToCartesian(center, center, radius, startAngle);
  return `M ${center} ${center} L ${start.x} ${start.y} A ${radius} ${radius} 0 0 0 ${end.x} ${end.y} Z`;
};

export const describeRingSegment = (
  center: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number
) => {
  const outerStart = polarToCartesian(center, center, outerRadius, endAngle);
  const outerEnd = polarToCartesian(center, center, outerRadius, startAngle);
  const innerStart = polarToCartesian(center, center, innerRadius, startAngle);
  const innerEnd = polarToCartesian(center, center, innerRadius, endAngle);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 0 0 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${innerRadius} ${innerRadius} 0 0 1 ${innerEnd.x} ${innerEnd.y}`,
    "Z",
  ].join(" ");
};

