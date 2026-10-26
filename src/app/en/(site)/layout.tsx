import type { Metadata, Viewport } from "next";
import { SiteShell, siteViewport } from "@/components/site/SiteShell";
import { rootMetadata } from "@/lib/seo";

/* Root layout for the English site, served under /en. */
export const metadata: Metadata = rootMetadata("en");
export const viewport: Viewport = siteViewport;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
