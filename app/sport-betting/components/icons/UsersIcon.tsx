export function UsersIcon() {
  return (
    <div className="w-[55px] h-[50px] relative">
      <svg viewBox="0 0 55 50" className="w-full h-full">
        <defs>
          <linearGradient
            id="usersGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2762EB" />
            <stop offset="100%" stopColor="#9134EA" />
          </linearGradient>
        </defs>
        <circle cx="15" cy="15" r="6" fill="#FFC800" />
        <path d="M5 35c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="#FFC800" />

        <circle cx="35" cy="15" r="6" fill="#FFC800" />
        <path d="M25 35c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="#FFC800" />

        <circle cx="25" cy="20" r="6" fill="url(#usersGradient)" />
        <path d="M15 40c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="#FFC800" />

        <circle
          cx="45"
          cy="35"
          r="3"
          fill="#0F121D"
          stroke="#0F121D"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

