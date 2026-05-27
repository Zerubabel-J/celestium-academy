import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, polygon, type AppKitNetwork } from "@reown/appkit/networks";

const projectIdResolved = getProjectId();
const configuredNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [
  mainnet,
  polygon,
];
const storage = createStorage({ storage: cookieStorage });

export const projectId = projectIdResolved;
export const networks = configuredNetworks;

export const wagmiAdapter = new WagmiAdapter({
  storage,
  ssr: false,
  projectId: projectIdResolved,
  networks: configuredNetworks,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

function getProjectId() {
  const value = process.env.NEXT_PUBLIC_PROJECT_ID?.trim();
  if (!value) throw new Error("NEXT_PUBLIC_PROJECT_ID is not defined");
  return value;
}
