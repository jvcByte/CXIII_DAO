import {
  LayoutDashboard,
  Monitor,
  HelpCircle,
  Bell,
  Palette,
  Settings,
  Wrench,
  UserCog,
  Users,
} from "lucide-react";
import { type SidebarData } from "@/lib/types";

export const sidebarData: SidebarData = {
  user: {
    name: "User",
    email: "user@email.com",
    avatar: "",
  },
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Create Prposal",
          url: "/create-proposal",
          icon: Users,
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: Settings,
          items: [
            {
              title: "Profile",
              url: "/temp-route",
              icon: UserCog,
            },
            {
              title: "Account",
              url: "/temp-route",
              icon: Wrench,
            },
            {
              title: "Appearance",
              url: "/temp-route",
              icon: Palette,
            },
            {
              title: "Notifications",
              url: "/temp-route",
              icon: Bell,
            },
            {
              title: "Display",
              url: "/temp-route",
              icon: Monitor,
            },
          ],
        },
        {
          title: "Help Center",
          url: "/temp-route",
          icon: HelpCircle,
        },
      ],
    },
  ],
};
