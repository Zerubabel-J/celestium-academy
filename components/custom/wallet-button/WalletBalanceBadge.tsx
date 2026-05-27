"use client";

import Image from "next/image";
import { useAccount, useBalance } from "wagmi";
import { cn } from "@/lib/utils";
import { BALANCE_PLACEHOLDER } from "./constants/constants";

type WalletBalanceBadgeProps = {
  className?: string;
  iconSrc?: string;
  iconAlt?: string;
  isAuthenticated?: boolean;
};

export function WalletBalanceBadge({
  className,
  iconSrc = "/Celestiums.png",
  iconAlt = "Celestium Coin",
  isAuthenticated = false,
}: WalletBalanceBadgeProps) {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
    query: {
      enabled: Boolean(address) && isAuthenticated,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  });

  let balanceLabel = BALANCE_PLACEHOLDER;

  if (isAuthenticated && isConnected && balance?.formatted && balance?.symbol) {
    const numericValue = Number.parseFloat(balance.formatted);
    if (!Number.isNaN(numericValue)) {
      balanceLabel = `${numericValue.toFixed(4)} ${balance.symbol}`;
    }
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg bg-(--celestium-surface) px-3 py-2",
        className
      )}
    >
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={24}
        height={24}
        className="w-6 h-6"
      />
      <span className="whitespace-nowrap text-sm font-semibold text-(--celestium-accent)">
        {balanceLabel}
      </span>
    </div>
  );
}
