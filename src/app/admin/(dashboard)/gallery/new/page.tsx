import { Field, TextAreaField } from "@/components/admin/Field";
import { createGalleryItem } from "../actions";

export default function NewGalleryItemPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">New gallery item</h1>
      <form action={createGalleryItem} className="space-y-4">
        <Field label="Title" name="title" required />
        <Field label="Slug" name="slug" required />
        <Field label="Cover image path" name="coverImage" required />
        <TextAreaField label="Image paths (one per line)" name="images" rows={10} />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={0} />
        <button
          type="submit"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Create
        </button>
      </form>
    </div>
  );
}
