export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/program" },
  { label: "Curriculum", href: "/fs-curriculum" },
  { label: "Admissions", href: "/admissions" },
  { label: "After School Club", href: "/after-school-club" },
  { label: "Gallery", href: "/gallery-photos" },
  { label: "Blog", href: "/blog" },
  { label: "Contact us", href: "/contact-us" },
];
