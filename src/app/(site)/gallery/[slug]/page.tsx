import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { getGalleryItemBySlug } from "@/lib/queries/gallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getGalleryItemBySlug(slug);
  if (!item) return {};
  return { title: item.title };
}

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getGalleryItemBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <PageHeader title={item.title} />
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <GalleryLightbox images={item.images} title={item.title} />
      </section>
    </>
  );
}
