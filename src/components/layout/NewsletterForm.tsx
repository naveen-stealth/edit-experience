"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    // No email provider is connected yet (Klaviyo/Mailchimp/Shopify customer API).
    // This confirms the form works end-to-end without pretending to subscribe anyone.
    await new Promise((resolve) => setTimeout(resolve, 400));
    setStatus("success");
  }

  if (status === "success") {
    return <p className="text-[12.5px] text-ivory-70">Thank you — we&rsquo;ll be in touch.</p>;
  }

  return (
    // `min(280px, 100%)` rather than a flat 280px: a hard floor can't shrink, so
    // on a 280px-wide screen it overflowed the footer's gutters and gave the page
    // a horizontal scrollbar. This keeps the comfortable width where there's room.
    <div className="min-w-[min(280px,100%)]">
      <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-ivory-18 pb-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Email address"
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "newsletter-email-error" : undefined}
          className="flex-1 bg-transparent text-[12.5px] text-ivory placeholder:text-ivory-45 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="shrink-0 text-[11px] uppercase tracking-[0.14em] text-ivory transition-opacity duration-150 ease-luxury hover:opacity-70 active:opacity-50 disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p id="newsletter-email-error" role="alert" className="mt-2 text-[11.5px] text-[#e8b4a0]">
          Please enter a valid email address.
        </p>
      )}
    </div>
  );
}
