import crystal1 from "../assets/Roulette/crystal1.svg";
import crystal2 from "../assets/Roulette/crystal2.svg";
import crystal3 from "../assets/Roulette/crystal3.svg";
import crystal4 from "../assets/Roulette/crystal4.svg";
import crystal5 from "../assets/Roulette/crystal5.svg";

export const CRYSTAL_TO_STONE_ID: Record<string, string> = {
  [String(crystal1)]: "onyx",
  [String(crystal2)]: "ruby",
  [String(crystal3)]: "sapphire",
  [String(crystal4)]: "emerald",
  [String(crystal5)]: "amethyst",
};

export { crystal1, crystal2, crystal3, crystal4, crystal5 };

