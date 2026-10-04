import { Field, TextAreaField } from "@/components/admin/Field";
import { getAboutPageContent } from "@/lib/queries/pages";
import { serializeLines } from "@/lib/admin-page-content";
import { updateAboutPage } from "../actions";

export default async function AdminAboutPageEditor() {
  const about = await getAboutPageContent();

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">About page content</h1>
      <form action={updateAboutPage} className="space-y-8">
        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Intro</h2>
          <Field label="Tagline" name="introTagline" defaultValue={about.intro.tagline} />
          <Field label="Title" name="introTitle" defaultValue={about.intro.title} />
          <TextAreaField
            label="Paragraphs (one per line)"
            name="introParagraphs"
            defaultValue={serializeLines(about.intro.paragraphs)}
            rows={5}
          />
          <Field label="Main image" name="introImageMain" defaultValue={about.intro.images.main} />
          <Field label="Secondary image" name="introImageSecondary" defaultValue={about.intro.images.secondary} />
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Banner</h2>
          <Field label="Banner image" name="bannerImage" defaultValue={about.banner.image} />
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Milestones</h2>
          <Field label="Tagline" name="milestonesTagline" defaultValue={about.milestones.tagline} />
          <Field label="Title" name="milestonesTitle" defaultValue={about.milestones.title} />
          <TextAreaField
            label="Items (one per line)"
            name="milestonesItems"
            defaultValue={serializeLines(about.milestones.items)}
            rows={8}
          />
          <Field label="Main image" name="milestonesImageMain" defaultValue={about.milestones.images.main} />
          <Field
            label="Secondary image"
            name="milestonesImageSecondary"
            defaultValue={about.milestones.images.secondary}
          />
        </section>

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
