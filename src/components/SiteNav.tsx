"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

export function SiteNav() {
  const { t } = useLocale();

  return (
    <nav className="site-nav" aria-label="Primary">
      <Link href="/#shop">{t.navShop}</Link>
      <Link href="/#manifesto">{t.navManifesto}</Link>
    </nav>
  );
}
