"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AppTitle } from "@/components/layout/app-title";
import { sidebarData } from "@/data/sidebar-data";
import { NavGroup } from "@/components/layout/nav-group";
import { NavUser } from "@/components/layout/nav-user";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <AppTitle />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

// <SidebarContent>
//   {isPending ? (
//     <div className="space-y-4">
//       {/* Main Nav Items */}
//       <div className="space-y-2">
//         {[...Array(4)].map((_, i) => (
//           <Skeleton key={`nav-${i}`} className="h-8 w-full" />
//         ))}
//       </div>

//       {/* Documents Section */}
//       <div className="space-y-2 pt-4">
//         <Skeleton className="h-5 w-24" />
//         <div className="pl-4 space-y-2">
//           {[...Array(3)].map((_, i) => (
//             <Skeleton key={`doc-${i}`} className="h-6 w-full" />
//           ))}
//         </div>
//       </div>

//       {/* Secondary Nav */}
//       <div className="space-y-2 pt-4">
//         {[...Array(2)].map((_, i) => (
//           <Skeleton key={`sec-${i}`} className="h-8 w-full" />
//         ))}
//       </div>
//     </div>
//   ) : (
//     <>
//       <NavMain items={data.navMain} />
//       <NavDocuments items={data.documents} />
//       <NavSecondary items={data.navSecondary} className="mt-auto" />
//     </>
//   )}
// </SidebarContent>
