export type WalletButtonDisplay = "desktop" | "mobile" | "sidebar";

export const BASE_BUTTON_CLASS =
  "flex items-center gap-3 rounded-lg border-2 border-(--celestium-accent) bg-(--celestium-surface) px-3 py-2 text-white hover:bg-(--celestium-surface-hover)";

export const DISPLAY_CLASS: Record<WalletButtonDisplay, string> = {
  desktop: "hidden md:flex",
  mobile: "pointer-events-auto md:hidden gap-2 text-sm",
  sidebar: "w-full",
};

export const CONNECT_WALLET_LABEL = "Connect Wallet";
export const SIGNING_LABEL = "Signing…";
export const BALANCE_PLACEHOLDER = "-";
