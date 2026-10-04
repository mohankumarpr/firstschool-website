import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { db } from "./client";
import {
  programs as programsTable,
  curriculumItems,
  curriculumPoints,
  galleryItems,
  galleryImages,
  testimonials as testimonialsTable,
  navItems,
  locations as locationsTable,
  afterSchoolImages,
  siteSettings,
  pages,
  blogPosts,
} from "./schema";

import { programs } from "../content/programs";
import { curriculum } from "../content/curriculum";
import { galleryItems as galleryContent } from "../content/gallery";
import { testimonials } from "../content/testimonials";
import { mainNav } from "../content/nav";
import { siteConfig } from "../content/site";
import { afterSchoolActivities } from "../content/after-school-activities";
import { homeContent } from "../content/pages/home";
import { aboutContent } from "../content/pages/about";
import { contactContent } from "../content/pages/contact";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

async function seedPrograms() {
  await db.insert(programsTable).values(
    programs.map((p, i) => ({ ...p, sortOrder: i }))
  );
  console.log(`Seeded ${programs.length} programs`);
}

async function seedCurriculum() {
  for (const [i, item] of curriculum.entries()) {
    const [row] = await db
      .insert(curriculumItems)
      .values({ slug: item.slug, title: item.title, image: item.image, sortOrder: i })
      .returning({ id: curriculumItems.id });

    await db.insert(curriculumPoints).values(
      item.points.map((point, j) => ({ curriculumItemId: row.id, point, sortOrder: j }))
    );
  }
  console.log(`Seeded ${curriculum.length} curriculum items`);
}

async function seedGallery() {
  let totalImages = 0;
  for (const [i, item] of galleryContent.entries()) {
    const [row] = await db
      .insert(galleryItems)
      .values({
        slug: item.slug,
        title: item.title,
        coverImage: item.coverImage,
        sortOrder: i,
      })
      .returning({ id: galleryItems.id });

    await db.insert(galleryImages).values(
      item.images.map((url, j) => ({ galleryItemId: row.id, url, sortOrder: j }))
    );
    totalImages += item.images.length;
  }
  console.log(`Seeded ${galleryContent.length} gallery items, ${totalImages} images`);
}

async function seedTestimonials() {
  await db.insert(testimonialsTable).values(
    testimonials.map((t, i) => ({ ...t, sortOrder: i }))
  );
  console.log(`Seeded ${testimonials.length} testimonials`);
}

async function seedNav() {
  await db.insert(navItems).values(
    mainNav.map((n, i) => ({ ...n, sortOrder: i }))
  );
  console.log(`Seeded ${mainNav.length} nav items`);
}

async function seedLocations() {
  const embedByName = new Map(
    contactContent.locations.map((l) => [l.name.toLowerCase(), l.mapEmbedUrl])
  );

  await db.insert(locationsTable).values(
    siteConfig.locations.map((name, i) => ({
      slug: slugify(name),
      name,
      mapEmbedUrl: embedByName.get(name.toLowerCase()) ?? null,
      sortOrder: i,
    }))
  );
  console.log(`Seeded ${siteConfig.locations.length} locations`);
}

async function seedAfterSchoolImages() {
  await db.insert(afterSchoolImages).values(
    afterSchoolActivities.map((url, i) => ({ url, sortOrder: i }))
  );
  console.log(`Seeded ${afterSchoolActivities.length} after-school images`);
}

async function seedSiteSettings() {
  await db.insert(siteSettings).values({
    id: 1,
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    phoneDisplay: siteConfig.phoneDisplay,
    phoneHref: siteConfig.phoneHref,
    whatsappNumber: siteConfig.whatsappNumber,
    whatsappHref: siteConfig.whatsappHref,
    email: siteConfig.email,
    businessHours: siteConfig.businessHours,
    footerCreditText: siteConfig.footerCredit.text,
    footerCreditHref: siteConfig.footerCredit.href,
    social: siteConfig.social,
  });
  console.log("Seeded site settings");
}

async function seedPages() {
  await db.insert(pages).values([
    { slug: "home", title: "Home", data: homeContent },
    { slug: "about", title: "About", data: aboutContent },
    {
      slug: "contact",
      title: "Contact us",
      data: { heading: contactContent.heading, info: contactContent.info },
    },
  ]);
  console.log("Seeded 3 page-content rows (home, about, contact)");
}

async function seedBlogPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const rows = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: data.slug as string,
      title: data.title as string,
      excerpt: data.excerpt as string,
      image: (data.image as string) || "",
      bodyHtml: content,
      publishedDate: data.date as string,
    };
  });

  await db.insert(blogPosts).values(rows);
  console.log(`Seeded ${rows.length} blog posts`);
}

async function main() {
  console.log("Seeding database...");
  await seedPrograms();
  await seedCurriculum();
  await seedGallery();
  await seedTestimonials();
  await seedNav();
  await seedLocations();
  await seedAfterSchoolImages();
  await seedSiteSettings();
  await seedPages();
  await seedBlogPosts();
  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
