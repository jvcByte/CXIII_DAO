import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthenticatedLayout } from "@/components/layout/authed-layout";
import { Dashboard } from "@/components/dashboard/dashboard";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
    <AuthenticatedLayout>
      <Dashboard />
    </AuthenticatedLayout>
  ),
});
