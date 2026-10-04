import { notFound } from "next/navigation";
import { Field, TextAreaField } from "@/components/admin/Field";
import { getBlogPostById } from "@/lib/queries/blog";
import { updateBlogPost } from "../../actions";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(Number(id));
  if (!post) notFound();

  const update = updateBlogPost.bind(null, post.id);

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Edit blog post</h1>
      <form action={update} className="space-y-4">
        <Field label="Title" name="title" defaultValue={post.title} required />
        <Field label="Slug" name="slug" defaultValue={post.slug} required />
        <Field label="Published date" name="publishedDate" type="date" defaultValue={post.date} required />
        <Field label="Image path" name="image" defaultValue={post.image} />
        <TextAreaField label="Excerpt" name="excerpt" defaultValue={post.excerpt} required rows={3} />
        <TextAreaField label="Body (HTML)" name="bodyHtml" defaultValue={post.contentHtml} required rows={16} />
        <button
          type="submit"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Save
        </button>
      </form>
    </div>
  );
}
