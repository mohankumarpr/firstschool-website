"use client";

import { useState } from "react";

const PROGRAM_OPTIONS = ["Play Group", "Pre School", "Jr Kg", "Sr Kg", "Day Care", "After School"];
const LOCATION_OPTIONS = ["Madipakkam", "Manapakkam", "Nanganallur", "Velachery", "Medavakkam"];

type Status = "idle" | "submitting" | "success" | "error";

export function AdmissionForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/admission-form", {
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
          Thank you! Your admission enquiry has been sent — our team will contact you shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded border border-[#eee] bg-white px-2.5 py-1.5 text-sm text-[#0b2038] outline-none focus:border-brand-orange";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <input name="parentName" required placeholder="Parent Name *" className={inputClass} />
      <input name="contactNo" required type="tel" placeholder="Contact No *" className={inputClass} />
      <input name="email" required type="email" placeholder="Email *" className={inputClass} />
      <input name="childName" required placeholder="Child Name *" className={inputClass} />
      <select name="program" required defaultValue="" className={inputClass}>
        <option value="" disabled>
          Program *
        </option>
        {PROGRAM_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <select name="location" required defaultValue="" className={inputClass}>
        <option value="" disabled>
          Location *
        </option>
        {LOCATION_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {status === "error" && (
        <p className="sm:col-span-2 text-sm font-medium text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="sm:col-span-2 mr-2.5 w-auto justify-self-start rounded-full bg-[#b20c0c] px-10 py-1.5 font-semibold text-white transition-colors hover:bg-[#b20c0c]/90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
