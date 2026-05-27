import type { SVGProps } from "react";

export interface DocsIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function DocsIcon({
  size = 24,
  color,
  ...props
}: DocsIconProps) {
  const fillColor = color ?? "currentColor";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 0H9.75C8.92163 0 8.25 0.671625 8.25 1.5H16.5V7.5H22.5V19.5H17.25V21H22.5C23.3284 21 24 20.3284 24 19.5V6.00037L18 0ZM18 6V2.121L21.8783 6H18ZM1.5 3C0.671625 3 0 3.67162 0 4.5V22.5C0 23.3284 0.671625 24 1.5 24H14.25C15.0784 24 15.75 23.3284 15.75 22.5V9.00037L9.75 3H1.5ZM14.25 22.5H1.5V4.5H8.25V10.5H14.25V22.5ZM9.75 9V5.121L13.6283 9H9.75Z"
        fill={fillColor}
      />
    </svg>
  );
}
