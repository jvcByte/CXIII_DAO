import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import contracts from "@/contracts/types";
import { DAO_EVENTS, type ProposalCreatedEvent } from "@/contracts/events";

export function useProposalEvents() {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["proposal-events", contracts.CXII_DAO.address],
    queryFn: async (): Promise<ProposalCreatedEvent[]> => {
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
}
