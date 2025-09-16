import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatEther } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Formatting helper
export const formatNumber = (value: bigint | undefined) => {
  if (value === undefined) return "0.00";
  return parseFloat(formatEther(value)).toFixed(2);
};

export function generateColorFromAddress(address?: string): string {
  // Simple deterministic color generator (hash the address)
  if (!address) return "#ccc";
  let hash = 0;
  for (let i = 0; i < address.length; i++) {
    hash = address.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

export function truncateAddress(
  address: `0x${string}` | undefined,
  chars = 4,
): string {
  if (!address) return "";
  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars,
  )}`;
}
