import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { getGalleryItems } from "@/lib/queries/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse photos from First School's Annual Day, celebrations, activities and more.",
};

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems();

  return (
    <>
      <PageHeader title="Gallery" backgroundImage="/images/page-headers/gallery-photos.jpg" />
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 0.1}>
              <Link
                href={`/gallery/${item.slug}`}
                className="group block overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="wavy-card-photo relative h-56 w-full overflow-hidden">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="p-4 text-center text-lg font-bold text-[#0b2038]">{item.title}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
