import type { Metadata } from "next";
import "../globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getNavItems } from "@/lib/queries/nav";
import { getSiteConfig } from "@/lib/queries/site-settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.firstschool.co.in"),
  title: {
    default: "First School",
    template: "%s | First School",
  },
  description:
    "First School is Chennai's most trusted pre-school chain, offering Play Group, Pre School, Kindergarten and Day Care programs across Madipakkam, Manapakkam, Nanganallur, Velachery and Medavakkam.",
  icons: {
    icon: "/images/theme/favicon.png",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [mainNav, siteConfig] = await Promise.all([getNavItems(), getSiteConfig()]);

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteHeader mainNav={mainNav} siteConfig={siteConfig} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
