import { MutableRefObject, useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import type { Address } from "viem";
import { getNonce, loginWallet, logout } from "@/app/actions/auth";
import { useAuthorizationSync } from "./useAuthorizationSync";
import { useAutoSessionLifecycle } from "./useAutoSessionLifecycle";

type UseWalletMessagingParams = {
  isAuthenticated: boolean;
  enableAutoAuth: boolean;
};

type WalletMessagingState = {
  pending: boolean;
  authorized: boolean;
  hasSessionRef: MutableRefObject<boolean>;
  authenticate: (address: `0x${string}`) => Promise<void>;
  openConnect: () => Promise<void>;
  openAccount: () => Promise<void>;
};

export function useWalletMessaging({
  isAuthenticated,
  enableAutoAuth,
}: UseWalletMessagingParams): WalletMessagingState {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { open } = useAppKit();
  const router = useRouter();

  const [pending, setPending] = useState(false);
  const { authorized, setAuthorized, hasSessionRef } =
    useAuthorizationSync(isAuthenticated);
  const signingInRef = useRef(false);

  const openConnect = useCallback(async () => {
    await open({ view: "Connect" });
  }, [open]);

  const openAccount = useCallback(async () => {
    await open({ view: "Account" });
  }, [open]);

  const authenticate = useCallback(
    async (walletAddress: `0x${string}`) => {
      if (signingInRef.current) return;

      signingInRef.current = true;
      setPending(true);

      try {
        const nonce = await getNonce(walletAddress);
        const message = `Sign in to Celestium\n\nNonce: ${nonce}`;
        const signature = await signMessageAsync({ message });
        await loginWallet({ address: walletAddress as Address, signature });
        hasSessionRef.current = true;
        setAuthorized(true);
        router.refresh();
        await openAccount();
      } catch (err) {
        console.warn("User cancelled or sign failed:", err);
        hasSessionRef.current = false;
        setAuthorized(false);
        try {
          await logout();
        } catch {}
        disconnect();
      } finally {
        setPending(false);
        signingInRef.current = false;
      }
    },
    [signMessageAsync, openAccount, router, disconnect]
  );

  const handleDisconnected = useCallback(async () => {
    setAuthorized(false);
    try {
      await logout();
    } catch (err) {
      console.warn("Logout on disconnect failed:", err);
    }
    router.refresh();
  }, [setAuthorized, router]);

  useAutoSessionLifecycle({
    enableAutoAuth,
    isConnected,
    address,
    hasSessionRef,
    authenticate,
    onDisconnected: handleDisconnected,
  });

  return {
    pending,
    authorized,
    hasSessionRef,
    authenticate,
    openConnect,
    openAccount,
  };
}
