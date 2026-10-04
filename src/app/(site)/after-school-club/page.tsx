import Image from "next/image";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { getAfterSchoolImages } from "@/lib/queries/after-school";

export const metadata: Metadata = {
  title: "After School Club",
  description: "First School's After School Club keeps kids engaged, safe and learning beyond the school day.",
};

export default async function AfterSchoolClubPage() {
  const afterSchoolActivities = await getAfterSchoolImages();

  return (
    <>
      <PageHeader
        title="After School Club"
        backgroundImage="/images/page-headers/after-school-club.jpg"
        backgroundPosition="top"
      />
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {afterSchoolActivities.map((image, i) => (
            <Reveal key={image} delay={(i % 4) * 0.1} className="flex justify-center">
              <div className="petal-blob-photo relative h-56 w-56">
                <Image src={image} alt={`After School Club activity ${i + 1}`} fill className="object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
