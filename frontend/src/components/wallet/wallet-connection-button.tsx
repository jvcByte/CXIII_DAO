import { useState } from "react";
import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  ExternalLink,
  LogOut,
  Wallet,
  ChevronDown,
  User,
  Check,
} from "lucide-react";
import { generateColorFromAddress } from "@/lib/utils";
import {
  useAccount,
  useEnsName,
  useEnsAvatar,
  useBalance,
  useDisconnect,
  useSwitchChain,
  useChains,
} from "wagmi";
import { formatEther } from "viem";
import { toast } from "react-hot-toast";
import {
  getChainIcon,
  getChainStatus,
  sortChainsByPriority,
} from "@/lib/chain-utils";

interface WalletConnectionButtonProps {
  size?: "sm" | "default" | "lg";
  showBalance?: boolean;
  variant?: "default" | "outline" | "ghost";
}

interface ChainSwitchState {
  isLoading: boolean;
  targetChainId?: number;
}

export function WalletConnectionButton({
  size = "default",
  showBalance = false,
  variant = "outline",
}: WalletConnectionButtonProps) {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();
  const chains = useChains();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName || undefined });
  const { data: balance } = useBalance({ address });
  const [copied, setCopied] = useState(false);
  const [chainSwitchState, setChainSwitchState] = useState<ChainSwitchState>({
    isLoading: false,
  });
  const avatarBg = generateColorFromAddress(address);

  const truncateAddress = (addr?: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Address copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSwitchChain = async (chainId: number) => {
    if (chain?.id === chainId) return;

    setChainSwitchState({ isLoading: true, targetChainId: chainId });

    try {
      toast.promise(switchChainAsync({ chainId }), {
        loading: "Switching network...",
        success: `Switched to ${
          chains.find((c) => c.id === chainId)?.name
        } successfully!`,
        error: "Failed to switch network",
      });
    } catch (error) {
      toast.error("Failed to switch network");
      console.error("Chain switch error:", error);
    } finally {
      setChainSwitchState({ isLoading: false });
    }
  };

  const openEtherscan = () => {
    if (address && chain) {
      const baseUrl =
        chain.blockExplorers?.default?.url || "https://etherscan.io";
      window.open(`${baseUrl}/address/${address}`, "_blank");
    }
  };

  return (
    <ConnectKitButton.Custom>
      {({ isConnecting, show }) => {
        if (!isConnected) {
          return (
            <Button
              onClick={show}
              variant={variant}
              size={size}
              disabled={isConnecting}
              className="gap-2"
            >
              <Wallet className="h-4 w-4" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          );
        }

        // Mobile view (collapsed/small screens)
        const MobileButton = (
          <Button variant={variant} size={size} className="p-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={ensAvatar || undefined} />
              <AvatarFallback
                className="text-xs"
                style={{ backgroundColor: avatarBg }}
              >
                <User className="h-3 w-3 text-white" />
              </AvatarFallback>
            </Avatar>
          </Button>
        );

        // Desktop view (expanded)
        const DesktopButton = (
          <Button
            variant={variant}
            size={size}
            className="gap-2 min-w-[160px] justify-between"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={ensAvatar || undefined} />
                <AvatarFallback
                  className="text-xs"
                  style={{ backgroundColor: avatarBg }}
                >
                  <User className="h-3 w-3 text-white" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">
                    {ensName || truncateAddress(address)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {showBalance && balance && (
                    <span className="text-xs text-muted-foreground">
                      {parseFloat(formatEther(balance.value)).toFixed(4)}{" "}
                      {balance.symbol}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        );

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                {/* Show mobile button on small screens, desktop on large */}
                <div className="block md:hidden">{MobileButton}</div>
                <div className="hidden md:block">{DesktopButton}</div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={ensAvatar || undefined} />
                      <AvatarFallback style={{ backgroundColor: avatarBg }}>
                        <User className="h-4 w-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {ensName || "Wallet"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {truncateAddress(address)}
                      </p>
                    </div>
                  </div>
                  {balance && (
                    <div className="pt-1">
                      <Badge variant="secondary" className="text-xs">
                        {parseFloat(formatEther(balance.value)).toFixed(4)}{" "}
                        {balance.symbol}
                      </Badge>
                    </div>
                  )}
                  {chain && (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-xs w-fit flex items-center gap-1"
                      >
                        {getChainIcon(chain.id)}
                        {chain.name}
                      </Badge>
                      <Badge
                        variant={
                          getChainStatus(chain.id) === "Testnet"
                            ? "secondary"
                            : "default"
                        }
                        className="text-xs"
                      >
                        {getChainStatus(chain.id)}
                      </Badge>
                    </div>
                  )}
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={copyAddress}
                className="cursor-pointer"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy Address"}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={openEtherscan}
                className="cursor-pointer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Explorer
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1">
                Networks
              </DropdownMenuLabel>

              {sortChainsByPriority([...chains]).map((chainOption) => {
                const isCurrentChain = chain?.id === chainOption.id;
                const isSwitching =
                  chainSwitchState.isLoading &&
                  chainSwitchState.targetChainId === chainOption.id;

                return (
                  <DropdownMenuItem
                    key={chainOption.id}
                    onClick={() => handleSwitchChain(chainOption.id)}
                    className={`cursor-pointer flex items-center justify-between ${
                      isCurrentChain ? "bg-primary/5" : ""
                    } ${isSwitching ? "opacity-50" : ""}`}
                    disabled={isCurrentChain || chainSwitchState.isLoading}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <span className="text-sm">{chainOption.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {getChainStatus(chainOption.id)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {isSwitching ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary" />
                      ) : isCurrentChain ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : null}
                    </div>
                  </DropdownMenuItem>
                );
              })}

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => disconnect()}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect Wallet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
