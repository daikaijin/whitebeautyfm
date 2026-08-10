"use client";

import { useState, type SyntheticEvent } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { siteConfig } from "@/lib/site";

export function MixAccordion() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  function onToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    setOpen(event.currentTarget.open);
  }

  return (
    <section id="watch" className="mix-section" aria-label={t.mixKicker}>
      <details className="mix-accordion" onToggle={onToggle}>
        <summary className="mix-summary">
          <span className="mix-summary-kicker">{t.mixKicker}</span>
          <span className="mix-summary-title">{t.mixTitle}</span>
          <span className="mix-summary-hint" aria-hidden="true">
            {open ? "−" : "+"}
          </span>
        </summary>

        <div className="mix-panel">
          <p className="mix-copy">{t.mixCopy}</p>
          <p className="mix-copy mix-copy-secondary">
            {t.mixCopySecondary}{" "}
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              @whitebeautyfm
            </a>
          </p>

          <div className="mix-frame">
            {open ? (
              <iframe
                src={siteConfig.social.youtubeEmbed}
                title={`${siteConfig.name} — Power and the Glory mix`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : null}
          </div>
        </div>
      </details>
    </section>
  );
}
