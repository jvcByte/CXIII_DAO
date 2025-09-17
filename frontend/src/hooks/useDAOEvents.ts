import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import contracts from "@/contracts/types";
import { DAO_EVENTS, ProposalState } from "@/contracts/events";

export interface DAOEventBase {
  eventName: string;
  blockNumber: bigint;
  transactionHash: `0x${string}`;
  logIndex: number;
  timestamp?: number;
}

export interface ProposalCreatedEventData extends DAOEventBase {
  eventName: "ProposalCreated";
  id: bigint;
  description: string;
  deadline: bigint;
}

export interface ProposalFulfilledEventData extends DAOEventBase {
  eventName: "ProposalFulfilled";
  id: bigint;
  description: string;
  recipient: `0x${string}`;
  amount: bigint;
}

export interface VotedEventData extends DAOEventBase {
  eventName: "Voted";
  id: bigint;
  voter: `0x${string}`;
  state: number;
  comment: string;
}

export type DAOEventData =
  | ProposalCreatedEventData
  | ProposalFulfilledEventData
  | VotedEventData;

export function useDAOEvents() {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["dao-events", contracts.CXII_DAO.address],
    queryFn: async (): Promise<DAOEventData[]> => {
      if (!publicClient) return [];

      try {
        // Fetch all event types in parallel
        const [proposalCreatedLogs, proposalFulfilledLogs, votedLogs] =
          await Promise.all([
            publicClient.getLogs({
              address: contracts.CXII_DAO.address,
              event: DAO_EVENTS.ProposalCreated,
              fromBlock: "earliest",
              toBlock: "latest",
            }),
            publicClient.getLogs({
              address: contracts.CXII_DAO.address,
              event: DAO_EVENTS.ProposalFulfilled,
              fromBlock: "earliest",
              toBlock: "latest",
            }),
            publicClient.getLogs({
              address: contracts.CXII_DAO.address,
              event: DAO_EVENTS.Voted,
              fromBlock: "earliest",
              toBlock: "latest",
            }),
          ]);

        // Transform and combine all events
        const allEvents: DAOEventData[] = [
          // Proposal Created Events
          ...proposalCreatedLogs.map(
            (log): ProposalCreatedEventData => ({
              eventName: "ProposalCreated",
              id: log.args.id!,
              description: log.args.description!,
              deadline: log.args.deadline!,
              blockNumber: log.blockNumber,
              transactionHash: log.transactionHash,
              logIndex: log.logIndex,
            }),
          ),

          // Proposal Fulfilled Events
          ...proposalFulfilledLogs.map(
            (log): ProposalFulfilledEventData => ({
              eventName: "ProposalFulfilled",
              id: log.args.id!,
              description: log.args.description!,
              recipient: log.args.recipient!,
              amount: log.args.amount!,
              blockNumber: log.blockNumber,
              transactionHash: log.transactionHash,
              logIndex: log.logIndex,
            }),
          ),

          // Voted Events
          ...votedLogs.map(
            (log): VotedEventData => ({
              eventName: "Voted",
              id: log.args.id!,
              voter: log.args.voter!,
              state: log.args.state!,
              comment: log.args.comment!,
              blockNumber: log.blockNumber,
              transactionHash: log.transactionHash,
              logIndex: log.logIndex,
            }),
          ),
        ];

        // Sort by block number and log index (most recent first)
        return allEvents.sort((a, b) => {
          if (a.blockNumber !== b.blockNumber) {
            return Number(b.blockNumber - a.blockNumber);
          }
          return b.logIndex - a.logIndex;
        });
      } catch (error) {
        console.error("Error fetching DAO events:", error);
        return [];
      }
    },
    enabled: !!publicClient,
    staleTime: 50000, // Cache for 50 seconds
    refetchInterval: 100000, // Refetch every 100 seconds
  });
}

// Helper function to get human-readable event descriptions
export function getEventDescription(event: DAOEventData): string {
  switch (event.eventName) {
    case "ProposalCreated":
      return `New proposal created: "${event.description.substring(0, 50)}${event.description.length > 50 ? "..." : ""}"`;
    case "ProposalFulfilled":
      return `Proposal fulfilled: "${event.description.substring(0, 50)}${event.description.length > 50 ? "..." : ""}"`;
    case "Voted": {
      const stateText =
        event.state === ProposalState.Approved
          ? "approved"
          : event.state === ProposalState.Rejected
            ? "rejected"
            : "pending";
      return `Vote cast (${stateText}) on proposal #${event.id}`;
    }
    default:
      return "Unknown event";
  }
}

// Helper function to get event icons/colors
export function getEventStyle(event: DAOEventData): {
  icon: string;
  color: string;
} {
  switch (event.eventName) {
    case "ProposalCreated":
      return { icon: "📝", color: "text-blue-600" };
    case "ProposalFulfilled":
      return { icon: "✅", color: "text-green-600" };
    case "Voted": {
      const color =
        event.state === ProposalState.Approved
          ? "text-green-600"
          : event.state === ProposalState.Rejected
            ? "text-red-600"
            : "text-yellow-600";
      return { icon: "🗳️", color };
    }
    default:
      return { icon: "❓", color: "text-gray-600" };
  }
}
