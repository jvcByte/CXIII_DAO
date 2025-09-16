import { User2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { generateColorFromAddress } from "@/lib/utils";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { truncateAddress } from "@/lib/utils";
import { normalize } from "viem/ens";

export function NavUser() {
  const account = useAccount();
  const avatarBg = generateColorFromAddress(account.address);
  const { data: ensAvatar } = useEnsAvatar({
    name: normalize("wevm.eth"),
  });
  const { data: ensName } = useEnsName({ address: account.address });
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={ensAvatar as string} alt={ensName as string} />
              <AvatarFallback
                className="rounded-lg"
                style={{ backgroundColor: avatarBg }}
              >
                <User2Icon className="h-4 w-4 text-white" />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-start text-sm leading-tight">
              <span className="truncate font-semibold">{ensName}</span>
              <span className="truncate text-xs">
                {truncateAddress(account.address)}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
