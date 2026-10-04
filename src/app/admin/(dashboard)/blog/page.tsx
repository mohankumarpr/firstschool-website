import Link from "next/link";
import { getAllBlogPosts } from "@/lib/queries/blog";
import { deleteBlogPost } from "./actions";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          + New post
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f5f6f8] text-xs uppercase text-[#0b2038]/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-black/5">
                <td className="px-4 py-3 font-medium">{post.title}</td>
                <td className="px-4 py-3 text-[#0b2038]/60">{post.slug}</td>
                <td className="px-4 py-3 text-[#0b2038]/60">{post.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/blog/${post.id}/edit`} className="text-brand-blue hover:underline">
                      Edit
                    </Link>
                    <form action={deleteBlogPost.bind(null, post.id)}>
                      <button type="submit" className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
