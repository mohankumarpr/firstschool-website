import Link from "next/link";
import { getPrograms } from "@/lib/queries/programs";
import { deleteProgram } from "./actions";

export default async function AdminProgramsPage() {
  const programs = await getPrograms();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Programs</h1>
        <Link
          href="/admin/programs/new"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          + New program
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f5f6f8] text-xs uppercase text-[#0b2038]/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((p) => (
              <tr key={p.id} className="border-t border-black/5">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-[#0b2038]/60">{p.slug}</td>
                <td className="px-4 py-3 text-[#0b2038]/60">{p.age || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/programs/${p.id}/edit`} className="text-brand-blue hover:underline">
                      Edit
                    </Link>
                    <form action={deleteProgram.bind(null, p.id)}>
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
