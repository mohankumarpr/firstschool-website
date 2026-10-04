import { Field } from "@/components/admin/Field";
import { createNavItem } from "../actions";

export default function NewNavItemPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">New nav item</h1>
      <form action={createNavItem} className="space-y-4">
        <Field label="Label" name="label" required />
        <Field label="Href" name="href" required />
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
