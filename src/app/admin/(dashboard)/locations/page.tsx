import Link from "next/link";
import { getLocations } from "@/lib/queries/locations";
import { deleteLocation } from "./actions";

export default async function AdminLocationsPage() {
  const locations = await getLocations();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Locations</h1>
        <Link
          href="/admin/locations/new"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          + New location
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f5f6f8] text-xs uppercase text-[#0b2038]/60">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Has map?</th>
              <th className="px-4 py-3 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => (
              <tr key={loc.id} className="border-t border-black/5">
                <td className="px-4 py-3 font-medium">{loc.name}</td>
                <td className="px-4 py-3 text-[#0b2038]/60">{loc.slug}</td>
                <td className="px-4 py-3 text-[#0b2038]/60">{loc.mapEmbedUrl ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/locations/${loc.id}/edit`} className="text-brand-blue hover:underline">
                      Edit
                    </Link>
                    <form action={deleteLocation.bind(null, loc.id)}>
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
