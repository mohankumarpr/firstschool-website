import { TextAreaField } from "@/components/admin/Field";
import { getAfterSchoolImages } from "@/lib/queries/after-school";
import { updateAfterSchoolImages } from "./actions";

export default async function AdminAfterSchoolPage() {
  const images = await getAfterSchoolImages();

  return (
    <div className="max-w-xl">
      <h1 className="mb-2 text-2xl font-bold">After School Club images</h1>
      <p className="mb-6 text-sm text-[#0b2038]/60">
        One image path per line, in the order they should appear on the page.
      </p>
      <form action={updateAfterSchoolImages} className="space-y-4">
        <TextAreaField label="Image paths" name="images" defaultValue={images.join("\n")} rows={14} />
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
