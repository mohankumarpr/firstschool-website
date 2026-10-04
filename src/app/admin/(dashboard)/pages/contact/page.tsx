import { Field, TextAreaField } from "@/components/admin/Field";
import { getContactPageContent } from "@/lib/queries/pages";
import { serializeLines } from "@/lib/admin-page-content";
import { updateContactPage } from "../actions";

export default async function AdminContactPageEditor() {
  const contact = await getContactPageContent();

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Contact page content</h1>
      <form action={updateContactPage} className="space-y-8">
        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Heading</h2>
          <Field label="Tagline" name="headingTagline" defaultValue={contact.heading.tagline} />
          <TextAreaField
            label="Title lines (one per line)"
            name="headingTitleLines"
            defaultValue={serializeLines(contact.heading.titleLines)}
            rows={2}
          />
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Info labels</h2>
          <Field label="Phone label" name="phoneLabel" defaultValue={contact.info.phoneLabel} />
          <Field label="Email label" name="emailLabel" defaultValue={contact.info.emailLabel} />
        </section>

        <p className="text-sm text-[#0b2038]/60">
          The per-location map cards are managed under{" "}
          <a href="/admin/locations" className="text-brand-blue hover:underline">
            Locations
          </a>
          , not here.
        </p>

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
