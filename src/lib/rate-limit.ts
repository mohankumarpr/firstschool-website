import { and, eq, gte, lt, count } from "drizzle-orm";
import { db } from "@/db/client";
import { rateLimitHits } from "@/db/schema";

/**
 * Returns true if `key` is still under `limit` hits within the last `windowMinutes`,
 * and records this attempt. Returns false if the limit has already been reached —
 * callers should reject the request in that case *before* doing any expensive work
 * (e.g. bcrypt comparison), since the whole point is to stop CPU/resource exhaustion.
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowMinutes: number
): Promise<boolean> {
  const cutoff = new Date(Date.now() - windowMinutes * 60_000);

  // Opportunistic cleanup of this key's old hits so the table doesn't grow unbounded.
  await db.delete(rateLimitHits).where(and(eq(rateLimitHits.key, key), lt(rateLimitHits.createdAt, cutoff)));

  const [{ value: hits }] = await db
    .select({ value: count() })
    .from(rateLimitHits)
    .where(and(eq(rateLimitHits.key, key), gte(rateLimitHits.createdAt, cutoff)));

  if (hits >= limit) return false;

  await db.insert(rateLimitHits).values({ key });
  return true;
}
