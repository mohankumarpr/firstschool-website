import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { getBlogPostBySlug } from "@/lib/queries/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PageHeader title={post.title} />
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {post.image && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-96">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <p className="mb-6 flex items-center gap-1.5 text-sm font-medium text-[#0b2038]/50">
          <CalendarDays size={14} />
          {new Date(post.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div
          className="prose prose-neutral max-w-none prose-headings:font-heading prose-a:text-brand-orange"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </>
  );
}
