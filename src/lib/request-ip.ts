import { headers } from "next/headers";

// These headers are only trustworthy because the deployment target (Vercel) sanitizes
// them at the edge, overwriting any client-supplied value before it reaches this app.
// If this app is ever deployed behind a different reverse proxy (e.g. a Hostinger VPS
// running Nginx), that proxy MUST be configured to overwrite — not append to — these
// headers with the real connecting IP (e.g. `proxy_set_header X-Forwarded-For $remote_addr;`),
// otherwise a client can forge this header and bypass IP-based rate limiting entirely.
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
