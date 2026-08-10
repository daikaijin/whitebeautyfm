import { InstagramIcon } from "@/components/InstagramIcon";
import { JsonLd } from "@/components/JsonLd";
import { LogoGlitch } from "@/components/LogoGlitch";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <>
      <JsonLd />
      <main className="page">
        <header className="logo-top">
          <div className="logo-aura" aria-hidden="true" />
          <LogoGlitch />
          <h1 className="sr-only">
            {siteConfig.name} — {siteConfig.tagline}. Digital beach streetwear.
            NFC mixes are the fun intro — the brand is the merch.
          </h1>
          <p className="brand-pitch">
            <span>Digital beach streetwear.</span>
          </p>
        </header>

        <section id="shop" className="section section-first" aria-label="Merch">
          <h2 className="sr-only">Merch</h2>
          <p className="section-lede">
            <span>Limited drops from the digital beach —</span>
            <span>streetwear that keeps the signal hot.</span>
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

        <section id="watch" className="section watch-secondary" aria-label="Video">
          <h2 className="sr-only">Watch</h2>
          <div className="watch-stage">
            <div className="watch-meta">
              <span>Also on YouTube</span>
              <a
                className="watch-meta-link"
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                @whitebeautyfm
              </a>
            </div>
            <div className="watch-frame">
              <iframe
                src={siteConfig.social.youtubeEmbed}
                title={`${siteConfig.name} on YouTube`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section id="contact" className="section contact" aria-label="Contact">
          <p className="contact-kicker">Contact</p>
          <a
            className="contact-hit"
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label="White Beauty on Instagram"
          >
            <InstagramIcon className="contact-ig" />
            <span className="contact-handle">Instagram</span>
            <span className="contact-line">
              We’re here — orders, drops, video, photo
            </span>
          </a>
        </section>
      </main>
    </>
  );
}
