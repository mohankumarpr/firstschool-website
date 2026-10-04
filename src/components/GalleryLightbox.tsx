"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "@/components/Modal";

export function GalleryLightbox({ images, title }: { images: string[]; title: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const showPrev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const showNext = () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image, i) => (
          <button
            key={image}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <Image
              src={image}
              alt={`${title} photo ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Modal open={openIndex !== null} onOpenChange={(open) => !open && setOpenIndex(null)} maxWidthClassName="max-w-4xl">
        {openIndex !== null && (
          <div className="relative">
            <div className="relative h-[70vh] w-full">
              <Image
                src={images[openIndex]}
                alt={`${title} photo ${openIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0b2038] shadow"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0b2038] shadow"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}
