import { useEffect, useState } from "react";

import {
  ROULETTE_MAP_DEFAULT_SIZE,
  ROULETTE_MAP_RESPONSIVE_SIZES,
} from "../constants/roulette-map";

type Size = typeof ROULETTE_MAP_DEFAULT_SIZE;

export const useRouletteMapSize = () => {
  const [dimensions, setDimensions] = useState<Size>(ROULETTE_MAP_DEFAULT_SIZE);

  useEffect(() => {
    const updateDimensions = () => {
      const viewportWidth = window.innerWidth;
      const matched = ROULETTE_MAP_RESPONSIVE_SIZES.find(
        ({ maxWidth }) => viewportWidth <= maxWidth
      );

      setDimensions(matched ?? ROULETTE_MAP_DEFAULT_SIZE);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return dimensions;
};
