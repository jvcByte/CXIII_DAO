import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
    queryClient: QueryClient
} 

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
        </>
    ),
})
