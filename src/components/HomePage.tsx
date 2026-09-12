"use client";

import { InstagramIcon } from "@/components/InstagramIcon";
import { LanguageSelect } from "@/components/LanguageSelect";
import { LogoGlitch } from "@/components/LogoGlitch";
import { Manifesto } from "@/components/Manifesto";
import { ProductCard } from "@/components/ProductCard";
import { ProtectedSupportEmail } from "@/components/ProtectedSupportEmail";
import { useLocale } from "@/components/LocaleProvider";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export function HomePage() {
  const { t } = useLocale();

  return (
    <main>
      <div className="page page-top">
        <div className="lang-bar">
          <LanguageSelect />
        </div>

        <header className="masthead">
          <div className="masthead-logo">
            <LogoGlitch />
            <h1 className="sr-only">
              {t.manifestoTitle}. {t.manifestoLine1} {t.manifestoLine2}{" "}
              {t.manifestoLine3} {t.manifestoLine4} {t.manifestoLine5}
            </h1>
          </div>
          <p className="section-lede masthead-lede">
            <span>{t.shopLede1}</span>
            <span>{t.shopLede2}</span>
          </p>
        </header>

        <section id="shop" className="section section-first" aria-label={t.merch}>
          <h2 className="sr-only">{t.merch}</h2>
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
      </div>

      <Manifesto />

      <div className="page">
        <section id="contact" className="section contact" aria-label={t.contact}>
          <div className="contact-bar">
            <p className="contact-kicker">{t.contact}</p>
            <p className="contact-line">{t.contactLine}</p>
            <div className="contact-chips">
              <a
                className="contact-chip"
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer me"
                aria-label="White Beauty on Instagram"
              >
                <InstagramIcon className="contact-chip-icon" />
                <span className="contact-chip-label">Instagram</span>
              </a>
              <ProtectedSupportEmail compact />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
