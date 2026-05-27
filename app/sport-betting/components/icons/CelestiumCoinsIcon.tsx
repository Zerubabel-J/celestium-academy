export function CelestiumCoinsIcon() {
  return (
    <div className="w-[55px] h-[50px] relative">
      <svg viewBox="0 0 55 50" className="w-full h-full">
        <defs>
          <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC800" />
            <stop offset="100%" stopColor="#2762EB" />
          </linearGradient>
        </defs>
        <circle cx="15" cy="15" r="12" fill="#FFC800" />
        <circle cx="30" cy="20" r="12" fill="url(#coinGradient)" />
        <circle cx="40" cy="30" r="12" fill="#FFC800" />
      </svg>
    </div>
  );
}

