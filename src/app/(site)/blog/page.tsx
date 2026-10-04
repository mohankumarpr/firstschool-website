import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BlogGrid } from "@/components/BlogGrid";
import { getAllBlogPosts, BLOG_PAGE_SIZE } from "@/lib/queries/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Parenting and early-education articles from First School.",
};

export default async function BlogPage() {
  const allPosts = await getAllBlogPosts();
  const totalPages = Math.ceil(allPosts.length / BLOG_PAGE_SIZE);
  const posts = allPosts.slice(0, BLOG_PAGE_SIZE);

  return (
    <>
      <PageHeader title="Blog" backgroundImage="/images/page-headers/blog.jpg" backgroundPosition="top" />
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <BlogGrid posts={posts} currentPage={1} totalPages={totalPages} />
      </section>
    </>
  );
}
