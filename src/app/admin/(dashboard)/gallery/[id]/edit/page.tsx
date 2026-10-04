import { notFound } from "next/navigation";
import { Field, TextAreaField } from "@/components/admin/Field";
import { getGalleryItemById } from "@/lib/queries/gallery";
import { updateGalleryItem } from "../../actions";

export default async function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getGalleryItemById(Number(id));
  if (!item) notFound();

  const update = updateGalleryItem.bind(null, item.id);

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">Edit gallery item</h1>
      <form action={update} className="space-y-4">
        <Field label="Title" name="title" defaultValue={item.title} required />
        <Field label="Slug" name="slug" defaultValue={item.slug} required />
        <Field label="Cover image path" name="coverImage" defaultValue={item.coverImage} required />
        <TextAreaField
          label="Image paths (one per line)"
          name="images"
          defaultValue={item.images.join("\n")}
          rows={10}
        />
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
