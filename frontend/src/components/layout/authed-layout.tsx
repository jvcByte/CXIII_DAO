import { Outlet } from "@tanstack/react-router";
import { SearchProvider } from "@/context/search-provider";
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar";
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
          <main className="flex w-full flex-col">
            <div className="flex items-center sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <SidebarTrigger className="mr-5" />
              <AuthenticatedHeader className="mx-auto" />
            </div>
            <div>{children ?? <Outlet />}</div>
          </main>
        </SidebarProvider>
      </SearchProvider>
    </AuthGuard>
  );
}
