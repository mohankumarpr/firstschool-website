import Link from "next/link";
import { getCurriculumAdmin } from "@/lib/queries/curriculum";
import { deleteCurriculumItem } from "./actions";

export default async function AdminCurriculumPage() {
  const items = await getCurriculumAdmin();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Curriculum</h1>
        <Link
          href="/admin/curriculum/new"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          + New item
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f5f6f8] text-xs uppercase text-[#0b2038]/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Points</th>
              <th className="px-4 py-3 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-black/5">
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3 text-[#0b2038]/60">{item.slug}</td>
                <td className="px-4 py-3 text-[#0b2038]/60">{item.points.length}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/curriculum/${item.id}/edit`} className="text-brand-blue hover:underline">
                      Edit
                    </Link>
                    <form action={deleteCurriculumItem.bind(null, item.id)}>
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
