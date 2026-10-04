import Image from "next/image";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { getAboutPageContent } from "@/lib/queries/pages";

export const metadata: Metadata = {
  title: "About",
  description:
    "First School is a rapidly growing chain of kindergarten schools with an emphasis on the overall development of a child.",
};

export default async function AboutPage() {
  const aboutContent = await getAboutPageContent();

  return (
    <>
      <PageHeader title="About" backgroundImage="/images/page-headers/about.jpg" />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <Reveal direction="left" delay={0.1} className="relative mx-auto aspect-square w-full max-w-md">
            <div
              className="accent-blob-1 absolute right-0 -bottom-4 h-28 w-36"
              style={{ backgroundColor: "#ffaa23" }}
            />
            <Image
              src={aboutContent.intro.images.main}
              alt="First School"
              fill
              className="rounded-full object-cover"
            />
            <Image
              src={aboutContent.intro.images.secondary}
              alt="First School"
              width={150}
              height={150}
              className="absolute -bottom-4 -left-4 hidden rounded-full border-4 border-white object-cover shadow-lg sm:block"
            />
          </Reveal>
          <Reveal direction="right">
            <SectionTitle
              align="left"
              tagline={aboutContent.intro.tagline}
              title={aboutContent.intro.title}
            />
            {aboutContent.intro.paragraphs.map((p) => (
              <p key={p} className="mb-3 text-[#0b2038]/75">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="relative h-64 w-full overflow-hidden md:h-96">
        <Image src={aboutContent.banner.image} alt="First School" fill className="object-cover" />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <Reveal direction="right">
            <SectionTitle
              align="left"
              tagline={aboutContent.milestones.tagline}
              title={aboutContent.milestones.title}
            />
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {aboutContent.milestones.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[#0b2038]/80">
                  <CheckCircle2 size={18} className="shrink-0 text-brand-green" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal direction="left" delay={0.1} className="relative mx-auto aspect-square w-full max-w-md">
            <div
              className="accent-blob-1 absolute -bottom-4 left-0 h-28 w-36 -scale-x-100"
              style={{ backgroundColor: "#2390ff" }}
            />
            <Image
              src={aboutContent.milestones.images.main}
              alt="Development Milestones"
              fill
              className="rounded-full object-cover"
            />
            <Image
              src={aboutContent.milestones.images.secondary}
              alt="Development Milestones"
              width={150}
              height={150}
              className="absolute -bottom-4 -right-4 hidden rounded-full border-4 border-white object-cover shadow-lg sm:block"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
