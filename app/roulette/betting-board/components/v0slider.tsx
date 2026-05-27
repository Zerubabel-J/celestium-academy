"use client";

import type React from "react";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const milestones = [
  { value: 1000, label: "1k" },
  { value: 10000, label: "10k" },
  { value: 50000, label: "50k" },
  { value: 200000, label: "200k" },
  { value: 500000, label: "500k" },
];

const MIN_VALUE = 0;
const MAX_VALUE = 100;

export function CelestiumSlider() {
  const [value, setValue] = useState(10000);

  const getMilestoneIndex = (val: number) => {
    return milestones.findIndex((m) => m.value === val);
  };

  const currentIndex = getMilestoneIndex(value);
  const percentage =
    currentIndex >= 0 ? (currentIndex / (milestones.length - 1)) * 100 : 0;

  const getValueFromPercentage = (pct: number) => {
    const index = Math.round((pct / 100) * (milestones.length - 1));
    return milestones[Math.max(0, Math.min(index, milestones.length - 1))]
      .value;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderValue = Number(e.target.value);
    const mappedValue = getValueFromPercentage(sliderValue);
    setValue(mappedValue);
  };

  const handleDecrement = () => {
    const currentIndex = milestones.findIndex((m) => m.value === value);
    if (currentIndex > 0) {
      setValue(milestones[currentIndex - 1].value);
    }
  };

  const handleIncrement = () => {
    const currentIndex = milestones.findIndex((m) => m.value === value);
    if (currentIndex < milestones.length - 1) {
      setValue(milestones[currentIndex + 1].value);
    }
  };

  const formatValue = (val: number) => {
    if (val >= 1000) {
      return `${Math.floor(val / 1000)}K`;
    }
    return val.toString();
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="flex items-center">
        {/* Left Button - Minus */}
        <button
          onClick={handleDecrement}
          className="flex items-center justify-center w-12 h-12 bg-[#1a1a1a] rounded-xl hover:bg-[#252525] transition-colors flex-shrink-0"
          aria-label="Decrease amount"
        >
          <Minus className="w-5 h-5 text-white" />
        </button>

        {/* Slider Track - vertically centered */}
        <div className="flex-1 relative">
          <div className="absolute -top-8 left-0 right-0 flex justify-between">
            {milestones.map((milestone, index) => {
              const position = (index / (milestones.length - 1)) * 100;
              return (
                <span
                  key={milestone.value}
                  className="text-white text-sm absolute -translate-x-1/2"
                  style={{ left: `${position}%` }}
                >
                  {milestone.label}
                </span>
              );
            })}
          </div>

          <div className="relative h-1">
            {/* Base Track */}
            <div className="absolute w-full h-1 bg-gray-700 rounded-full" />

            {/* Active Track */}
            <div
              className="absolute h-1 bg-gray-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />

            {milestones.map((milestone, index) => {
              const position = (index / (milestones.length - 1)) * 100;
              return (
                <div
                  key={milestone.value}
                  className="absolute top-0 w-[2px] h-2 bg-gray-400 -translate-y-1/2 -translate-x-1/2"
                  style={{ left: `${position}%` }}
                />
              );
            })}

            {/* Custom Slider Input */}
            <input
              type="range"
              min={MIN_VALUE}
              max={MAX_VALUE}
              step={25}
              value={percentage}
              onChange={handleSliderChange}
              className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(250,204,21,0.5)] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-yellow-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-[0_0_12px_rgba(250,204,21,0.5)]"
              aria-label="CELESTIUM amount"
            />
          </div>
        </div>

        {/* Right Button - Plus with Value */}
        <button
          onClick={handleIncrement}
          className="flex items-center justify-between gap-3 px-5 py-3 bg-[#1a1a1a] rounded-xl hover:bg-[#252525] transition-colors min-w-[160px] flex-shrink-0"
          aria-label="Increase amount"
        >
          <span className="text-white font-semibold text-lg">
            {formatValue(value)} CELESTIUM
          </span>
          <Plus className="w-6 h-6 text-yellow-400" />
        </button>
      </div>
    </div>
  );
}
