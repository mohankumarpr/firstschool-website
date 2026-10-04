import { Field } from "@/components/admin/Field";
import { getSiteConfig } from "@/lib/queries/site-settings";
import { updateSiteSettings } from "./actions";

export default async function AdminSiteSettingsPage() {
  const settings = await getSiteConfig();

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">Site settings</h1>
      <form action={updateSiteSettings} className="space-y-4">
        <Field label="Site name" name="name" defaultValue={settings.name} required />
        <Field label="Tagline" name="tagline" defaultValue={settings.tagline} required />
        <Field label="Phone (display)" name="phoneDisplay" defaultValue={settings.phoneDisplay} required />
        <Field label="Phone (tel: href)" name="phoneHref" defaultValue={settings.phoneHref} required />
        <Field label="WhatsApp number" name="whatsappNumber" defaultValue={settings.whatsappNumber} required />
        <Field label="WhatsApp href" name="whatsappHref" defaultValue={settings.whatsappHref} required />
        <Field label="Email" name="email" defaultValue={settings.email} required />
        <Field label="Business hours" name="businessHours" defaultValue={settings.businessHours} required />
        <Field
          label="Footer credit text"
          name="footerCreditText"
          defaultValue={settings.footerCredit.text}
          required
        />
        <Field
          label="Footer credit href"
          name="footerCreditHref"
          defaultValue={settings.footerCredit.href}
          required
        />
        <Field label="Facebook URL" name="facebook" defaultValue={settings.social.facebook} />
        <Field label="YouTube URL" name="youtube" defaultValue={settings.social.youtube} />
        <Field label="Instagram URL" name="instagram" defaultValue={settings.social.instagram} />
        <Field label="Twitter URL" name="twitter" defaultValue={settings.social.twitter} />
        <p className="text-sm text-[#0b2038]/60">
          Location names shown in the topbar and admission form are managed under{" "}
          <a href="/admin/locations" className="text-brand-blue hover:underline">
            Locations
          </a>
          , not here.
        </p>
        <button
          type="submit"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Save
        </button>
      </form>
    </div>
  );
}
