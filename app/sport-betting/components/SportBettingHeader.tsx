"use client";

import { useState } from "react";
import Image from "next/image";

export function SportBettingHeader() {
  const [activeTab, setActiveTab] = useState<"home" | "staking" | "info">(
    "home"
  );
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative w-full mb-6">
      <div className="w-full border-b border-white/5 pb-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex gap-6 md:gap-8">
            <button
              onClick={() => setActiveTab("home")}
              className="relative group"
            >
              <span
                className={`font-teko text-[14px] leading-[20px] uppercase transition-colors ${
                  activeTab === "home"
                    ? "text-white"
                    : "text-[#6A6F84] hover:text-white"
                }`}
              >
                Home
              </span>
              {activeTab === "home" && (
                <div className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[#FFC800]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("staking")}
              className="relative group"
            >
              <span
                className={`font-teko text-[14px] leading-[20px] uppercase transition-colors ${
                  activeTab === "staking"
                    ? "text-white"
                    : "text-[#6A6F84] hover:text-white"
                }`}
              >
                Staking
              </span>
              {activeTab === "staking" && (
                <div className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[#FFC800]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("info")}
              className="relative group"
            >
              <span
                className={`font-teko text-[14px] leading-[20px] uppercase transition-colors ${
                  activeTab === "info"
                    ? "text-white"
                    : "text-[#6A6F84] hover:text-white"
                }`}
              >
                Info
              </span>
              {activeTab === "info" && (
                <div className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[#FFC800]" />
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none lg:w-[252px]">
              <div className="w-full h-[31px] bg-[#131624] rounded-[5px] flex items-center px-2 gap-2">
                <svg viewBox="0 0 16 16" className="w-4 h-4 flex-shrink-0">
                  <circle
                    cx="7"
                    cy="7"
                    r="5"
                    fill="none"
                    stroke="#6A6F84"
                    strokeWidth="2"
                  />
                  <path d="M11 11L14.5 14.5" stroke="#6A6F84" strokeWidth="2" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent font-teko text-[12px] leading-[17px] text-[#6A6F84] placeholder:text-[#6A6F84] outline-none"
                />
              </div>
            </div>

            <div className="flex-1 lg:flex-none lg:w-[253px] h-[31px] bg-[#131624] border border-[#151A2A] rounded-[5px] flex items-center px-3 gap-2">
              <div className="w-5 h-5 rounded-full bg-[url('/celestium.png')] bg-cover bg-center flex-shrink-0" />
              <span className="font-teko text-[12px] leading-[17px] text-[#FFC800] truncate">
                3,500,100 CELESTIUM
              </span>
            </div>

            <button className="flex-1 lg:flex-none lg:w-[118px] h-[31px] bg-[#131624] border border-[#FFC800] rounded-[5px] flex items-center px-3 gap-2 hover:bg-[#FFC800]/10 transition-colors">
              <div className="w-5 h-5 rounded-full bg-[url('/fox.png')] bg-cover bg-center flex-shrink-0" />
              <span className="font-teko text-[12px] leading-[17px] text-white truncate">
                0x52....331
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
