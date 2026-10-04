import Link from "next/link";
import { logout } from "../actions";

export const dynamic = "force-dynamic";

const NAV_SECTIONS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/programs", label: "Programs" },
  { href: "/admin/curriculum", label: "Curriculum" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/after-school", label: "After School images" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/nav", label: "Nav menu" },
  { href: "/admin/locations", label: "Locations" },
  { href: "/admin/site-settings", label: "Site settings" },
  { href: "/admin/pages", label: "Page content" },
  { href: "/admin/enquiries", label: "Enquiries" },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 border-r border-black/10 bg-white p-4">
        <p className="mb-4 px-2 text-sm font-bold text-[#0b2038]">First School Admin</p>
        <nav className="space-y-1">
          {NAV_SECTIONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#0b2038]/80 hover:bg-[#f5f6f8]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="mt-4 border-t border-black/10 pt-4">
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Log out
          </button>
        </form>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
