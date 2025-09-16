export interface ChainInfo {
  id: number;
  name: string;
  isTestnet: boolean;
  color: string;
  blockExplorerUrl?: string;
}

export const isTestnet = (chainId: number): boolean => {
  const testnets = [11155111, 44787]; // Sepolia, Celo Alfajores
  return testnets.includes(chainId);
};

export const getChainStatus = (chainId: number): "Mainnet" | "Testnet" => {
  return isTestnet(chainId) ? "Testnet" : "Mainnet";
};

export const formatChainName = (chainName: string): string => {
  // Remove common suffixes for cleaner display
  return chainName
    .replace(" Mainnet", "")
    .replace(" Testnet", "")
    .replace(" Network", "");
};

// Popular chain IDs for reference
export const CHAIN_IDS = {
  ETHEREUM_MAINNET: 1,
  SEPOLIA: 11155111,
  CELO_MAINNET: 42220,
  CELO_ALFAJORES: 44787,
} as const;

// Chain priority for sorting (mainnet chains first, then testnets)
export const getChainPriority = (chainId: number): number => {
  const priorities: Record<number, number> = {
    [CHAIN_IDS.ETHEREUM_MAINNET]: 1,
    [CHAIN_IDS.CELO_MAINNET]: 2,
    [CHAIN_IDS.SEPOLIA]: 10,
    [CHAIN_IDS.CELO_ALFAJORES]: 11,
  };
  return priorities[chainId] || 99;
};

export const sortChainsByPriority = <T extends { id: number }>(
  chains: T[],
): T[] => {
  return [...chains].sort(
    (a, b) => getChainPriority(a.id) - getChainPriority(b.id),
  );
};

export const getChainIcon = (chainId: number) => {
  switch (chainId) {
    case 1: // Ethereum Mainnet
      return (
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-600" />
      );
    case 11155111: // Sepolia Testnet
      return (
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500" />
      );
    case 42220: // Celo Mainnet
      return (
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />
      );
    case 44787: // Celo Alfajores Testnet
      return (
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-300 to-emerald-400 opacity-70" />
      );
    default:
      return (
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-600" />
      );
  }
};
