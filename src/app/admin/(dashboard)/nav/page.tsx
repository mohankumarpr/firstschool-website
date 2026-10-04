import Link from "next/link";
import { getNavItems } from "@/lib/queries/nav";
import { deleteNavItem } from "./actions";

export default async function AdminNavPage() {
  const navItems = await getNavItems();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Nav menu</h1>
        <Link
          href="/admin/nav/new"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          + New nav item
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f5f6f8] text-xs uppercase text-[#0b2038]/60">
            <tr>
              <th className="px-4 py-3">Label</th>
              <th className="px-4 py-3">Href</th>
              <th className="px-4 py-3 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {navItems.map((item) => (
              <tr key={item.id} className="border-t border-black/5">
                <td className="px-4 py-3 font-medium">{item.label}</td>
                <td className="px-4 py-3 text-[#0b2038]/60">{item.href}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/nav/${item.id}/edit`} className="text-brand-blue hover:underline">
                      Edit
                    </Link>
                    <form action={deleteNavItem.bind(null, item.id)}>
                      <button type="submit" className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
