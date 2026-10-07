"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-brand-green/10 p-6 text-center">
        <p className="text-lg font-semibold text-brand-green">
          Thank you for reaching out — we&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded bg-[#FAF5F2] px-[30px] py-4 text-base font-medium text-[#7E8185] outline-none focus:ring-2 focus:ring-brand-orange/40";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Honeypot — hidden from real users, left empty; bots that auto-fill every
          field tend to fill it, which marks the submission as spam server-side. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <input name="name" required placeholder="Name *" className={inputClass} />
      <input name="email" required type="email" placeholder="Email Id *" className={inputClass} />
      <input name="mobile" required type="tel" placeholder="Mobile No *" className={inputClass} />
      <input name="subject" placeholder="Subject" className={inputClass} />
      <textarea
        name="message"
        rows={5}
        placeholder="Message"
        className={`${inputClass} sm:col-span-2`}
      />

      {status === "error" && (
        <p className="sm:col-span-2 text-sm font-medium text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="sm:col-span-2 w-auto justify-self-start rounded bg-brand-orange px-[50px] py-2 font-semibold text-white transition-colors hover:bg-[#222] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
