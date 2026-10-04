import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Program } from "@/lib/queries/programs";
import { PROGRAM_CARD_COLORS } from "@/lib/accent-colors";

export function ProgramCard({
  program,
  index = 0,
  excerptWords,
}: {
  program: Program;
  index?: number;
  excerptWords?: number;
}) {
  const description = excerptWords
    ? program.description.split(" ").slice(0, excerptWords).join(" ") +
      (program.description.split(" ").length > excerptWords ? "..." : "")
    : program.description;

  const color = PROGRAM_CARD_COLORS[index % PROGRAM_CARD_COLORS.length];

  return (
    <div
      className="group overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-lg"
      style={{ backgroundColor: color }}
    >
      <div className="relative h-48 w-full overflow-hidden p-3">
        <div className="wavy-scallop-photo relative h-full w-full overflow-hidden">
          <Image
            src={program.image}
            alt={program.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="p-5 text-white">
        <h3 className="text-lg font-bold">
          <Link href={`/programs/${program.slug}`} className="hover:underline">
            {program.title}
          </Link>
        </h3>
        {program.age && <p className="mt-1 text-sm font-semibold">{program.age}</p>}
        <p className="mt-2 text-sm text-white/90">{description}</p>
        <Link
          href={`/programs/${program.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold hover:underline"
        >
          Learn more <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
