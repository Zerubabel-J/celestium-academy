"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { initAppKitOnce } from "@/lib/appkit-client";
import { WalletButtonInner } from "./WalletButtonInner";
import { cn } from "@/lib/utils";
import { BALANCE_PLACEHOLDER, BASE_BUTTON_CLASS, CONNECT_WALLET_LABEL, DISPLAY_CLASS, WalletButtonDisplay } from "./constants/constants";

type WalletButtonProps = {
  isAuthenticated?: boolean;
  display?: WalletButtonDisplay;
  showBalance?: boolean;
  className?: string;
  enableAutoAuth?: boolean;
};

export function WalletButton({
  isAuthenticated,
  display = "desktop",
  showBalance = true,
  className,
  enableAutoAuth,
}: WalletButtonProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initAppKitOnce();
    if (typeof window === "undefined") return;

    if (window.appKit) {
      setReady(true);
      return;
    }

    const timer = window.setInterval(() => {
      if (window.appKit) {
        setReady(true);
        window.clearInterval(timer);
      }
    }, 50);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const buttonClassName = cn(
    BASE_BUTTON_CLASS,
    DISPLAY_CLASS[display],
    className
  );

  if (!ready) {
    return (
      <Button
        className={cn(buttonClassName, "opacity-70")}
        aria-label="Connect Wallet"
        disabled
      >
        <div
          className={
            showBalance ? "flex flex-col items-start" : "flex items-center"
          }
        >
          <span className="text-sm font-medium">{CONNECT_WALLET_LABEL}</span>
          {showBalance && (
            <span className="text-xs text-(--celestium-muted)">
              {BALANCE_PLACEHOLDER}
            </span>
          )}
        </div>
      </Button>
    );
  }

  return (
    <WalletButtonInner
      isAuthenticated={isAuthenticated}
      display={display}
      showBalance={showBalance}
      className={className}
      enableAutoAuth={
        typeof enableAutoAuth === "boolean"
          ? enableAutoAuth
          : display === "desktop"
      }
    />
  );
}