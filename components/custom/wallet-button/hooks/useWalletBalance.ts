import { useBalance } from "wagmi";
import { BALANCE_PLACEHOLDER } from "../constants/constants";

type UseWalletBalanceParams = {
  address?: `0x${string}`;
  showBalance: boolean;
  authorized: boolean;
  pending: boolean;
};

type WalletBalanceState = {
  balanceLabel: string;
  canDisplayBalance: boolean;
};

export function useWalletBalance({
  address,
  showBalance,
  authorized,
  pending,
}: UseWalletBalanceParams): WalletBalanceState {
  const { data: balance } = useBalance({
    address,
    query: {
      enabled: Boolean(address) && showBalance && authorized,
      refetchOnWindowFocus: false,
    },
  });

  let balanceLabel = BALANCE_PLACEHOLDER;
  let canDisplayBalance = false;

  if (
    !pending &&
    showBalance &&
    authorized &&
    balance?.formatted &&
    balance?.symbol
  ) {
    const numericValue = Number.parseFloat(balance.formatted);
    if (!Number.isNaN(numericValue)) {
      balanceLabel = `${numericValue.toFixed(4)} ${balance.symbol}`;
      canDisplayBalance = true;
    }
  }

  return { balanceLabel, canDisplayBalance };
}
