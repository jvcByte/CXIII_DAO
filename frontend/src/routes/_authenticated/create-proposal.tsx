import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/create-proposal")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create Proposal</h1>
      </div>
      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground">
          Create a new proposal for the DAO to vote on.
        </p>
      </div>
    </div>
  );
}
