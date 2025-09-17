import { useReadContract, usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import contracts from "@/contracts/types";
import { DAO_EVENTS } from "@/contracts/events";
// import { formatNumber } from "@/lib/utils";

export interface proposalCountEventProps {
  id: bigint;
  description: string;
  deadline: bigint;
}

export function Dashboard() {
  const publicClient = usePublicClient();

  const { data: proposalEvents } = useQuery({
    queryKey: ["proposal-events", contracts.CXII_DAO.address],
    queryFn: async () => {
      if (!publicClient) return [];

      const logs = await publicClient.getLogs({
        address: contracts.CXII_DAO.address,
        event: DAO_EVENTS.ProposalCreated,
        fromBlock: "earliest",
        toBlock: "latest",
      });

      return logs.map((log) => ({
        id: log.args.id,
        description: log.args.description,
        deadline: log.args.deadline,
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
        logIndex: log.logIndex,
      }));
    },
    enabled: !!publicClient,
    staleTime: 1000,
  });
  console.log("Prposal Event: ", proposalEvents);
  const { data: proposalCounts } = useReadContract({
    ...contracts.CXII_DAO,
    functionName: "proposalCount",
  });

  console.log("Prposal Count: ", proposalCounts);
  return (
    <div className="flex flex-col gap-6 p-4 max-w-[1500px] mx-auto">
      <div className="flex proposalCountsitems-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Proposals
          </h3>
          <div className="text-2xl font-bold">{proposalCounts || "0"}</div>
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
