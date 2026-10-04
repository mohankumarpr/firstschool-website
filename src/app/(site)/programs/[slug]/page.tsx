import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { getPrograms, getProgramBySlug } from "@/lib/queries/programs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return {};
  return { title: program.title, description: program.description };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [program, programs] = await Promise.all([getProgramBySlug(slug), getPrograms()]);
  if (!program) notFound();

  return (
    <>
      <PageHeader title={program.title} />
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
            <div className="relative h-72 w-full sm:h-96">
              <Image src={program.image} alt={program.title} fill className="object-cover" />
            </div>
            <div className="p-6 sm:p-8">
              {program.age && (
                <span className="mb-3 inline-block rounded-full bg-brand-yellow-soft px-4 py-1 text-sm font-semibold text-brand-orange">
                  Age: {program.age}
                </span>
              )}
              <p className="text-[#0b2038]/75">{program.description}</p>
            </div>
          </div>

          <aside>
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-[#0b2038]">Categories</h2>
              <ul className="space-y-2">
                {programs.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/programs/${p.slug}`}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                        p.slug === program.slug
                          ? "bg-brand-orange text-white"
                          : "text-[#0b2038]/80 hover:bg-brand-yellow-soft"
                      }`}
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
