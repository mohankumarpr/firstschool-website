import { eq, desc } from "drizzle-orm";
import { db } from "@/db/client";
import { blogPosts } from "@/db/schema";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  contentHtml: string;
}

export const BLOG_PAGE_SIZE = 9;

function toBlogPost(row: typeof blogPosts.$inferSelect): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.publishedDate,
    excerpt: row.excerpt,
    image: row.image,
    contentHtml: row.bodyHtml,
  };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const rows = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedDate));
  return rows.map(toBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const [row] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  return row ? toBlogPost(row) : undefined;
}

export async function getBlogPostById(id: number): Promise<BlogPost | undefined> {
  const [row] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
  return row ? toBlogPost(row) : undefined;
}
