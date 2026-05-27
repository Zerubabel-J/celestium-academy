import { FeaturedMatch } from "./components/FeaturedMatch";
import { BettingCards } from "./components/BettingCards";
import { StatisticsCards } from "./components/StatsCards";
import { BetDashboard } from "./components/BetTable";

export default function SportBettingPage() {
  return (
    <div className="min-h-screen w-full bg-[#0F121D] p-4 md:p-6 lg:p-8">
      <div
        className="absolute inset-0 h-[263px] left-0 top-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #0F121D 27%, rgba(15, 18, 29, 0.69) 55.92%, rgba(15, 18, 29, 0) 82.51%)",
        }}
      />

      <div className="relative max-w-[1600px] mx-auto space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6 xl:items-start">
          <div className="w-full space-y-6">
            <FeaturedMatch />
            <StatisticsCards />
          </div>

          <div className="w-full xl:w-[280px] mx-auto xl:mx-0 xl:h-full">
            <BettingCards />
          </div>
        </div>

        <BetDashboard />
      </div>
    </div>
  );
}
