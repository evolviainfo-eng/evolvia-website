import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site — export to plain HTML/CSS/JS for simple static hosting
  // (Netlify serves the `out/` directory; no Next runtime needed).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
