"use client";

import { useState } from "react";

export function GenerateInvitationWallet() {
  const [positionMode, setPositionMode] = useState<"auto" | "choose">("auto");
  const [walletAddress, setWalletAddress] = useState("0x39c9a0b2c1a93899162dccaa551c3e8c6d88f000");

  const handleGenerate = () => {
    // Placeholder functionality
    console.log("Generate wallet");
  };

  const handleCreateLink = () => {
    // Placeholder functionality
    console.log("Create link");
  };

  const handleUploadCSV = () => {
    // Placeholder functionality
    console.log("Upload CSV");
  };

  return (
    <div className="bg-[#131624] border border-[#151A2A] rounded-[10px] p-6 space-y-4">
      <div className="border-2 border-[#FFC800] rounded-[10px] p-4 space-y-4">
        <div className="font-teko text-sm text-white">Generate invitation specific wallet:</div>

        {/* Position Mode Tabs */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setPositionMode("auto")}
            className={`px-[22px] py-[11px] rounded-[5px] font-teko text-xs transition-colors ${
              positionMode === "auto"
                ? "bg-[#FFC800] text-[#0F121D]"
                : "bg-[#131624] text-[#6A6F84]"
            }`}
          >
            Auto position
          </button>
          <button
            onClick={() => setPositionMode("choose")}
            className={`px-[22px] py-[11px] rounded-[5px] font-teko text-xs transition-colors ${
              positionMode === "choose"
                ? "bg-[#FFC800] text-[#0F121D]"
                : "bg-[#131624] text-[#6A6F84]"
            }`}
          >
            Choose position
          </button>
        </div>

        {/* Wallet Input and Buttons */}
        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
          <input
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="flex-1 h-10 bg-transparent border border-[#6A6F84] rounded-[5px] text-white font-teko text-xs px-3"
            readOnly
          />
          <button
            onClick={handleGenerate}
            className="h-10 w-full rounded-[5px] bg-[#FFC800] px-6 font-teko text-xs text-[#0F121D] transition-colors hover:bg-[#FFC800]/90 md:w-auto"
          >
            Generate
          </button>
          <button
            onClick={handleCreateLink}
            className="h-10 w-full rounded-[5px] border border-[#6A6F84] px-4 font-teko text-xs text-white transition-colors hover:bg-[#131624] md:w-auto"
          >
            <span className="text-[#FFC800]">+</span> Create link
          </button>
        </div>

        {/* Upload CSV Button */}
        <button
          onClick={handleUploadCSV}
          className="h-10 w-full rounded-[5px] border border-[#6A6F84] px-4 font-teko text-xs text-white transition-colors hover:bg-[#131624] md:w-auto"
        >
          <span className="text-[#FFC800]">+</span> Upload invitation CSV
        </button>
      </div>
    </div>
  );
}
