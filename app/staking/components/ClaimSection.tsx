"use client";

import { Copy } from "lucide-react";

export function ClaimSection() {
  const claimAmount = "24,000";
  const dailyLimit = "50k CELESTIUM";

  const handleClaim = () => {
    console.log("Claim clicked");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(claimAmount).catch(() => {
      console.error("Failed to copy claim amount");
    });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-[10px] bg-gradient-to-r from-[#201C40] to-[#2A2558] px-5 py-6 sm:px-6">
      <div className="absolute left-1/2 top-[-71px] h-[153px] w-[153px] -translate-x-1/2 rounded-full bg-[#7366FF] opacity-40 blur-[50px]" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-teko text-xl text-white">
              Claim {claimAmount} <span className="text-sm">CELESTIUM</span>
            </h3>
            <button
              onClick={handleCopy}
              className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#201C40]/80 transition hover:bg-[#201C40]"
              aria-label="Copy claim amount"
            >
              <Copy className="h-3.5 w-3.5 text-[#FFC800]" strokeWidth={1.5} />
            </button>
          </div>
          <p className="font-teko text-xs text-[#6A6F84]">
            Your limit for daily claim is: {dailyLimit}
          </p>
        </div>

        <button
          onClick={handleClaim}
          className="h-10 rounded-[5px] bg-[#00B929] px-6 font-teko text-xs text-white transition-colors hover:bg-[#00B929]/90"
        >
          Claim
        </button>
      </div>
    </div>
  );
}
