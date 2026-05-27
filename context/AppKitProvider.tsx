"use client";

import { useEffect, useMemo, type PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/config/wagmi";
import { initAppKitOnce } from "@/lib/appkit-client";

export default function AppKitProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    initAppKitOnce();
  }, []);

  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
