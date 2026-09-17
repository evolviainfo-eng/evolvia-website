import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site — export to plain HTML/CSS/JS for simple static hosting
  // (Netlify serves the `out/` directory; no Next runtime needed).
  output: "export",
  images: { unoptimized: true },
  // Each language has its own root layout (app/(lt), app/en), so the 404 is
  // app/global-not-found.tsx: a whole document rather than a page inside a
  // layout. The export writes it once, as out/404.html.
  experimental: { globalNotFound: true },
};

export default nextConfig;
