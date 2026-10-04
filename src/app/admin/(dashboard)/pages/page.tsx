import Link from "next/link";

const PAGES = [
  { href: "/admin/pages/home", label: "Home page content" },
  { href: "/admin/pages/about", label: "About page content" },
  { href: "/admin/pages/contact", label: "Contact page content" },
];

export default function AdminPagesIndex() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Page content</h1>
      <div className="space-y-3">
        {PAGES.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="block rounded-xl border border-black/10 bg-white p-4 font-medium text-brand-blue hover:underline"
          >
            {p.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
