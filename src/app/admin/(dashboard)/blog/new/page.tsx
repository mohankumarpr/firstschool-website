import { Field, TextAreaField } from "@/components/admin/Field";
import { createBlogPost } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">New blog post</h1>
      <form action={createBlogPost} className="space-y-4">
        <Field label="Title" name="title" required />
        <Field label="Slug" name="slug" required />
        <Field label="Published date" name="publishedDate" type="date" required />
        <Field label="Image path" name="image" />
        <TextAreaField label="Excerpt" name="excerpt" required rows={3} />
        <TextAreaField label="Body (HTML)" name="bodyHtml" required rows={16} />
        <button
          type="submit"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Create
        </button>
      </form>
    </div>
  );
}
