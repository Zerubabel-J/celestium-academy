"use client";

import { createAppKit, getAppKit } from "@reown/appkit/react";
import { wagmiAdapter, networks, projectId } from "@/config/wagmi";
import { mainnet } from "@reown/appkit/networks";

declare global {
  interface Window {
    appKit?: ReturnType<typeof createAppKit>;
  }
}

const APP_KIT_METADATA_BASE = {
  name: "Celestium",
  description: "Responsive dashboard",
  icons: ["fox.png"],
};

export function initAppKitOnce() {
  if (typeof window === "undefined") return;
  if (!projectId) {
    console.error("Missing NEXT_PUBLIC_PROJECT_ID");
    return;
  }

  if (window.appKit) {
    getAppKit(window.appKit);
    return;
  }

  const appKit = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks,
    defaultNetwork: mainnet,
    metadata: {
      ...APP_KIT_METADATA_BASE,
      url: window.location.origin,
    },
    features: { analytics: true },
    themeMode: "dark",
  });
  getAppKit(appKit);
  window.appKit = appKit;
}
