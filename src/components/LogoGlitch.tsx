"use client";

import Image from "next/image";

const LOGO = "/brand/logo-vert.png";

function LogoLayer({
  className,
  alt = "",
}: {
  className: string;
  alt?: string;
}) {
  return (
    <Image
      src={LOGO}
      alt={alt}
      width={1260}
      height={920}
      priority
      aria-hidden={alt ? undefined : true}
      className={className}
    />
  );
}

export function LogoGlitch() {
  return (
    <div className="logo-glitch">
      <LogoLayer className="logo-channel logo-channel--r" />
      <LogoLayer className="logo-channel logo-channel--g" />
      <LogoLayer className="logo-vert" alt="White Beauty" />
      <LogoLayer className="logo-slice logo-slice--a" />
      <LogoLayer className="logo-slice logo-slice--b" />
      <LogoLayer className="logo-slice logo-slice--c" />
      <span className="logo-scan" aria-hidden="true" />
    </div>
  );
}
