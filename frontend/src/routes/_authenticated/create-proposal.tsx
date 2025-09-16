import { CreateProposal } from "@/components/create-proposal";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/create-proposal")({
  component: CreateProposal,
});
