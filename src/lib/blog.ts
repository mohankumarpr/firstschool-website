import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  contentHtml: string;
}

let cachedPosts: BlogPost[] | null = null;

export function getAllBlogPosts(): BlogPost[] {
  if (cachedPosts) return cachedPosts;

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: data.slug as string,
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      image: (data.image as string) || "",
      contentHtml: content,
    };
  });

  cachedPosts = posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return cachedPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}

export const BLOG_PAGE_SIZE = 9;
