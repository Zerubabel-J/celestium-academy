import { cn } from "@/lib/utils";

export default function LevelBadge({
  number,
  title,
  subtitle,
  className = "",
  showNumber = true,
  showText = true,
}: {
  number: number;
  title?: string;
  subtitle?: string;
  className?: string;
  showNumber?: boolean;
  showText?: boolean;
}) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative flex h-[51px] w-[51px] items-center justify-center">
        <svg
          width="51"
          height="51"
          viewBox="0 0 51 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute h-full w-full"
        >
          <circle
            cx="25.5"
            cy="25.5"
            r="23"
            fill="url(#paint0_radial_0_1)"
            fillOpacity="0.3"
          />
          <circle cx="25.5" cy="25.5" r="17" fill="var(--academy-accent)" />
          <circle
            cx="25.5"
            cy="25.5"
            r="25"
            stroke="var(--academy-accent)"
            strokeWidth="1"
          />
          <defs>
            <radialGradient
              id="paint0_radial_0_1"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(25.5 25.5) rotate(90) scale(23)"
            >
              <stop
                offset="0.195"
                stopColor="var(--academy-accent)"
                stopOpacity="0"
              />
              <stop offset="1" stopColor="var(--academy-accent)" />
            </radialGradient>
          </defs>
        </svg>
        {showNumber && (
          <span className="relative z-10 text-lg font-bold text-(--academy-contrast)">
            {number}
          </span>
        )}
      </div>
      {showText && (
        <div className="mt-2 text-center">
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="text-xs text-(--academy-muted)">{subtitle}</div>
        </div>
      )}
    </div>
  );
}
