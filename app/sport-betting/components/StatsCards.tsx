"use client";

import { HelpCircle } from "lucide-react";
import Image from "next/image";
import { useSportBetting } from "../hooks/useSportBetting";
import totalCelestiumsIcon from "../assets/total_celestiums.svg";
import paidToStakingIcon from "../assets/paid_to_staking.svg";
import totalUsersIcon from "../assets/total_users.svg";

interface StatCardProps {
  icon: string;
  iconAlt: string;
  primaryValue: string;
  secondaryValue: string;
  label: string;
}

function StatCard({
  icon,
  iconAlt,
  primaryValue,
  secondaryValue,
  label,
}: StatCardProps) {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-2xl bg-[#131624] p-2 md:p-4 text-center">
      <div className="absolute right-2 top-2 md:right-4 md:top-4">
        <HelpCircle className="h-3 w-3 md:h-5 md:w-5 text-gray-500" />
      </div>

      <div className="mb-2 md:mb-3">
        <Image
          src={icon || "/placeholder.svg"}
          alt={iconAlt}
          width={60}
          height={60}
          className="h-8 w-auto md:h-14"
        />
      </div>

      <div className="mb-1 text-sm md:text-2xl text-white">{primaryValue}</div>

      <div className="mb-2 md:mb-3 text-xs md:text-sm text-gray-400">
        {secondaryValue}
      </div>

      <div className="text-[10px] md:text-xs text-gray-500">{label}</div>
    </div>
  );
}

export function StatisticsCards() {
  const { platformStats } = useSportBetting();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  if (!platformStats) {
    return (
      <div className="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative flex flex-col items-center justify-center rounded-2xl bg-[#131624] p-2 md:p-4 text-center animate-pulse"
          >
            <div className="h-8 w-8 md:h-14 md:w-14 bg-gray-700 rounded mb-2 md:mb-3" />
            <div className="h-4 w-20 md:h-6 md:w-28 bg-gray-700 rounded mb-1" />
            <div className="h-3 w-16 md:h-4 md:w-20 bg-gray-700 rounded mb-2 md:mb-3" />
            <div className="h-2 w-12 md:h-3 md:w-16 bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-3">
      <StatCard
        icon={totalCelestiumsIcon}
        iconAlt="Monthly Betting volume"
        primaryValue={`${formatNumber(platformStats.total_volume)} CELESTIUM`}
        secondaryValue={`(${formatNumber(
          Math.floor(platformStats.total_volume * 0.75)
        )} USD)`}
        label="Monthly Betting volume"
      />

      <StatCard
        icon={paidToStakingIcon}
        iconAlt="Earned by Staking"
        primaryValue={`${formatNumber(
          platformStats.total_earned_staking
        )} CELESTIUM`}
        secondaryValue={`(${formatNumber(
          Math.floor(platformStats.total_earned_staking * 0.75)
        )} USD)`}
        label="Earned by Staking"
      />

      <StatCard
        icon={totalUsersIcon}
        iconAlt="Users"
        primaryValue={formatNumber(platformStats.total_users)}
        secondaryValue={`(${formatNumber(platformStats.online_users)} online)`}
        label="Users"
      />
    </div>
  );
}
