import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./context/theme-provider";
import { AuthProvider } from "./context/auth-provider";
import { Web3Provider } from "@/lib/web3Config";
import { RouterWrapper } from "@/components/router-wrapper";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Web3Provider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <AuthProvider>
            <RouterWrapper />
          </AuthProvider>
        </ThemeProvider>
      </Web3Provider>
    </StrictMode>,
  );
}
