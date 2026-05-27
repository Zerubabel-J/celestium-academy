import { useAccount } from "wagmi";
import { useWalletInfo } from "@reown/appkit/react";
import { CONNECT_WALLET_LABEL } from "../constants/constants";
import { useWalletMessaging } from "./useWalletMessaging";
import { useWalletBalance } from "./useWalletBalance";

type UseWalletConnectionParams = {
  isAuthenticated: boolean;
  enableAutoAuth: boolean;
  showBalance: boolean;
};

type WalletConnectionState = {
  pending: boolean;
  label: string;
  iconSrc: string;
  walletName: string;
  balanceLabel: string;
  canDisplayBalance: boolean;
  handleClick: () => Promise<void>;
};

export function useWalletConnection({
  isAuthenticated,
  enableAutoAuth,
  showBalance,
}: UseWalletConnectionParams): WalletConnectionState {
  const { address, isConnected } = useAccount();
  const { walletInfo } = useWalletInfo();
  const messaging = useWalletMessaging({
    isAuthenticated,
    enableAutoAuth,
  });

  const balance = useWalletBalance({
    address,
    showBalance,
    authorized: messaging.authorized,
    pending: messaging.pending,
  });

  const iconSrc =
    typeof walletInfo?.icon === "string" && walletInfo.icon.length > 0
      ? walletInfo.icon
      : "";
  const walletName = walletInfo?.name ?? "Wallet";

  const label =
    isConnected && address
      ? `${address.slice(0, 6)}…${address.slice(-4)}`
      : CONNECT_WALLET_LABEL;

  const handleClick = async () => {
    if (!isConnected || !address) {
      await messaging.openConnect();
      return;
    }

    if (messaging.hasSessionRef.current) {
      await messaging.openAccount();
      return;
    }

    await messaging.authenticate(address);
  };

  return {
    pending: messaging.pending,
    label,
    iconSrc,
    walletName,
    balanceLabel: balance.balanceLabel,
    canDisplayBalance: balance.canDisplayBalance,
    handleClick,
  };
}
