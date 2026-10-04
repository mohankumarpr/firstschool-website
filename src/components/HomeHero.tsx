import Image from "next/image";
import Link from "next/link";
import { getHomePageContent } from "@/lib/queries/pages";

const SHAPES = "/images/theme/shapes";

export async function HomeHero() {
  const homeContent = await getHomePageContent();

  return (
    <section className="relative min-h-125 overflow-hidden bg-[#ffff00] md:min-h-162.5">
      {/* Full-bleed decorative layer, independent of the text column width */}
      <div className="pointer-events-none absolute inset-0">
        <svg
          viewBox="0 0 1010 627"
          className="hero-blob-shape absolute right-0 bottom-0 h-auto w-200 opacity-90 md:w-275 xl:w-250"
          aria-hidden
        >
          <path d="M411.036 177.238C408.943 185.837 407.401 194.712 406.52 203.751C402.334 247.352 406.52 291.89 396.385 334.499C386.25 377.108 356.508 419.441 313.27 426.055C266.342 433.221 225.143 397.502 181.575 378.706C124.419 354.048 25.2223 366.83 1.01068 499.885C-5.37857 534.997 19.8596 595.003 39.1375 624.989C111.622 737.767 133.876 662.58 228.833 746.144C268.931 781.476 307.596 822.983 360.528 838.472C449.151 864.324 518.057 793.217 589.991 755.128C657.574 719.355 735.897 719.575 810.365 718.087C849.527 717.315 888.028 712.465 926.914 710.425C958.695 708.772 989.981 715.607 1010.97 683.912C1025.4 662.139 1026.66 633.752 1020.5 608.396C1014.33 583.04 1001.49 559.889 989.154 536.904C948.671 461.498 911.271 382.344 901.247 297.292C897.281 263.503 897.667 229.162 891.057 195.814C876.461 122.282 825.898 56.7984 758.535 24.0564C691.173 -8.68552 608.497 -7.96895 541.74 25.9857C479.996 57.4048 427.45 110.156 411.036 177.238Z" />
        </svg>

        <Image
          src={`${SHAPES}/booth-cropped.png`}
          alt=""
          width={300}
          height={600}
          priority
          className="absolute right-[14%] bottom-0 hidden h-[85%] w-auto drop-shadow-xl sm:block md:h-[90%]"
        />

        <Image
          src={`${SHAPES}/slider-2-shape-6.png`}
          alt=""
          width={70}
          height={70}
          className="animate-gentle-float absolute top-[22%] right-0 hidden opacity-80 lg:block"
          style={{ animationDelay: "1.5s" }}
        />
        <Image
          src={`${SHAPES}/slider-2-shape-1.png`}
          alt=""
          width={90}
          height={90}
          className="animate-gentle-float absolute top-[42%] left-[4%] hidden lg:block"
        />
        <Image
          src={`${SHAPES}/slider-2-shape-2.png`}
          alt=""
          width={80}
          height={90}
          className="animate-gentle-float absolute bottom-[8%] left-[8%] hidden lg:block"
          style={{ animationDelay: "1s" }}
        />
        <Image
          src={`${SHAPES}/slider-2-shape-3.png`}
          alt=""
          width={70}
          height={70}
          className="animate-gentle-float absolute bottom-[15%] left-[42%] hidden lg:block"
          style={{ animationDelay: "0.5s" }}
        />
        <Image
          src={`${SHAPES}/slider-2-shape-5.png`}
          alt=""
          width={80}
          height={90}
          className="animate-gentle-float absolute right-[6%] bottom-[4%] hidden lg:block"
          style={{ animationDelay: "0.8s" }}
        />
        <Image
          src={`${SHAPES}/slider-2-shape-4.png`}
          alt=""
          width={60}
          height={60}
          className="animate-gentle-float absolute right-[38%] bottom-[22%] hidden opacity-80 lg:block"
          style={{ animationDelay: "1.2s" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center px-6 py-16 md:py-24">
        {/* Mobile-only booth image, shown inline instead of the absolute full-bleed one */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl font-bold leading-tight text-[#0b2038] md:text-6xl">
            {homeContent.hero.titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <Link
            href="/admissions"
            className="mt-8 inline-block rounded-full bg-[#0b2038] px-8 py-3 font-semibold text-brand-yellow hover:opacity-90"
          >
            Enquire Now
          </Link>
          <Image
            src={`${SHAPES}/booth-cropped.png`}
            alt="First School — Play, Explore, Learn"
            width={300}
            height={600}
            className="mx-auto mt-10 w-40 drop-shadow-xl sm:hidden"
          />
        </div>
      </div>
    </section>
  );
}
