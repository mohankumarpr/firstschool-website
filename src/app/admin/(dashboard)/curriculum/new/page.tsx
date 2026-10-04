import { Field, TextAreaField } from "@/components/admin/Field";
import { createCurriculumItem } from "../actions";

export default function NewCurriculumItemPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">New curriculum item</h1>
      <form action={createCurriculumItem} className="space-y-4">
        <Field label="Title" name="title" required />
        <Field label="Slug" name="slug" required />
        <Field label="Image path" name="image" required />
        <TextAreaField label="Points (one per line)" name="points" rows={5} />
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
