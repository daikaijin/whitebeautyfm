import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const viewport: Viewport = {
  themeColor: "#050307",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Digital Beach Streetwear`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "fashion",
  classification: "Streetwear, music media, merch",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: [{ url: "/brand/icon.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Digital Beach Streetwear`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage.url,
        width: siteConfig.ogImage.width,
        height: siteConfig.ogImage.height,
        alt: siteConfig.ogImage.alt,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Digital Beach Streetwear`,
    description: siteConfig.description,
    images: [siteConfig.ogImage.url],
    creator: siteConfig.social.handle,
    site: siteConfig.social.handle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <head>
        <link rel="me" href={siteConfig.social.youtube} />
        <link rel="me" href={siteConfig.social.instagram} />
        <link rel="alternate" type="text/plain" href={absoluteUrl("/llms.txt")} title="llms.txt" />
      </head>
      <body className="min-h-full">
        <div className="noise" aria-hidden="true" />
        <div className="site-shell">{children}</div>
      </body>
    </html>
  );
}
