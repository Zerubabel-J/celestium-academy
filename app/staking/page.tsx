"use client";

import { useState } from "react";
import { StatCards } from "./components/StatCards";
import { TotalEarningsSection } from "./components/TotalEarningsSection";
import { ClaimSection } from "./components/ClaimSection";
import { CycleProgress } from "./components/CycleProgress";
import { UnmatchedVolumeCards } from "./components/UnmatchedVolumeCards";
import { EarningsPieChart } from "./components/EarningsPieChart";
import { GenerateInvitationWallet } from "./components/GenerateInvitationWallet";
import { PayoutTables } from "./components/PayoutTables";
import { NetworkersTable } from "./components/NetworkersTable";
import { SearchBar } from "./components/SearchBar";

export default function StakingPage() {
  const [payoutTab, setPayoutTab] = useState<"affiliate" | "matching">("affiliate");
  const [structureTab, setStructureTab] = useState<"binary" | "linear">("binary");

  return (
    <div className="min-h-screen w-full bg-[#0F121D] p-4 md:p-6 lg:p-8 relative overflow-hidden">
      <div className="relative max-w-[1600px] mx-auto space-y-6">
        {/* Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <StatCards />
        </div>

        {/* Two Column Layout: Left (Total Earnings, Claim, Generate Wallet) | Right (Pie Chart) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left Column: Total Earnings, Claim, Generate Wallet */}
          <div className="space-y-6">
            <TotalEarningsSection />
            <ClaimSection />
            <GenerateInvitationWallet />
          </div>

          {/* Right Column: Pie Chart */}
          <div className="flex justify-center xl:justify-start">
            <EarningsPieChart />
          </div>
        </div>

        {/* Cycle Progress */}
        <CycleProgress />

        {/* Unmatched Volume Cards */}
        <UnmatchedVolumeCards />


        {/* Networkers Table */}
        <NetworkersTable structureType={structureTab} />

        {/* Tab Section for Affiliate/Matching */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setPayoutTab("affiliate")}
            className={`px-5 py-2 font-abel text-xs font-bold rounded-[5px] shadow-[0px_4px_30px_rgba(0,51,0,0.1)] transition-colors ${
              payoutTab === "affiliate"
                ? "bg-[#201C40] text-white"
                : "bg-[#FFC800] text-[#0F121D]"
            }`}
          >
            Affiliate
          </button>
          <button
            onClick={() => setPayoutTab("matching")}
            className={`px-5 py-2 font-abel text-xs font-bold rounded-[5px] shadow-[0px_4px_30px_rgba(0,51,0,0.1)] transition-colors ${
              payoutTab === "matching"
                ? "bg-[#FFC800] text-[#0F121D]"
                : "bg-transparent text-[#6A6F84]"
            }`}
          >
            Matching
          </button>
        </div>

        {/* Payout Tables */}
        <PayoutTables activeTab={payoutTab} />

        {/* Binary/Linear Structure Tabs */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setStructureTab("binary")}
            className={`px-5 py-2 font-abel text-xs font-bold rounded-[5px] shadow-[0px_4px_30px_rgba(0,51,0,0.1)] transition-colors ${
              structureTab === "binary"
                ? "bg-[#201C40] text-white"
                : "bg-transparent text-[#6A6F84]"
            }`}
          >
            Binnary structure
          </button>
          <button
            onClick={() => setStructureTab("linear")}
            className={`px-5 py-2 font-abel text-xs font-bold rounded-[5px] shadow-[0px_4px_30px_rgba(0,51,0,0.1)] transition-colors ${
              structureTab === "linear"
                ? "bg-[#FFC800] text-[#0F121D]"
                : "bg-transparent text-[#6A6F84]"
            }`}
          >
            Linear structure
          </button>
        </div>

        {/* Networkers Table */}
        <NetworkersTable structureType={structureTab} />
      </div>
    </div>
  );
}
