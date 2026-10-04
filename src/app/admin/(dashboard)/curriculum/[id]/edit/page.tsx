import { notFound } from "next/navigation";
import { Field, TextAreaField } from "@/components/admin/Field";
import { getCurriculumItemById } from "@/lib/queries/curriculum";
import { updateCurriculumItem } from "../../actions";

export default async function EditCurriculumItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getCurriculumItemById(Number(id));
  if (!item) notFound();

  const update = updateCurriculumItem.bind(null, item.id);

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">Edit curriculum item</h1>
      <form action={update} className="space-y-4">
        <Field label="Title" name="title" defaultValue={item.title} required />
        <Field label="Slug" name="slug" defaultValue={item.slug} required />
        <Field label="Image path" name="image" defaultValue={item.image} required />
        <TextAreaField label="Points (one per line)" name="points" defaultValue={item.points.join("\n")} rows={5} />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={item.sortOrder} />
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
