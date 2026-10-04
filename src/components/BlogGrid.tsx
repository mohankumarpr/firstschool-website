import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import type { BlogPost } from "@/lib/queries/blog";

export function BlogGrid({
  posts,
  currentPage,
  totalPages,
}: {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-lg"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="wavy-card-photo relative block h-48 w-full overflow-hidden bg-brand-yellow-soft"
            >
              {post.image && <Image src={post.image} alt={post.title} fill className="object-cover" />}
            </Link>
            <div className="p-5">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-[#0b2038]/50">
                <CalendarDays size={13} />
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h3 className="mb-2 text-lg font-bold leading-snug text-[#0b2038]">
                <Link href={`/blog/${post.slug}`} className="hover:text-brand-orange">
                  {post.title}
                </Link>
              </h3>
              <p className="line-clamp-3 text-sm text-[#0b2038]/70">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const href = pageNum === 1 ? "/blog" : `/blog/page/${pageNum}`;
            const active = pageNum === currentPage;
            return (
              <Link
                key={pageNum}
                href={href}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                  active ? "bg-brand-orange text-white" : "bg-white text-[#0b2038] hover:bg-brand-yellow-soft"
                }`}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
