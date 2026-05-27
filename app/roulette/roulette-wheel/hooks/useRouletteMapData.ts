import { useEffect, useMemo, useState } from "react";
import * as echarts from "echarts/core";

import {
  GROUP_HIGHLIGHT_COLOR,
  ROULETTE_MAP_DATA,
  ROULETTE_MAP_NAME,
  ROULETTE_MAP_SVG_PATH,
} from "../constants/roulette-map";
import { findGroupNumbers } from "../utils/roulette-map";
import type { Bet } from "../../betting-board/types/types";
import { formatAmount } from "../../betting-board/utils";
import type { ComposeOption } from "echarts/core";
import type { MapSeriesOption } from "echarts/charts";
import type { TooltipComponentOption } from "echarts/components";

type MapOption = ComposeOption<MapSeriesOption | TooltipComponentOption>;

interface UseRouletteMapDataParams {
  bets: Bet[];
}

export const useRouletteMapData = ({ bets }: UseRouletteMapDataParams) => {
  const [isMapRegistered, setIsMapRegistered] = useState(false);

  const registerMap = async () => {
    if (isMapRegistered) return;

    const existing = echarts.getMap(ROULETTE_MAP_NAME);
    if (!existing) {
      const svg = await fetch(ROULETTE_MAP_SVG_PATH).then((response) =>
        response.text()
      );
      echarts.registerMap(ROULETTE_MAP_NAME, { svg });
    }

    setIsMapRegistered(true);
  };

  useEffect(() => {
    registerMap().catch(() => {
      setIsMapRegistered(false);
    });
  }, []);

  const amountByNumber = useMemo(() => {
    const totals = new Map<number, number>();

    bets.forEach((bet) => {
      if (bet.type !== "number" || typeof bet.value !== "number") return;
      const currentAmount = totals.get(bet.value) ?? 0;
      totals.set(bet.value, currentAmount + bet.amount);
    });

    return totals;
  }, [bets]);

  const amountByName = useMemo(() => {
    const totals = new Map<string, number>();

    amountByNumber.forEach((amount, number) => {
      totals.set(String(number), amount);
    });

    ROULETTE_MAP_DATA.forEach((item) => {
      const groupNumbers = findGroupNumbers(item.name);
      if (!groupNumbers || groupNumbers.length === 0) return;

      const total = groupNumbers.reduce((sum, num) => {
        return sum + (amountByNumber.get(num) ?? 0);
      }, 0);

      totals.set(item.name, total);
    });

    return totals;
  }, [amountByNumber]);

  const seriesData = useMemo(() => {
    return ROULETTE_MAP_DATA.map((item) => ({
      ...item,
      value: amountByName.get(item.name) ?? 0,
    }));
  }, [amountByName]);

  const option = useMemo<MapOption | undefined>(() => {
    if (!isMapRegistered) return undefined;

    return {
      tooltip: {
        formatter: (params: any) => {
          const name = params?.name ?? "";
          const amountFromMap = amountByName.get(name);

          const resolvedAmount =
            amountFromMap ??
            (() => {
              if (!name) return 0;
              const groupNumbers = findGroupNumbers(name);
              if (!groupNumbers || groupNumbers.length === 0) return 0;
              return groupNumbers.reduce((sum, num) => {
                return sum + (amountByNumber.get(num) ?? 0);
              }, 0);
            })();

          const displayAmount = formatAmount(resolvedAmount);
          return `Choice: ${name}<br/>Total Placed on this spot: ${displayAmount}`;
        },
      },
      series: [
        {
          type: "map",
          map: ROULETTE_MAP_NAME,
          roam: false,
          label: { show: false },
          emphasis: {
            label: { show: false },
            itemStyle: {
              color: GROUP_HIGHLIGHT_COLOR,
            },
          },
          itemStyle: {
            color: undefined,
            areaColor: undefined,
            borderColor: undefined,
          },
          selectedMode: false,
          select: {
            disabled: true,
            label: { show: false },
            itemStyle: { color: undefined },
          },
          data: seriesData,
        },
      ],
    };
  }, [amountByName, amountByNumber, isMapRegistered, seriesData]);

  return option;
};

export default useRouletteMapData;
