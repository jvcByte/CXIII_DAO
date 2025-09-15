import { createConfig, http } from "wagmi";
import { mainnet, sepolia, celoSepolia, celo } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, sepolia, celo, celoSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [celo.id]: http(),
    [celoSepolia.id]: http(),
  },
});
