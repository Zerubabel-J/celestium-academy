"use client";

import { Button } from "@/components/ui/button";
import type { FC } from "react";

interface BackToGameButtonProps {
  onBackToGame: () => void;
}

export const BackToGameButton: FC<BackToGameButtonProps> = ({
  onBackToGame,
}) => {
  return (
    <Button
      onClick={onBackToGame}
      className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
    >
      Back to Game
    </Button>
  );
};
