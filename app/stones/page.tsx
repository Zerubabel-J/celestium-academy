"use client";

import dynamic from "next/dynamic";

const StonesGamePage = dynamic(() => import("@/components/stones-game"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
      Loading Stones experience…
    </div>
  ),
});

export default function StonesPage() {
  return <StonesGamePage />;
}

