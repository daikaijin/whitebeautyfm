"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { supportEmailAddress, supportMailto } from "@/lib/support-email";

/**
 * Spam-resistant support contact:
 * - No mailto / full address in initial HTML
 * - Address only assembled after a user click
 * - Honeypot field traps dumb bots that fill every input
 */
export function ProtectedSupportEmail() {
  const { t } = useLocale();
  const [revealed, setRevealed] = useState(false);
  const [address, setAddress] = useState("");

  function revealAndMail() {
    // Honeypot: if filled, abort quietly.
    const trap = document.getElementById(
      "wb-support-company",
    ) as HTMLInputElement | null;
    if (trap?.value) return;

    const email = supportEmailAddress();
    setAddress(email);
    setRevealed(true);
    window.location.href = supportMailto(t.supportMailSubject);
  }

  return (
    <div className="contact-hit contact-hit-email">
      <input
        id="wb-support-company"
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="contact-honeypot"
      />

      <button
        type="button"
        className="contact-email-btn"
        onClick={revealAndMail}
        aria-label={t.supportAria}
      >
        <span className="contact-mail-icon" aria-hidden="true">
          @
        </span>
        <span className="contact-handle">{t.supportHandle}</span>
        <span className="contact-line">{t.supportLine}</span>
        {revealed && address ? (
          <span className="contact-email-revealed">{address}</span>
        ) : (
          <span className="contact-email-hint">{t.supportReveal}</span>
        )}
      </button>
    </div>
  );
}
