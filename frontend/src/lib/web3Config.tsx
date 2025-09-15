import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { config } from "./config";
import { queryClient } from "./config";

// Declare wagmi module for type safety
declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

type Web3ProviderProps = {
  children: React.ReactNode;
};

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
