import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProgramCard } from "@/components/ProgramCard";
import { Reveal } from "@/components/Reveal";
import { getPrograms } from "@/lib/queries/programs";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore First School's programs: Play Group, Pre School, Kindergarten and Day Care, designed for every stage of early childhood.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <>
      <PageHeader title="Programs" backgroundImage="/images/page-headers/program.jpg" />
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <Reveal key={program.slug} delay={(i % 3) * 0.1}>
              <ProgramCard program={program} index={i} excerptWords={10} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
