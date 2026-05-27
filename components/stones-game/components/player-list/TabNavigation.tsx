"use client";

export type TabType = "players" | "bonuses" | "celestiums";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onTabChange("players")}
        className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
          activeTab === "players"
            ? "bg-[#0F121D] text-white ring-1 ring-[#2A2E3E]"
            : "bg-[#0F121D] text-[#6B7280] hover:text-white"
        }`}
      >
        Players
      </button>
      <button
        onClick={() => onTabChange("bonuses")}
        className={`flex-1 px-6 py-3 rounded-xl  font-bold transition-all ${
          activeTab === "bonuses"
            ? "bg-[#0F121D] text-white ring-1 ring-[#2A2E3E]"
            : "bg-[#0F121D] text-[#6B7280] hover:text-white"
        }`}
      >
        Bonuses
      </button>
      <button
        onClick={() => onTabChange("celestiums")}
        className={`flex-1 px-6 py-3 h-14 rounded-xl text-sm  font-semibold transition-all ${
          activeTab === "celestiums"
            ? "bg-[#FFC800] text-[#0F121D]"
            : "bg-[#0F121D] text-[#6B7280] hover:text-white"
        }`}
      >
        CELESTIUMs
      </button>
    </div>
  );
}
