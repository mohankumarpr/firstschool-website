import { Field, TextAreaField } from "@/components/admin/Field";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">New testimonial</h1>
      <form action={createTestimonial} className="space-y-4">
        <Field label="Name" name="name" required />
        <TextAreaField label="Content" name="content" required rows={6} />
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
