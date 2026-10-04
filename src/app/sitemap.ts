import type { MetadataRoute } from "next";
import { getPrograms } from "@/lib/queries/programs";
import { getGalleryItems } from "@/lib/queries/gallery";
import { getAllBlogPosts } from "@/lib/queries/blog";

const BASE_URL = "https://www.firstschool.co.in";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programs, galleryItems, blogPosts] = await Promise.all([
    getPrograms(),
    getGalleryItems(),
    getAllBlogPosts(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/program",
    "/fs-curriculum",
    "/admissions",
    "/after-school-club",
    "/gallery-photos",
    "/blog",
    "/contact-us",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const programRoutes = programs.map((p) => ({
    url: `${BASE_URL}/programs/${p.slug}`,
    lastModified: new Date(),
  }));

  const galleryRoutes = galleryItems.map((g) => ({
    url: `${BASE_URL}/gallery/${g.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...programRoutes, ...galleryRoutes, ...blogRoutes];
}
