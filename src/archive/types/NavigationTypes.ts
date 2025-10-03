export interface Link {
  text: string;
  href: string;
}

export interface DropdownLink {
  text: string;
  links: Link[];
}
