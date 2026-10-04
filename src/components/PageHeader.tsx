import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

const WAVE_MASK =
  "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1920 43.5%22 fill=%22currentColor%22><path d=%22M1920 43.5V0C1880 0 1880 21.56 1839.99 21.56C1799.99 21.56 1799.99 0 1759.98 0C1719.98 0 1719.98 21.56 1679.98 21.56C1639.98 21.56 1639.98 0 1599.98 0C1559.98 0 1559.98 21.56 1519.98 21.56C1479.98 21.56 1479.98 0 1439.98 0C1399.98 0 1399.98 21.56 1359.98 21.56C1319.98 21.56 1319.98 0 1279.98 0C1239.98 0 1239.98 21.56 1199.98 21.56C1159.98 21.56 1159.98 0 1119.98 0C1079.98 0 1079.98 21.56 1039.98 21.56C999.98 21.56 999.98 0 959.99 0C919.99 0 919.99 21.56 879.99 21.56C839.99 21.56 839.99 0 799.99 0C759.99 0 759.99 21.56 719.99 21.56C679.99 21.56 679.99 0 639.99 0C599.99 0 599.99 21.56 559.99 21.56C519.99 21.56 519.99 0 479.99 0C439.99 0 439.99 21.56 399.99 21.56C359.99 21.56 359.99 0 319.99 0C279.99 0 279.99 21.56 239.99 21.56C200 21.56 200 0 160 0C120 0 120 21.56 80 21.56C40 21.56 40 0 7.62939e-06 0L0 43.5H1920Z%22/></svg>')";

export function PageHeader({
  title,
  backgroundImage,
  backgroundPosition = "center",
}: {
  title: string;
  backgroundImage?: string;
  backgroundPosition?: "center" | "top";
}) {
  return (
    <section className="relative overflow-hidden bg-[#0B2038] pt-[120px] pb-[120px] lg:pt-[151.5px] lg:pb-[166.5px]">
      {backgroundImage && (
        <div
          className={`absolute inset-0 bg-cover ${backgroundPosition === "top" ? "bg-top" : "bg-center"}`}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-[#0B2038]/40" />
      <div
        className="absolute inset-x-0 bottom-0 h-6 bg-white bg-repeat-x bg-bottom [mask-repeat:repeat-x] [mask-position:bottom_center]"
        style={{ WebkitMaskImage: WAVE_MASK, maskImage: WAVE_MASK }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <h1 className="text-[40px] font-bold text-white md:text-[50px]">{title}</h1>
        <nav
          aria-label="Breadcrumb"
          className="mt-3 flex items-center justify-center gap-2 text-base font-medium text-white/90 md:text-lg"
        >
          <Link href="/" className="flex items-center gap-1 hover:text-brand-yellow">
            <Home size={16} />
          </Link>
          <ChevronRight size={14} />
          <span>{title}</span>
        </nav>
      </div>
    </section>
  );
}
