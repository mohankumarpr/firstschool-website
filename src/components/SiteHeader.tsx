"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/lib/queries/nav";
import type { SiteConfig } from "@/lib/queries/site-settings";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "@/components/icons/SocialIcons";

const NAV_COLORS = ["#4fc287", "#22a9e3", "#ff7510", "#fe341e", "#a700fe"];
const NAV_ACTIVE_COLOR = "#5f7999";

export function SiteHeader({
  mainNav,
  siteConfig,
}: {
  mainNav: NavItem[];
  siteConfig: SiteConfig;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="bg-[#2390ff] text-white md:bg-[#0b2038]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 py-2 text-sm md:flex-row md:justify-between md:gap-4">
          <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4">
            <div className="flex items-center gap-3 text-white/90 md:text-white/80">
              <a href={siteConfig.social.twitter} aria-label="Twitter" className="hover:text-brand-yellow">
                <TwitterIcon size={15} />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-brand-yellow"
              >
                <FacebookIcon size={15} />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="Youtube"
                className="hover:text-brand-yellow"
              >
                <YoutubeIcon size={15} />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-brand-yellow"
              >
                <InstagramIcon size={15} />
              </a>
            </div>
            <p className="text-[11px] text-white/90 md:text-sm md:text-white/70">{siteConfig.businessHours}</p>
          </div>
          <p className="text-center text-[11px] font-medium tracking-wide text-white/90 md:text-sm">
            {siteConfig.locations.join(" | ")}
          </p>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/theme/logo-fs.png"
              alt="First School"
              width={140}
              height={56}
              priority
              className="h-12 w-auto md:h-14"
            />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-6 font-heading text-[16px]! font-semibold!">
              {mainNav.map((item, i) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      style={{ color: active ? NAV_ACTIVE_COLOR : NAV_COLORS[i % NAV_COLORS.length] }}
                      className="transition-colors hover:text-[#5f7999]!"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-[#0b2038] lg:hidden"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-72 flex-col bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <Image src="/images/theme/logo-fs.png" alt="First School" width={110} height={44} className="h-10 w-auto" />
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <ul className="flex flex-col gap-1">
              {mainNav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{ color: NAV_COLORS[i % NAV_COLORS.length] }}
                    className="block rounded-md px-2 py-3 font-heading text-[16px]! font-semibold! hover:bg-brand-yellow-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
