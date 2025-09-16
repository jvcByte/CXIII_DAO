import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/button";

export const CustomConnectKitButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, truncatedAddress, ensName }) => {
        return (
          <Button
            onClick={show}
            variant="outline"
            size="lg"
            className="border-2 border-stone-300 dark:border-stone-400 text-base"
          >
            {isConnecting
              ? "Signing In..."
              : isConnected
                ? (ensName ?? truncatedAddress)
                : "Sign In"}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
