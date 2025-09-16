import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { queryClient } from "@/lib/config";
import { useAppContext } from "@/context/auth-provider";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: {
      isAuthenticated: false,
      address: undefined,
    },
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function RouterWrapper() {
  const context = useAppContext();

  // Update router context with current auth state
  router.update({
    context: {
      queryClient,
      auth: context.auth,
    },
  });

  return <RouterProvider router={router} />;
}
