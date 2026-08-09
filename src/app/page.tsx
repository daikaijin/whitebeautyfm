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
        </header>

        <section id="watch" className="section section-first" aria-label="Video">
          <h2 className="sr-only">Watch</h2>
          <div className="watch-stage">
            <div className="watch-meta">
              <span>Digital Beach</span>
              <span className="watch-meta-live">Signal Live</span>
            </div>
            <div className="watch-frame">
              <iframe
                src={siteConfig.social.youtubeEmbed}
                title={`${siteConfig.name} on YouTube`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <div className="watch-scanlines" aria-hidden="true" />
              <div className="watch-glow" aria-hidden="true" />
            </div>
            <div className="watch-colorbar" aria-hidden="true" />
          </div>
          <p className="brand-pitch">
            <span>Digital beach streetwear.</span>
          </p>
        </section>

        <section id="shop" className="section" aria-label="Merch">
          <h2 className="sr-only">Merch</h2>
          <p className="section-lede">
            <span>Limited drops from the digital beach —</span>
            <span>streetwear that keeps the signal hot.</span>
          </p>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section id="contact" className="section contact" aria-label="Contact">
          <p className="contact-kicker">Contact</p>
          <a
            className="contact-hit"
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer me"
          >
            <span className="contact-handle">{siteConfig.social.handle}</span>
            <span className="contact-line">DM for orders, drops, and finds</span>
          </a>
        </section>
      </main>
    </>
  );
}
