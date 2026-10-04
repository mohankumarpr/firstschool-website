import Link from "next/link";
import { getTestimonials } from "@/lib/queries/testimonials";
import { deleteTestimonial } from "./actions";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          + New testimonial
        </Link>
      </div>

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-xl border border-black/10 bg-white p-4">
            <div className="mb-1 flex items-center justify-between">
              <p className="font-bold">{t.name}</p>
              <div className="flex items-center gap-3 text-sm">
                <Link href={`/admin/testimonials/${t.id}/edit`} className="text-brand-blue hover:underline">
                  Edit
                </Link>
                <form action={deleteTestimonial.bind(null, t.id)}>
                  <button type="submit" className="text-red-600 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </div>
            <p className="line-clamp-2 text-sm text-[#0b2038]/70">{t.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
