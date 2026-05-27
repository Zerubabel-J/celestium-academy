import { MutableRefObject, useEffect } from "react";

type Params = {
  enableAutoAuth: boolean;
  isConnected: boolean;
  address?: `0x${string}`;
  hasSessionRef: MutableRefObject<boolean>;
  authenticate: (address: `0x${string}`) => Promise<void>;
  onDisconnected: () => Promise<void>;
};

export function useAutoSessionLifecycle({
  enableAutoAuth,
  isConnected,
  address,
  hasSessionRef,
  authenticate,
  onDisconnected,
}: Params) {
  useEffect(() => {
    if (!enableAutoAuth) return;

    if (isConnected && address) {
      if (!hasSessionRef.current) {
        authenticate(address).catch(() => {
          /* handled inside authenticate */
        });
      }
      return;
    }

    if (!isConnected && hasSessionRef.current) {
      hasSessionRef.current = false;
      onDisconnected().catch(() => {
        /* best effort */
      });
    }
  }, [
    enableAutoAuth,
    isConnected,
    address,
    hasSessionRef,
    authenticate,
    onDisconnected,
  ]);
}
