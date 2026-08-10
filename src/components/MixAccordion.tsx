"use client";

import { useState, type SyntheticEvent } from "react";
import { siteConfig } from "@/lib/site";

export function MixAccordion() {
  const [open, setOpen] = useState(false);

  function onToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    setOpen(event.currentTarget.open);
  }

  return (
    <section id="watch" className="mix-section" aria-label="The mix">
      <details className="mix-accordion" onToggle={onToggle}>
        <summary className="mix-summary">
          <span className="mix-summary-kicker">The mix</span>
          <span className="mix-summary-title">
            Power and the Glory — open the signal
          </span>
          <span className="mix-summary-hint" aria-hidden="true">
            {open ? "−" : "+"}
          </span>
        </summary>

        <div className="mix-panel">
          <p className="mix-copy">
            The mix is how people find White Beauty — NFC taps, late-night plays,
            the cut that starts the story. It exists to pull you into the brand:
            digital beach streetwear, limited drops, pins, patches, stickers, and
            the pieces that keep the signal hot after the track ends.
          </p>
          <p className="mix-copy mix-copy-secondary">
            Hit play, then shop the merch.{" "}
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
