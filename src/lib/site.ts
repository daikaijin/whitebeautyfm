export const siteConfig = {
  name: "White Beauty",
  shortName: "WB",
  tagline: "Power and the Glory",
  pitch: "Digital beach streetwear.",
  description:
    "White Beauty — digital beach streetwear. Power and the Glory. Limited merch drops.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.whitebeautyfm.com",
  locale: "en_US",
  keywords: [
    "White Beauty",
    "White Beauty FM",
    "digital beach",
    "digital beach streetwear",
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
  ogImage: {
    url: "/brand/og.jpg",
    width: 1200,
    height: 630,
    alt: "White Beauty — digital beach streetwear, Power and the Glory",
  },
} as const;

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}
