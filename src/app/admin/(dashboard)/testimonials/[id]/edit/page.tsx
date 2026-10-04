import { notFound } from "next/navigation";
import { Field, TextAreaField } from "@/components/admin/Field";
import { getTestimonialById } from "@/lib/queries/testimonials";
import { updateTestimonial } from "../../actions";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonialById(Number(id));
  if (!testimonial) notFound();

  const update = updateTestimonial.bind(null, testimonial.id);

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">Edit testimonial</h1>
      <form action={update} className="space-y-4">
        <Field label="Name" name="name" defaultValue={testimonial.name} required />
        <TextAreaField label="Content" name="content" defaultValue={testimonial.content} required rows={6} />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={testimonial.sortOrder} />
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
