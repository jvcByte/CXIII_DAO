import {
  useDAOEvents,
  getEventDescription,
  getEventStyle,
} from "@/hooks/useDAOEvents";
// Helper function to format relative time without date-fns
function getRelativeTime(blockNumber: bigint): string {
  // This is a simplified approach - in a real app you'd want to fetch block timestamps
  return `Block #${blockNumber.toString()}`;
}

interface RecentActivityProps {
  limit?: number;
}

export function RecentActivity({ limit = 10 }: RecentActivityProps) {
  const { data: events, isLoading, error } = useDAOEvents();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-start space-x-3 animate-pulse">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load recent activity</p>
        <p className="text-sm text-muted-foreground mt-1">
          Please try refreshing the page
        </p>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No recent activity to display.</p>
      </div>
    );
  }

  const displayEvents = events.slice(0, limit);

  return (
    <div className="space-y-4">
      {displayEvents.map((event) => {
        const { icon, color } = getEventStyle(event);
        const description = getEventDescription(event);

        return (
          <div
            key={`${event.transactionHash}-${event.logIndex}`}
            className="flex items-start space-x-3"
          >
            {/* Event Icon */}
            <div className="flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-sm`}
              >
                {icon}
              </div>
            </div>

            {/* Event Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className={`text-sm font-medium ${color}`}>
                    {description}
                  </p>

                  {/* Additional event-specific details */}
                  <div className="text-xs text-muted-foreground mt-1 space-y-1">
                    {event.eventName === "ProposalCreated" && (
                      <p>
                        Proposal #{event.id.toString()} • Deadline:{" "}
                        {new Date(
                          Number(event.deadline) * 1000,
                        ).toLocaleDateString()}
                      </p>
                    )}

                    {event.eventName === "ProposalFulfilled" && (
                      <p>
                        Proposal #{event.id.toString()} • Amount:{" "}
                        {(Number(event.amount) / 1e18).toFixed(4)} ETH •
                        Recipient:{" "}
                        {`${event.recipient.slice(0, 6)}...${event.recipient.slice(-4)}`}
                      </p>
                    )}

                    {event.eventName === "Voted" && (
                      <p>
                        Proposal #{event.id.toString()} • Voter:{" "}
                        {`${event.voter.slice(0, 6)}...${event.voter.slice(-4)}`}
                        {event.comment && ` • "${event.comment}"`}
                      </p>
                    )}

                    <p>
                      Block #{event.blockNumber.toString()} •
                      <a
                        href={`https://etherscan.io/tx/${event.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-600"
                      >
                        View on Etherscan
                      </a>
                    </p>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground ml-4 flex-shrink-0">
                  {getRelativeTime(event.blockNumber)}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {events.length > limit && (
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing {limit} of {events.length} events
          </p>
        </div>
      )}
    </div>
  );
}
