import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { ContactForm } from "@/components/forms/ContactForm";
import { getContactPageContent } from "@/lib/queries/pages";
import { getSiteConfig } from "@/lib/queries/site-settings";

// Matches contact.php's per-map background colors exactly (cntmapc1-4, bgc1, bgc2) in location order.
const MAP_CARD_COLORS = ["#4fc287", "#22a9e3", "#fe341e", "#a700fe", "#56d32d"];

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with First School — Madipakkam, Manapakkam, Nanganallur, Velachery and Medavakkam.",
};

export default async function ContactPage() {
  const [contactContent, siteConfig] = await Promise.all([
    getContactPageContent(),
    getSiteConfig(),
  ]);

  return (
    <>
      <PageHeader title="Contact us" backgroundImage="/images/page-headers/contact-us.jpg" />

      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <SectionTitle
          tagline={contactContent.heading.tagline}
          title={
            <>
              {contactContent.heading.titleLines[0]} <br />
              {contactContent.heading.titleLines[1]}
            </>
          }
        />
        <ContactForm />
      </section>

      <section className="bg-brand-yellow-soft py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <Phone size={28} className="mx-auto mb-3 text-brand-orange" />
            <p className="text-sm text-[#0b2038]/70">{contactContent.info.phoneLabel}</p>
            <a href={siteConfig.phoneHref} className="text-xl font-bold text-[#0b2038]">
              {siteConfig.phoneDisplay}
            </a>
          </div>
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <Mail size={28} className="mx-auto mb-3 text-brand-blue" />
            <p className="text-sm text-[#0b2038]/70">{contactContent.info.emailLabel}</p>
            <a href={`mailto:${siteConfig.email}`} className="text-xl font-bold text-[#0b2038]">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {contactContent.locations.map((location, i) => (
            <div key={location.name} className="overflow-hidden rounded-2xl shadow-sm">
              <iframe
                src={location.mapEmbedUrl ?? undefined}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map to First School ${location.name}`}
              />
              <h4
                className="p-4 text-center font-bold text-white"
                style={{ backgroundColor: MAP_CARD_COLORS[i % MAP_CARD_COLORS.length] }}
              >
                {location.name}
              </h4>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
