import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";

import { QueryClient } from "@tanstack/react-query";
import { NotFoundError } from "@/components/errors/not-found-error";
import { GeneralError } from "@/components/errors/general-error";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
        position="top-center"
      />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  ),
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
});
