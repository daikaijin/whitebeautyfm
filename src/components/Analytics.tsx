"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

export function Analytics() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteConfig.gaId}');
        `}
      </Script>
    </>
  );
}
