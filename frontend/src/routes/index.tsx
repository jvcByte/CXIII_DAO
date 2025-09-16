import { HeroHeader } from "@/components/layout/header";
import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/layout/hero-section";
import { useAccount } from "wagmi";
import { AuthenticatedLayout } from "@/components/layout/authed-layout";
import { Dashboard } from "@/components/dashboard";

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
    <AuthenticatedLayout>
      <Dashboard />
    </AuthenticatedLayout>
  );
}
