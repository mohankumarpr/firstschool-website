"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/Modal";
import { AdmissionForm } from "@/components/forms/AdmissionForm";

export function FirstVisitAdmissionModal({
  heading,
  image,
}: {
  heading: string;
  image: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("firstVisit")) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from localStorage on mount, by design
        setOpen(true);
        localStorage.setItem("firstVisit", "true");
      }
    } catch {
      // localStorage unavailable (private browsing etc.) — skip the popup
    }
  }, []);

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      closeButtonClassName="bg-[#ff5722] text-white hover:bg-[#ff5722]/90"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-center text-2xl font-bold text-[#c32128]">
            {heading}
          </h2>
          <AdmissionForm />
        </div>
        <div className="hidden md:block">
          <Image
            src={image}
            alt="Admissions open at First School"
            width={480}
            height={480}
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </Modal>
  );
}
