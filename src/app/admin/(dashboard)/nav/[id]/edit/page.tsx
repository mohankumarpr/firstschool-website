import { notFound } from "next/navigation";
import { Field } from "@/components/admin/Field";
import { getNavItemById } from "@/lib/queries/nav";
import { updateNavItem } from "../../actions";

export default async function EditNavItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getNavItemById(Number(id));
  if (!item) notFound();

  const update = updateNavItem.bind(null, item.id);

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">Edit nav item</h1>
      <form action={update} className="space-y-4">
        <Field label="Label" name="label" defaultValue={item.label} required />
        <Field label="Href" name="href" defaultValue={item.href} required />
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
