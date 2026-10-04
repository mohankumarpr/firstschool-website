import Image from "next/image";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Carousel } from "@/components/Carousel";
import { AdmissionForm } from "@/components/forms/AdmissionForm";
import { getHomePageContent } from "@/lib/queries/pages";
import { getTestimonials } from "@/lib/queries/testimonials";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Start your child's admission enquiry at First School — Play Group, Pre School, Kindergarten and Day Care across Chennai.",
};

export default async function AdmissionsPage() {
  const [homeContent, testimonials] = await Promise.all([
    getHomePageContent(),
    getTestimonials(),
  ]);

  return (
    <>
      <PageHeader title="Admissions" backgroundImage="/images/page-headers/admissions.jpg" />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr]">
          <div className="hidden md:block">
            <Image
              src={homeContent.admissionModal.image}
              alt="Admissions Open at First School"
              width={420}
              height={520}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-2xl font-bold text-[#0b2038]">{homeContent.admissionModal.heading}</h2>
            <AdmissionForm />
          </div>
        </div>
      </section>

      <section className="bg-brand-yellow-soft py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionTitle
            tagline={homeContent.testimonialsSection.tagline}
            title={
              <>
                {homeContent.testimonialsSection.titleLines[0]}
                <br />
                {homeContent.testimonialsSection.titleLines[1]}
              </>
            }
          />
          <Carousel loop>
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </Carousel>
        </div>
      </section>
    </>
  );
}
