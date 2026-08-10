"use client";

import Image from "next/image";

const LOGO = "/brand/logo-vert.png";

export function LogoGlitch() {
  return (
    <div className="logo-glitch">
      <span
        className="logo-channel logo-channel--r"
        aria-hidden="true"
        style={{ backgroundImage: `url(${LOGO})` }}
      />
      <span
        className="logo-channel logo-channel--g"
        aria-hidden="true"
        style={{ backgroundImage: `url(${LOGO})` }}
      />
      <Image
        src={LOGO}
        alt="White Beauty"
        width={1260}
        height={920}
        priority
        sizes="(max-width: 768px) 70vw, 420px"
        className="logo-vert"
      />
      <span
        className="logo-slice logo-slice--a"
        aria-hidden="true"
        style={{ backgroundImage: `url(${LOGO})` }}
      />
      <span
        className="logo-slice logo-slice--b"
        aria-hidden="true"
        style={{ backgroundImage: `url(${LOGO})` }}
      />
      <span
        className="logo-slice logo-slice--c"
        aria-hidden="true"
        style={{ backgroundImage: `url(${LOGO})` }}
      />
      <span className="logo-scan" aria-hidden="true" />
    </div>
  );
}
