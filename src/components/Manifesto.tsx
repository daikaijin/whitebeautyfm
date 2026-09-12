"use client";

import { useLocale } from "@/components/LocaleProvider";

export function Manifesto() {
  const { t } = useLocale();

  return (
    <section
      id="manifesto"
      className="manifesto"
      aria-labelledby="manifesto-title"
    >
      <p className="manifesto-mark" id="manifesto-title">
        {t.manifestoTitle}
      </p>
      <div className="manifesto-stack">
        <p className="manifesto-line">{t.manifestoLine1}</p>
        <p className="manifesto-line">{t.manifestoLine2}</p>
        <p className="manifesto-line">{t.manifestoLine3}</p>
        <p className="manifesto-line is-turn">{t.manifestoLine4}</p>
        <p className="manifesto-line is-you">{t.manifestoLine5}</p>
      </div>
    </section>
  );
}
