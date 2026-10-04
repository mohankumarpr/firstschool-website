import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | First School Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#f5f6f8] text-[#0b2038]">{children}</body>
    </html>
  );
}
