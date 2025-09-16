import { Outlet } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { SearchProvider } from "@/context/search-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SkipToMain } from "@/components/skip-to-main";
import { AuthenticatedHeader } from "@/components/layout/authenticated-header";
import { AuthGuard } from "@/components/auth/auth-guard";

type AuthenticatedLayoutProps = {
  children?: React.ReactNode;
};

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <AuthGuard>
      <SearchProvider>
        <SidebarProvider defaultOpen={true}>
          <SkipToMain />
          <AppSidebar />
          <SidebarInset
            className={cn(
              // Set content container, so we can use container queries
              "@container/content",

              // If layout is fixed, set the height
              // to 100svh to prevent overflow
              "has-[[data-layout=fixed]]:h-svh",

              // If layout is fixed and sidebar is inset,
              // set the height to 100svh - spacing (total margins) to prevent overflow
              "peer-data-[variant=inset]:has-[[data-layout=fixed]]:h-[calc(100svh-(var(--spacing)*4))]",
            )}
          >
            <AuthenticatedHeader />
            <main className="flex-1 overflow-auto p-6">
              {children ?? <Outlet />}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </SearchProvider>
    </AuthGuard>
  );
}
