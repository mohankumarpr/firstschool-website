import { notFound } from "next/navigation";
import { Field } from "@/components/admin/Field";
import { getLocationById } from "@/lib/queries/locations";
import { updateLocation } from "../../actions";

export default async function EditLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = await getLocationById(Number(id));
  if (!location) notFound();

  const update = updateLocation.bind(null, location.id);

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">Edit location</h1>
      <form action={update} className="space-y-4">
        <Field label="Name" name="name" defaultValue={location.name} required />
        <Field label="Slug" name="slug" defaultValue={location.slug} required />
        <Field label="Map embed URL" name="mapEmbedUrl" defaultValue={location.mapEmbedUrl ?? ""} />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={location.sortOrder} />
        <button
          type="submit"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Save
        </button>
      </form>
    </div>
  );
}
