import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  age: text("age").notNull().default(""),
  description: text("description").notNull(),
  image: text("image").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const curriculumItems = pgTable("curriculum_items", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const curriculumPoints = pgTable("curriculum_points", {
  id: serial("id").primaryKey(),
  curriculumItemId: integer("curriculum_item_id")
    .notNull()
    .references(() => curriculumItems.id, { onDelete: "cascade" }),
  point: text("point").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  coverImage: text("cover_image").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  galleryItemId: integer("gallery_item_id")
    .notNull()
    .references(() => galleryItems.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const navItems = pgTable("nav_items", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  href: text("href").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  mapEmbedUrl: text("map_embed_url"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const afterSchoolImages = pgTable("after_school_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export interface SiteSettingsSocial {
  facebook: string;
  youtube: string;
  instagram: string;
  twitter: string;
}

export const siteSettings = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  phoneDisplay: text("phone_display").notNull(),
  phoneHref: text("phone_href").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  whatsappHref: text("whatsapp_href").notNull(),
  email: text("email").notNull(),
  businessHours: text("business_hours").notNull(),
  footerCreditText: text("footer_credit_text").notNull(),
  footerCreditHref: text("footer_credit_href").notNull(),
  social: jsonb("social").$type<SiteSettingsSocial>().notNull(),
});

export type PageSlug = "home" | "about" | "contact";

export const pages = pgTable("pages", {
  slug: text("slug").$type<PageSlug>().primaryKey(),
  title: text("title").notNull(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  image: text("image").notNull().default(""),
  bodyHtml: text("body_html").notNull(),
  publishedDate: text("published_date").notNull(),
});

export const admissionEnquiries = pgTable("admission_enquiries", {
  id: serial("id").primaryKey(),
  parentName: text("parent_name").notNull(),
  contactNo: text("contact_no").notNull(),
  email: text("email").notNull(),
  childName: text("child_name").notNull(),
  program: text("program").notNull(),
  location: text("location").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactEnquiries = pgTable("contact_enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  mobile: text("mobile").notNull(),
  subject: text("subject").notNull().default(""),
  message: text("message").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
