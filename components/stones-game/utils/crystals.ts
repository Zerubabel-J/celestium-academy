import { CRYSTAL_TO_STONE_ID, crystal1, crystal2, crystal3, crystal4, crystal5 } from "../constants/crystals";

export const getStoneIdFromCrystal = (crystalIcon: string | any): string | null => {
  if (crystalIcon === crystal1) return "onyx";
  if (crystalIcon === crystal2) return "ruby";
  if (crystalIcon === crystal3) return "sapphire";
  if (crystalIcon === crystal4) return "emerald";
  if (crystalIcon === crystal5) return "amethyst";

  const key = String(crystalIcon);
  return CRYSTAL_TO_STONE_ID[key] ?? null;
};

