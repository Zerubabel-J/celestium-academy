"use client";

import Image from "next/image";
import crystal1 from "../../assets/Roulette/crystal1.svg";
import crystal2 from "../../assets/Roulette/crystal2.svg";
import crystal3 from "../../assets/Roulette/crystal3.svg";
import crystal4 from "../../assets/Roulette/crystal4.svg";
import crystal5 from "../../assets/Roulette/crystal5.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const crystals = [
  { id: "onyx", icon: crystal1, name: "Onyx" },
  { id: "ruby", icon: crystal2, name: "Ruby" },
  { id: "sapphire", icon: crystal3, name: "Sapphire" },
  { id: "emerald", icon: crystal4, name: "Emerald" },
  { id: "amethyst", icon: crystal5, name: "Amethyst" },
];

interface CrystalSelectorProps {
  selectedCrystal: string;
  onSelectCrystal: (id: string) => void;
}

export function CrystalSelector({
  selectedCrystal,
  onSelectCrystal,
}: CrystalSelectorProps) {
  return (
    <div className="flex justify-center gap-4">
      {crystals.map((crystal) => (
        <Tooltip key={crystal.id}>
          <TooltipTrigger asChild>
            <button
              onClick={() => onSelectCrystal(crystal.id)}
              className={`relative w-16 h-16 rounded-2xl transition-all duration-200 border-2 cursor-pointer ${
                selectedCrystal === crystal.id
                  ? "bg-[#0F121D] ring-2 ring-[#5B4EFF] shadow-[0_0_20px_rgba(91,78,255,0.3)] border-[#5B4EFF]"
                  : "hover:bg-[#0F121D] border-[#2A2E3E]"
              }`}
            >
              <Image
                src={crystal.icon}
                alt={crystal.name}
                width={32}
                height={32}
                className="absolute inset-0 m-auto"
              />
            </button>
          </TooltipTrigger>
          <TooltipContent className="text-base">
            <p>{crystal.name}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
