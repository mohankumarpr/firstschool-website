import { headers } from "next/headers";

function fromHeaders(get: (name: string) => string | null): string {
  const forwardedFor = get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIp = get("x-real-ip");
  if (realIp) return realIp.trim();

  return "unknown";
}

export function getClientIp(request: Request): string {
  return fromHeaders((name) => request.headers.get(name));
}

/** For Server Actions, which don't receive a raw Request object. */
export async function getClientIpFromRequestHeaders(): Promise<string> {
  const headerList = await headers();
  return fromHeaders((name) => headerList.get(name));
}
