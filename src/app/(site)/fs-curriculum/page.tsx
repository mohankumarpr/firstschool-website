import Image from "next/image";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { getCurriculum } from "@/lib/queries/curriculum";
import { CURRICULUM_ACCENT_COLORS } from "@/lib/accent-colors";

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "First School's curriculum spans Language & Literacy, Music & Movement, Math & Science, Play Park, Art & Sensory and Social & Dramatics.",
};

export default async function CurriculumPage() {
  const curriculum = await getCurriculum();

  return (
    <>
      <PageHeader title="Curriculum" backgroundImage="/images/page-headers/fs-curriculum.jpg" />
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {curriculum.map((item, i) => {
            const accent = CURRICULUM_ACCENT_COLORS[i % CURRICULUM_ACCENT_COLORS.length];
            return (
              <Reveal
                key={item.slug}
                delay={(i % 3) * 0.1}
                className="overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
              >
                <div className="pill-blob-photo relative h-44 w-full">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="pt-4">
                  <h3 className="mb-3 text-center text-lg font-bold text-[#0b2038]">{item.title}</h3>
                  <ul className="space-y-1.5">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-[#0b2038]/70">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: accent }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
