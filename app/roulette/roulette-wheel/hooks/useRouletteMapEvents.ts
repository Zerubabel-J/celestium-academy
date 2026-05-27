import { useMemo } from "react";

import { findGroupNumbers } from "../utils/roulette-map";

interface UseRouletteMapEventsParams {
  disabled: boolean;
  onNumberSelect: (value: number) => void;
  onNumbersSelect?: (values: number[]) => void;
  handleHover: (name: string) => void;
  handleLeave: (name: string) => void;
}

type RouletteMapEventHandlers = {
  click: (params: { name?: string }) => void;
  mouseover: (params: { name?: string }) => void;
  mouseout: (params: { name?: string }) => void;
};

const useRouletteMapEvents = ({
  disabled,
  onNumberSelect,
  onNumbersSelect,
  handleHover,
  handleLeave,
}: UseRouletteMapEventsParams) => {
  return useMemo<RouletteMapEventHandlers>(
    () => ({
      click: (params) => {
        if (disabled) return;
        const name = params.name;
        if (!name) return;

        const group = findGroupNumbers(name);
        if (group && group.length > 0) {
          if (onNumbersSelect) {
            onNumbersSelect(group);
          } else {
            group.forEach((betNumber) => {
              onNumberSelect(betNumber);
            });
          }
          return;
        }

        const value = Number(name);
        if (Number.isNaN(value)) return;
        onNumberSelect(value);
      },
      mouseover: (params) => {
        if (!params?.name) return;
        handleHover(params.name);
      },
      mouseout: (params) => {
        if (!params?.name) return;
        handleLeave(params.name);
      },
    }),
    [disabled, handleHover, handleLeave, onNumberSelect, onNumbersSelect]
  );
};

export default useRouletteMapEvents;
