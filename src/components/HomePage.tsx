"use client";

import { InstagramIcon } from "@/components/InstagramIcon";
import { LanguageSelect } from "@/components/LanguageSelect";
import { LogoGlitch } from "@/components/LogoGlitch";
import { MixAccordion } from "@/components/MixAccordion";
import { ProductCard } from "@/components/ProductCard";
import { useLocale } from "@/components/LocaleProvider";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export function HomePage() {
  const { t } = useLocale();

  return (
    <main className="page">
      <div className="lang-bar">
        <LanguageSelect />
      </div>

      <header className="logo-top">
        <div className="logo-aura" aria-hidden="true" />
        <LogoGlitch />
        <h1 className="sr-only">
          {siteConfig.name} — {siteConfig.tagline}. {t.brandPitch} NFC mixes are
          the fun intro — the brand is the merch.
        </h1>
        <p className="brand-pitch">
          <span>{t.brandPitch}</span>
        </p>
      </header>

      <section id="shop" className="section section-first" aria-label={t.merch}>
        <h2 className="sr-only">{t.merch}</h2>
        <p className="section-lede">
          <span>{t.shopLede1}</span>
          <span>{t.shopLede2}</span>
        </p>
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 2}
            />
          ))}
        </div>
      </section>

      <MixAccordion />

      <section id="contact" className="section contact" aria-label={t.contact}>
        <p className="contact-kicker">{t.contact}</p>
        <a
          className="contact-hit"
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label="White Beauty on Instagram"
        >
          <InstagramIcon className="contact-ig" />
          <span className="contact-handle">Instagram</span>
          <span className="contact-line">{t.contactLine}</span>
        </a>
      </section>
    </main>
  );
}
