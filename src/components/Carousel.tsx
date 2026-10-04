"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Carousel({
  children,
  slidesPerView = { base: 1, md: 1 },
  showArrows = true,
  showDots = true,
  loop = true,
  className = "",
}: {
  children: React.ReactNode[];
  slidesPerView?: { base: number; sm?: number; md?: number; lg?: number };
  showArrows?: boolean;
  showDots?: boolean;
  loop?: boolean;
  className?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing local state from the Embla instance, the recommended pattern per Embla's own docs
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const SM_BASIS: Record<number, string> = { 1: "sm:basis-full", 2: "sm:basis-1/2", 3: "sm:basis-1/3", 4: "sm:basis-1/4" };
  const MD_BASIS: Record<number, string> = { 1: "md:basis-full", 2: "md:basis-1/2", 3: "md:basis-1/3", 4: "md:basis-1/4" };
  const LG_BASIS: Record<number, string> = { 1: "lg:basis-full", 2: "lg:basis-1/2", 3: "lg:basis-1/3", 4: "lg:basis-1/4" };

  const basisClass = [
    "basis-full",
    slidesPerView.sm ? SM_BASIS[slidesPerView.sm] : "",
    slidesPerView.md ? MD_BASIS[slidesPerView.md] : "",
    slidesPerView.lg ? LG_BASIS[slidesPerView.lg] : "",
  ].join(" ");

  return (
    <div className={className}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex">
          {children.map((child, i) => (
            <div className={`${basisClass} shrink-0 grow-0 pl-4`} key={i}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        {showArrows && (
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#0b2038] hover:bg-brand-yellow-soft"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        {showDots && (
          <div className="flex items-center gap-2">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === selectedIndex ? "bg-brand-orange" : "bg-black/15"
                }`}
              />
            ))}
          </div>
        )}
        {showArrows && (
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#0b2038] hover:bg-brand-yellow-soft"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
