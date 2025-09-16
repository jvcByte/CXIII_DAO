export function CreateProposal() {
  return (
    <div className="flex flex-col gap-6 p-4 max-w-[1500px] mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium md:font-bold tracking-tight">
          Create Proposal
        </h1>
      </div>
      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground">
          Create a new proposal for the DAO to vote on.
        </p>
      </div>
    </div>
  );
}
