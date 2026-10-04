import { notFound } from "next/navigation";
import { Field, TextAreaField } from "@/components/admin/Field";
import { getProgramById } from "@/lib/queries/programs";
import { updateProgram } from "../../actions";

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await getProgramById(Number(id));
  if (!program) notFound();

  const update = updateProgram.bind(null, program.id);

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">Edit program</h1>
      <form action={update} className="space-y-4">
        <Field label="Title" name="title" defaultValue={program.title} required />
        <Field label="Slug" name="slug" defaultValue={program.slug} required />
        <Field label="Age" name="age" defaultValue={program.age} />
        <TextAreaField label="Description" name="description" defaultValue={program.description} required />
        <Field label="Image path" name="image" defaultValue={program.image} required />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={program.sortOrder} />
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
