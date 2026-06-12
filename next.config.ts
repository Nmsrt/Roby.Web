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
    // Auto-derived video thumbnails
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "vumbnail.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
