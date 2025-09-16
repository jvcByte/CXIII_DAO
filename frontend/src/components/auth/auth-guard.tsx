import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "@tanstack/react-router";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isConnected, isConnecting } = useAccount();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!isConnected && !isConnecting) {
      setIsRedirecting(true);
      // Small delay to show loading state before redirect
      const timer = setTimeout(() => {
        router.navigate({
          to: "/",
          replace: true,
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isConnected, isConnecting, router]);

  // Show loading state while connecting or redirecting
  if (isConnecting || isRedirecting || !isConnected) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">
            {isConnecting ? "Connecting wallet..." : "Redirecting..."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
