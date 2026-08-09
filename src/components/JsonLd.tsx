import { productImage, products } from "@/lib/products";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function JsonLd() {
  const organization = {
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    alternateName: ["WB", "White Beauty FM", "whitebeautyfm"],
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    logo: absoluteUrl("/brand/icon.png"),
    image: absoluteUrl(siteConfig.ogImage.url),
    sameAs: [siteConfig.social.youtube, siteConfig.social.instagram],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: siteConfig.social.instagram,
      availableLanguage: ["English", "Japanese"],
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": absoluteUrl("/#organization") },
  };

  const video = {
    "@type": "VideoObject",
    "@id": absoluteUrl("/#video"),
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    description:
      "Official White Beauty drop film from the digital beach. Featured on the NFC card landing page.",
    thumbnailUrl: [absoluteUrl(siteConfig.ogImage.url)],
    embedUrl: siteConfig.social.youtubeEmbed,
    contentUrl: siteConfig.social.youtubeVideo,
    publisher: { "@id": absoluteUrl("/#organization") },
  };

  const itemList = {
    "@type": "ItemList",
    "@id": absoluteUrl("/#merch"),
    name: "White Beauty digital beach streetwear merch",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "@id": absoluteUrl(`/#product-${product.id}`),
        name: product.name,
        description: product.description,
        image: absoluteUrl(productImage(product)),
        brand: { "@id": absoluteUrl("/#organization") },
        category: product.category,
        offers: {
          "@type": "Offer",
          url: absoluteUrl("/#shop"),
          priceCurrency: "JPY",
          price: product.priceYen,
          availability:
            product.status === "available"
              ? "https://schema.org/InStock"
              : product.status === "pre_order"
                ? "https://schema.org/PreOrder"
                : "https://schema.org/SoldOut",
          seller: { "@id": absoluteUrl("/#organization") },
        },
      },
    })),
  };

  const webpage = {
    "@type": "WebPage",
    "@id": absoluteUrl("/#webpage"),
    url: siteConfig.url,
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl("/#organization") },
    primaryImageOfPage: absoluteUrl(siteConfig.ogImage.url),
    mainEntity: [{ "@id": absoluteUrl("/#video") }, { "@id": absoluteUrl("/#merch") }],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, webpage, video, itemList],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
