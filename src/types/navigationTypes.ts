export type NavItemData = {
  label: string;
  href: string;
  children?: NavItemData[]; // Only top-level items can have children
};

export type NavigationData = {
  mainNavigation: NavItemData[];
};
