export function StakingIcon() {
  return (
    <div className="w-[50px] h-[50px] relative">
      <svg viewBox="0 0 50 50" className="w-full h-full">
        <defs>
          <linearGradient
            id="stakingGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2762EB" />
            <stop offset="100%" stopColor="#9134EA" />
          </linearGradient>
        </defs>
        <rect x="14" y="28" width="22" height="14" fill="#FFC800" />
        <circle
          cx="25"
          cy="15"
          r="10"
          stroke="#FFC800"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="25" cy="15" r="5" fill="url(#stakingGradient)" />
      </svg>
    </div>
  );
}

