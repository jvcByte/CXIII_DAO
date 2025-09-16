import { Dashboard } from "@/components/dashboard/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

// function DashboardComponent() {
//   return (
//     <div className="flex h-svh w-full items-center justify-center">
//       <h1>Dashboard Page</h1>
//     </div>
//   );
// }
