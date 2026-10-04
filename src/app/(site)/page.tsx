import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { getHomePageContent } from "@/lib/queries/pages";
import { getPrograms } from "@/lib/queries/programs";
import { getCurriculum } from "@/lib/queries/curriculum";
import { getTestimonials } from "@/lib/queries/testimonials";
import { SectionTitle } from "@/components/SectionTitle";
import { ProgramCard } from "@/components/ProgramCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Carousel } from "@/components/Carousel";
import { FirstVisitAdmissionModal } from "@/components/FirstVisitAdmissionModal";
import { Reveal } from "@/components/Reveal";
import { HomeHero } from "@/components/HomeHero";
import { iconMap } from "@/lib/icon-map";
import { CURRICULUM_ACCENT_COLORS, PROGRAM_CARD_COLORS } from "@/lib/accent-colors";

export default async function HomePage() {
  const [homeContent, programs, curriculum, testimonials] = await Promise.all([
    getHomePageContent(),
    getPrograms(),
    getCurriculum(),
    getTestimonials(),
  ]);

  return (
    <>
      <FirstVisitAdmissionModal
        heading={homeContent.admissionModal.heading}
        image={homeContent.admissionModal.image}
      />

      <HomeHero />

      {/* About */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <Reveal direction="left" className="relative mx-auto aspect-square w-full max-w-md">
            <div
              className="accent-blob-1 absolute right-0 -bottom-4 h-28 w-36"
              style={{ backgroundColor: "#ffaa23" }}
            />
            <Image
              src={homeContent.about.images.main}
              alt="First School"
              fill
              className="rounded-full object-cover"
            />
            <Image
              src={homeContent.about.images.secondary}
              alt="First School"
              width={150}
              height={150}
              className="absolute -bottom-4 -left-4 hidden rounded-full border-4 border-white object-cover shadow-lg sm:block"
            />
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <SectionTitle align="left" title={homeContent.about.title} />
            <p className="text-[#0b2038]/75">{homeContent.about.text}</p>
          </Reveal>
        </div>
      </section>

      {/* A day at First School */}
      <section
        className="bg-brand-yellow-soft bg-size-[800px] bg-repeat py-16 md:py-24"
        style={{ backgroundImage: "url(/images/theme/shapes/service-bg-2.png)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle title={homeContent.dayAtFirstSchool.title} />
          <p className="mx-auto -mt-6 mb-10 max-w-2xl text-center text-[#0b2038]/70">
            {homeContent.dayAtFirstSchool.intro}
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {homeContent.dayAtFirstSchool.tiles.map((tile, i) => (
              <Reveal key={tile.title} delay={i * 0.1} className="flex flex-col items-center">
                <div
                  className="blob-frame flex w-56 items-center justify-center p-6"
                  style={{ backgroundColor: PROGRAM_CARD_COLORS[i % PROGRAM_CARD_COLORS.length] }}
                >
                  <div className="blob-photo relative h-32 w-32 overflow-hidden">
                    <Image src={tile.image} alt={tile.title} fill className="object-cover" />
                  </div>
                </div>
                <h3 className="mt-4 text-center text-lg font-bold text-[#0b2038]">{tile.title}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionTitle title={homeContent.whyUs.title} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeContent.whyUs.items.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal
                key={item.title}
                delay={(i % 3) * 0.1}
                className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-yellow-soft text-brand-orange">
                  <Icon size={24} />
                </span>
                <h3 className="font-bold text-[#0b2038]">{item.title}</h3>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Video / Excellence */}
      <section className="bg-[#0b2038] py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          <Reveal direction="left">
            <h2 className="text-2xl font-bold text-brand-yellow md:text-3xl">
              {homeContent.videoSection.title}
            </h2>
            <p className="mt-4 text-white/75">{homeContent.videoSection.text}</p>
          </Reveal>
          <Reveal delay={0.1} className="starburst-blob-photo relative mx-auto aspect-300/191 w-full max-w-lg">
            <Image
              src={homeContent.videoSection.image}
              alt={homeContent.videoSection.title}
              fill
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Safety grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeContent.safetyGrid.items.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal
                key={item.title}
                delay={(i % 3) * 0.1}
                className="rounded-2xl border border-black/5 p-6 text-center"
              >
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-yellow-soft text-brand-orange">
                  <Icon size={26} />
                </span>
                <h3 className="font-bold text-[#0b2038]">{item.title}</h3>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Activity Centres (curriculum preview) */}
      <section className="bg-brand-yellow-soft py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle title={homeContent.activityCentres.title} />
          <Carousel slidesPerView={{ base: 1, sm: 2, lg: 3 }}>
            {curriculum.map((item, i) => {
              const accent = CURRICULUM_ACCENT_COLORS[i % CURRICULUM_ACCENT_COLORS.length];
              return (
                <div key={item.slug} className="overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
                  <div className="pill-blob-photo relative h-48 w-full">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="pt-4">
                    <h3 className="mb-2 text-center text-lg font-bold text-[#0b2038]">{item.title}</h3>
                    <ul className="space-y-1">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-[#0b2038]/70">
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: accent }} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </section>

      {/* Why First School */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <Reveal className="rounded-blob-photo relative mx-auto aspect-555/573 w-full max-w-md">
            <Image
              src={homeContent.whyFirstSchool.image}
              alt={homeContent.whyFirstSchool.title}
              fill
              className="object-cover"
            />
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <SectionTitle
              align="left"
              tagline={homeContent.whyFirstSchool.tagline}
              title={homeContent.whyFirstSchool.title}
            />
            <ul className="space-y-3">
              {homeContent.whyFirstSchool.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-[#0b2038]/80">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-green" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Early Childhood Education focus */}
      <section className="bg-brand-yellow-soft py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          <Reveal direction="left">
            <SectionTitle
              align="left"
              tagline={homeContent.earlyChildhoodFocus.tagline}
              title={homeContent.earlyChildhoodFocus.title}
            />
            <div className="grid grid-cols-1 gap-3">
              {homeContent.earlyChildhoodFocus.boxes.map((box) => (
                <div
                  key={box}
                  className="flex items-center gap-2 rounded-xl bg-white px-5 py-4 font-semibold text-[#0b2038] shadow-sm"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-brand-green" />
                  {box}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <Image
              src={homeContent.earlyChildhoodFocus.image}
              alt={homeContent.earlyChildhoodFocus.title}
              width={520}
              height={420}
              className="rounded-2xl object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Programmes */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionTitle
          tagline={homeContent.programmesSection.tagline}
          title={
            <>
              {homeContent.programmesSection.titleLines[0]}
              <br />
              {homeContent.programmesSection.titleLines[1]}
            </>
          }
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, i) => (
            <Reveal key={program.slug} delay={i * 0.1}>
              <ProgramCard program={program} index={i} excerptWords={12} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
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
