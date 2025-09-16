import { HeroHeader } from "@/components/layout/header";
import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/layout/hero-section";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { address } = useAccount();

  if (!address) {
    return (
      <div className="p-2">
        <HeroHeader />
        <HeroSection />
      </div>
    );
  }

  return (
    <div className="p-2">
      <>
        <div className="flex justify-evenly items-center-safe">
          <p>Temp Page</p>
          <ConnectKitButton />
        </div>
      </>
    </div>
  );
}
