import type { Metadata, Viewport } from "next";
import { SiteShell, siteViewport } from "@/components/site/SiteShell";
import { rootMetadata } from "@/lib/seo";

/* Root layout for the Lithuanian site (/, /paslaugos …). The demos have
   their own root layout in app/(demo). */
export const metadata: Metadata = rootMetadata("lt");
export const viewport: Viewport = siteViewport;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="lt">{children}</SiteShell>;
}
