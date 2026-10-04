import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { getNavItems } from "@/lib/queries/nav";
import { getSiteConfig } from "@/lib/queries/site-settings";
import { getPrograms } from "@/lib/queries/programs";
import { getCurriculum } from "@/lib/queries/curriculum";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/icons/SocialIcons";

export async function SiteFooter() {
  const [mainNav, siteConfig, programs, curriculum] = await Promise.all([
    getNavItems(),
    getSiteConfig(),
    getPrograms(),
    getCurriculum(),
  ]);

  return (
    <>
      <WhatsAppButton href={siteConfig.whatsappHref} />
      <footer className="bg-[#0A85DF] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <Image
              src="/images/theme/footer-logo.png"
              alt="First School"
              width={160}
              height={64}
              className="mb-5 h-14 w-auto"
            />
            <ul className="space-y-2 text-sm text-white">
              {siteConfig.locations.map((loc) => (
                <li key={loc} className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#f3ff00]" />
                  {loc}
                </li>
              ))}
              <li className="flex items-center gap-2 pt-1">
                <Phone size={15} className="text-[#f3ff00]" />
                <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-[#f3ff00]" />
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-3">
              <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-[#f3ff00]">
                <FacebookIcon size={17} />
              </a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" aria-label="Youtube" className="hover:text-[#f3ff00]">
                <YoutubeIcon size={17} />
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#f3ff00]">
                <InstagramIcon size={17} />
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-white">Programs</h2>
            <ul className="space-y-2 text-sm text-white">
              {programs.map((p) => (
                <li key={p.slug}>
                  <Link href={`/programs/${p.slug}`} className="hover:text-[#f3ff00]">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-white">Curriculum</h2>
            <ul className="space-y-2 text-sm text-white">
              {curriculum.map((c) => (
                <li key={c.slug}>
                  <Link href="/fs-curriculum" className="hover:text-[#f3ff00]">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-white">Links</h2>
            <ul className="space-y-2 text-sm text-white">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#f3ff00]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 text-center text-sm text-white">
          &copy; Copyright {new Date().getFullYear()} by FirstSchool. Developed by{" "}
          <a href={siteConfig.footerCredit.href} target="_blank" rel="noreferrer" className="text-[#f3ff00] hover:underline">
            Innov Touch Technologies Pvt Ltd
          </a>
        </div>
      </footer>
    </>
  );
}
