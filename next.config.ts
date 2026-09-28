import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const adminHeaders = [
      {
        key: "Cache-Control",
        value: "private, no-store, max-age=0, must-revalidate",
      },
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
    ];
    return [
      { source: "/admin", headers: adminHeaders },
      { source: "/admin/:path*", headers: adminHeaders },
    ];
  },
};

export default nextConfig;
