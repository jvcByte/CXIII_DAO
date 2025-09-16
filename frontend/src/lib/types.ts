import type { LinkProps } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

export interface AuthContext {
  isAuthenticated: boolean;
  address?: `0x${string}`;
}

export interface RouterContext {
  queryClient?: QueryClient;
  auth: AuthContext;
}

type User = {
  name: string;
  email: string;
  avatar: string;
};

type BaseNavItem = {
  title: string;
  badge?: string;
  icon?: React.ElementType;
};

type NavLink = BaseNavItem & {
  url: LinkProps["to"];
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps["to"] })[];
  url?: undefined;
};

type NavItem = NavCollapsible | NavLink;

type NavGroup = {
  title: string;
  items: NavItem[];
};

type SidebarData = {
  user: User;
  navGroups: NavGroup[];
};

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink };
