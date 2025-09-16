import { cn } from "@/lib/utils";
import { UserInfo } from "./user-info";
import { ThemeSwitcher } from "./theme-switcher";

type AuthenticatedHeaderProps = {
  className?: string;
};

export function AuthenticatedHeader({ className }: AuthenticatedHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="mx-auto max-w-8xl px-6">
        <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0">
          <div className="flex items-center">
            <h1 className="text-xl font-bold tracking-wide">CXIII DAO</h1>
          </div>

          <div className="flex items-center gap-4">
            <UserInfo />
            <div>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
