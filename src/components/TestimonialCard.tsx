import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/queries/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm">
      <p className="text-base leading-relaxed text-[#0b2038]/80">&ldquo;{testimonial.content}&rdquo;</p>
      <div className="mt-4 flex justify-center gap-1 text-brand-amber">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <h5 className="mt-3 text-base font-bold text-[#0b2038]">{testimonial.name}</h5>
    </div>
  );
}
