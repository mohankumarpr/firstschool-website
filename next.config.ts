import type { NextConfig } from "next";

// style-src allows 'unsafe-inline': React/Framer Motion set inline style properties
// directly via the DOM (element.style.x = ...), and blocking that outright risks
// silently breaking animations/colors in ways that don't show up in a build or
// type-check — only in a live browser. script-src stays strict since there are no
// inline <script> tags anywhere in this app (verified) and Next's own hydration
// payload is a <script type="application/json"> data island, not an executable script,
// so it isn't affected by a strict script-src.
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.google.com", // contact page's Google Maps embeds
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Browsers only honor this over HTTPS, so it's inert in local dev / plain HTTP.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

// CSP is production-only: Turbopack's dev server relies on eval and websocket
// connections for HMR that a strict policy would block, breaking local dev for no
// real security benefit (an attacker can't reach anyone's local dev server).
if (process.env.NODE_ENV === "production") {
  securityHeaders.push({ key: "Content-Security-Policy", value: cspDirectives });
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
