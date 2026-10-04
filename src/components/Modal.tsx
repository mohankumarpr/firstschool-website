"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function Modal({
  open,
  onOpenChange,
  children,
  maxWidthClassName = "max-w-3xl",
  closeButtonClassName = "bg-black/5 text-[#0b2038] hover:bg-black/10",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  maxWidthClassName?: string;
  closeButtonClassName?: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/60 data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          className={`fixed left-1/2 top-1/2 z-[71] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl ${maxWidthClassName} max-h-[90vh] overflow-y-auto`}
        >
          <Dialog.Title className="sr-only">Dialog</Dialog.Title>
          <Dialog.Close
            aria-label="Close"
            className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full ${closeButtonClassName}`}
          >
            <X size={18} />
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
