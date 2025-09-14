import { HeroHeader } from "@/components/header";
import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/hero-section";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <HeroHeader />
      <HeroSection />
    </div>
  );
}
