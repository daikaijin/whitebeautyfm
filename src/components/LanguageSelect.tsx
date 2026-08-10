"use client";

import { useLocale } from "@/components/LocaleProvider";
import { LOCALES, type Locale } from "@/lib/i18n";

export function LanguageSelect() {
  const { locale, setLocale } = useLocale();

  return (
    <label className="lang-select">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        aria-label="Language"
      >
        {LOCALES.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
