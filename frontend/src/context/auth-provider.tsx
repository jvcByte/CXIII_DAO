import { useAccount } from "wagmi";
import { createContext, useContext, useMemo } from "react";
import { queryClient } from "@/lib/config";

import type { RouterContext } from "@/lib/types";

const AppContext = createContext<RouterContext | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isConnected, address } = useAccount();

  const contextValue = useMemo(
    () => ({
      queryClient,
      auth: {
        isAuthenticated: isConnected,
        address,
      },
    }),
    [isConnected, address],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AuthProvider");
  }
  return context;
}
