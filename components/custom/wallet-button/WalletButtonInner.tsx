"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useWalletConnection } from "./hooks/useWalletConnection";
import {
  WalletButtonDisplay,
  BASE_BUTTON_CLASS,
  DISPLAY_CLASS,
  SIGNING_LABEL,
} from "./constants/constants";

type WalletButtonInnerProps = {
  isAuthenticated?: boolean;
  display?: WalletButtonDisplay;
  showBalance?: boolean;
  className?: string;
  enableAutoAuth?: boolean;
};

export function WalletButtonInner({
  isAuthenticated = false,
  display = "desktop",
  showBalance = true,
  className,
  enableAutoAuth = true,
}: WalletButtonInnerProps) {
  const { pending, label, iconSrc, walletName, handleClick } =
    useWalletConnection({
      isAuthenticated,
      enableAutoAuth,
      showBalance,
    });

  const buttonClassName = cn(
    BASE_BUTTON_CLASS,
    DISPLAY_CLASS[display],
    className
  );

  const textContainerClass = showBalance
    ? "flex flex-col items-start"
    : "flex items-center";

  return (
    <Button
      onClick={handleClick}
      disabled={pending}
      className={buttonClassName}
    >
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={walletName}
          width={24}
          height={24}
          className="w-6 h-6 rounded-full"
        />
      )}
      <div className={textContainerClass}>
        <span className="text-sm font-medium">
          {pending ? SIGNING_LABEL : label}
        </span>
      </div>
    </Button>
  );
}
