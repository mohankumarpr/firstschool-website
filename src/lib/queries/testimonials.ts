import { asc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { testimonials } from "@/db/schema";

export interface Testimonial {
  id: number;
  name: string;
  content: string;
  sortOrder: number;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
}

export async function getTestimonialById(id: number): Promise<Testimonial | undefined> {
  const [row] = await db.select().from(testimonials).where(eq(testimonials.id, id));
  return row;
}
