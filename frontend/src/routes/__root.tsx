import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";
import { NotFoundError } from "@/components/errors/not-found-error";
import { GeneralError } from "@/components/errors/general-error";
import type { RouterContext } from "@/lib/types";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
        position="top-center"
      />
      {import.meta.env.MODE === "development" && (
        <>
          <TanStackRouterDevtools
            position="bottom-right"
            initialIsOpen={false}
          />
        </>
      )}
    </>
  ),
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
});
