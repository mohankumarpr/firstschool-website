import { Field, TextAreaField } from "@/components/admin/Field";
import { createProgram } from "../actions";

export default function NewProgramPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">New program</h1>
      <form action={createProgram} className="space-y-4">
        <Field label="Title" name="title" required />
        <Field label="Slug" name="slug" required />
        <Field label="Age" name="age" />
        <TextAreaField label="Description" name="description" required />
        <Field label="Image path" name="image" required />
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
