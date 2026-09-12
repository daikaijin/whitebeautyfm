export const siteConfig = {
  name: "White Beauty",
  shortName: "WB",
  tagline: "Streetwear for the Digital Beach.",
  pitch: "Streetwear for the Digital Beach.",
  manifesto:
    "White Beauty Streetwear. Streetwear for everywhere. White is all colors. All people. Streetwear for humans. The Digital Beach isn't for everyone. The Digital Beach is for you.",
  description:
    "White Beauty Streetwear — Streetwear for the Digital Beach. White is all colors. All people. The Digital Beach is for you.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.whitebeautyfm.com",
  locale: "en_US",
  keywords: [
    "White Beauty",
    "White Beauty FM",
    "digital beach",
    "digital beach streetwear",
    "streetwear for the digital beach",
    "streetwear for everywhere",
    "streetwear for humans",
    "streetwear",
    "NFC drop",
    "Japan streetwear",
    "neon streetwear",
    "pins",
    "patches",
    "stickers",
    "Power and the Glory",
    "whitebeautyfm",
  ],
  social: {
    youtube: "https://www.youtube.com/@whitebeautyfm",
    youtubeVideo: "https://www.youtube.com/watch?v=q6wDttk7xJA",
    youtubeEmbed: "https://www.youtube.com/embed/q6wDttk7xJA?start=3342&rel=0",
    instagram: "https://www.instagram.com/whitebeautyfm/",
    handle: "@whitebeautyfm",
  },
  /** Assembled only via support-email helpers — do not paste a mailto here. */
  support: {
    label: "Beach Patrol",
    local: "beachpatrol",
    domain: "whitebeautyfm.com",
  },
  /** Google Analytics 4 measurement ID */
  gaId: "G-CPDTF0QMGJ",
  ogImage: {
    url: "/brand/og-halloween-3.jpg",
    width: 1200,
    height: 630,
    alt: "White Beauty — Streetwear for the Digital Beach. Make Halloween Scary Again sticker.",
  },
} as const;

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}
