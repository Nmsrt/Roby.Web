import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder thumbnails ship as local SVGs; safe to serve since they are
    // first-party assets. Swap to JPG/WebP and this can be removed.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    localPatterns: [
      // Avatar gets a ?v= mtime query for cache busting after /studio uploads
      { pathname: "/profile.jpg" },
      { pathname: "/thumbs/**" },
    ],
  },
};

export default nextConfig;
