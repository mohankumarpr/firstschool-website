import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BlogGrid } from "@/components/BlogGrid";
import { getAllBlogPosts, BLOG_PAGE_SIZE } from "@/lib/queries/blog";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = Number(page);
  const allPosts = await getAllBlogPosts();
  const totalPages = Math.ceil(allPosts.length / BLOG_PAGE_SIZE);

  if (!Number.isInteger(pageNum) || pageNum < 2 || pageNum > totalPages) notFound();

  const posts = allPosts.slice((pageNum - 1) * BLOG_PAGE_SIZE, pageNum * BLOG_PAGE_SIZE);

  return (
    <>
      <PageHeader title="Blog" backgroundImage="/images/page-headers/blog.jpg" backgroundPosition="top" />
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <BlogGrid posts={posts} currentPage={pageNum} totalPages={totalPages} />
      </section>
    </>
  );
}
