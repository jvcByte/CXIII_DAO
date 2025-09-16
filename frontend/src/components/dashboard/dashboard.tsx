export function Dashboard() {
  return (
    <div className="space-y-6 mx-auto max-w-7xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Proposals
          </h3>
          <div className="text-2xl font-bold">12</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Active Votes
          </h3>
          <div className="text-2xl font-bold">3</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Your Votes
          </h3>
          <div className="text-2xl font-bold">8</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Voting Power
          </h3>
          <div className="text-2xl font-bold">156</div>
        </div>
      </div>
      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <p className="text-muted-foreground">No recent activity to display.</p>
      </div>
    </div>
  );
}
