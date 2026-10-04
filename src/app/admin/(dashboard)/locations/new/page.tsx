import { Field } from "@/components/admin/Field";
import { createLocation } from "../actions";

export default function NewLocationPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">New location</h1>
      <form action={createLocation} className="space-y-4">
        <Field label="Name" name="name" required />
        <Field label="Slug" name="slug" required />
        <Field label="Map embed URL" name="mapEmbedUrl" />
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
