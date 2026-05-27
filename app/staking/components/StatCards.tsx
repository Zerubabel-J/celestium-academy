"use client";

import { HelpCircle } from "lucide-react";
import { GroupIcon } from "./icons/GroupIcon";
import { NetworkIcon } from "./icons/NetworkIcon";
import { DividendIcon } from "./icons/DividendIcon";
import { BusinessNetworkIcon } from "./icons/BusinessNetworkIcon";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="w-full h-[151px] bg-[#131624] border border-[#151A2A] rounded-[10px] relative">
      {/* Help icon */}
      <div className="absolute right-[10px] top-[10px] w-[18px] h-[18px]">
        <HelpCircle className="w-full h-full text-[#6A6F84]" strokeWidth={1.5} />
      </div>

      {/* Icon */}
      <div className="absolute top-[25px] left-1/2 -translate-x-1/2">
          {icon}
      </div>

      {/* Value */}
      <div className="absolute top-[85px] left-1/2 -translate-x-1/2 w-full px-4">
        <div className="font-abel text-sm text-center text-white leading-tight">{value}</div>
      </div>

      {/* Title */}
      <div className="absolute bottom-[15px] left-1/2 -translate-x-1/2 w-full px-4">
        <div className="font-teko text-xs text-center text-[#6A6F84]">{title}</div>
      </div>
    </div>
  );
}


export function StatCards() {
  const stats = [
    {
      title: "Your referrer",
      value: "0x71C...8976F",
      icon: <GroupIcon />,
    },
    {
      title: "Network size",
      value: "5 direct, 134 total",
      icon: <NetworkIcon />,
    },
    {
      title: "Total network volume",
      value: "132 050,00 CELESTIUM",
      icon: <DividendIcon />,
    },
    {
      title: "Total income from the network",
      value: "132 050,00 CELESTIUM",
      icon: <BusinessNetworkIcon />,
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </>
  );
}
