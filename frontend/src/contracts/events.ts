// contracts/events.ts
import { parseAbiItem } from "viem";

export const DEPLOYMENT_BLOCK = BigInt(18500000);

export const ProposalState = {
  Pending: 0,
  Approved: 1,
  Rejected: 2,
} as const;

export interface ProposalCreatedEvent {
  id: bigint | undefined;
  description: string | undefined;
  deadline: bigint | undefined;
  blockNumber: bigint;
  transactionHash: `0x${string}`;
  logIndex: number;
}

export interface ProposalFulfilledEvent {
  id: bigint;
  description: string;
  recipient: `0x${string}`;
  amount: bigint;
}

export interface VotedEvent {
  id: bigint;
  voter: `0x${string}`;
  state: typeof ProposalState;
  comment: string;
}

// Union type for all DAO events
export type DAOEvent =
  | (ProposalCreatedEvent & { eventName: "ProposalCreated" })
  | (ProposalFulfilledEvent & { eventName: "ProposalFulfilled" })
  | (VotedEvent & { eventName: "Voted" });

export const DAO_EVENTS = {
  ProposalCreated: parseAbiItem(
    "event ProposalCreated(uint256 id, string description, uint256 deadline)",
  ),
  ProposalFulfilled: parseAbiItem(
    "event ProposalFulfilled(uint256 id, string description, address recipient, uint256 amount)",
  ),
  Voted: parseAbiItem(
    "event Voted(uint256 id, address indexed voter, uint8 state, string comment)",
  ),
} as const;

// Event names array for easier iteration
export const DAO_EVENT_NAMES = Object.keys(DAO_EVENTS) as Array<
  keyof typeof DAO_EVENTS
>;

// Helper type for decoded events with metadata
export type DecodedDAOEvent = DAOEvent & {
  blockNumber: bigint;
  transactionHash: `0x${string}`;
  logIndex: number;
  address: `0x${string}`;
};
