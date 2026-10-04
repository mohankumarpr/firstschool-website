import { Field, TextAreaField } from "@/components/admin/Field";
import { getHomePageContent } from "@/lib/queries/pages";
import { serializeLines, serializePairs } from "@/lib/admin-page-content";
import { updateHomePage } from "../actions";

export default async function AdminHomePageEditor() {
  const home = await getHomePageContent();

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Home page content</h1>
      <form action={updateHomePage} className="space-y-8">
        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Hero</h2>
          <TextAreaField
            label="Title lines (one per line)"
            name="heroTitleLines"
            defaultValue={serializeLines(home.hero.titleLines)}
            rows={3}
          />
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">About (&quot;Touching Lives Forever&quot;)</h2>
          <Field label="Title" name="aboutTitle" defaultValue={home.about.title} />
          <TextAreaField label="Text" name="aboutText" defaultValue={home.about.text} rows={4} />
          <Field label="Main image" name="aboutImageMain" defaultValue={home.about.images.main} />
          <Field label="Secondary image" name="aboutImageSecondary" defaultValue={home.about.images.secondary} />
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">A day at First School</h2>
          <Field label="Title" name="dayTitle" defaultValue={home.dayAtFirstSchool.title} />
          <TextAreaField label="Intro" name="dayIntro" defaultValue={home.dayAtFirstSchool.intro} rows={3} />
          <TextAreaField
            label="Tiles — one per line, as: Title | /image/path.jpg"
            name="dayTiles"
            defaultValue={serializePairs(
              home.dayAtFirstSchool.tiles.map((t) => ({ a: t.title, b: t.image }))
            )}
            rows={4}
          />
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Why Us</h2>
          <Field label="Section title" name="whyUsTitle" defaultValue={home.whyUs.title} />
          <TextAreaField
            label="Items — one per line, as: icon-key | Title"
            name="whyUsItems"
            defaultValue={serializePairs(home.whyUs.items.map((i) => ({ a: i.icon, b: i.title })))}
            rows={6}
          />
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Video / Excellence section</h2>
          <Field label="Title" name="videoTitle" defaultValue={home.videoSection.title} />
          <TextAreaField label="Text" name="videoText" defaultValue={home.videoSection.text} rows={3} />
          <Field label="Image" name="videoImage" defaultValue={home.videoSection.image} />
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Safety grid</h2>
          <TextAreaField
            label="Items — one per line, as: icon-key | Title"
            name="safetyItems"
            defaultValue={serializePairs(home.safetyGrid.items.map((i) => ({ a: i.icon, b: i.title })))}
            rows={6}
          />
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Activity Centres</h2>
          <Field label="Section title" name="activityCentresTitle" defaultValue={home.activityCentres.title} />
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Why First School?</h2>
          <Field label="Tagline" name="whyFsTagline" defaultValue={home.whyFirstSchool.tagline} />
          <Field label="Title" name="whyFsTitle" defaultValue={home.whyFirstSchool.title} />
          <Field label="Image" name="whyFsImage" defaultValue={home.whyFirstSchool.image} />
          <TextAreaField
            label="Points (one per line)"
            name="whyFsPoints"
            defaultValue={serializeLines(home.whyFirstSchool.points)}
            rows={5}
          />
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Early Childhood Education focus</h2>
          <Field label="Tagline" name="focusTagline" defaultValue={home.earlyChildhoodFocus.tagline} />
          <Field label="Title" name="focusTitle" defaultValue={home.earlyChildhoodFocus.title} />
          <Field label="Image" name="focusImage" defaultValue={home.earlyChildhoodFocus.image} />
          <TextAreaField
            label="Boxes (one per line)"
            name="focusBoxes"
            defaultValue={serializeLines(home.earlyChildhoodFocus.boxes)}
            rows={5}
          />
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Programmes section</h2>
          <Field label="Tagline" name="programmesTagline" defaultValue={home.programmesSection.tagline} />
          <TextAreaField
            label="Title lines (one per line)"
            name="programmesTitleLines"
            defaultValue={serializeLines(home.programmesSection.titleLines)}
            rows={2}
          />
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Testimonials section</h2>
          <Field label="Tagline" name="testimonialsTagline" defaultValue={home.testimonialsSection.tagline} />
          <TextAreaField
            label="Title lines (one per line)"
            name="testimonialsTitleLines"
            defaultValue={serializeLines(home.testimonialsSection.titleLines)}
            rows={2}
          />
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-[#0b2038]">Admission modal</h2>
          <Field label="Heading" name="admissionModalHeading" defaultValue={home.admissionModal.heading} />
          <Field label="Image" name="admissionModalImage" defaultValue={home.admissionModal.image} />
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
