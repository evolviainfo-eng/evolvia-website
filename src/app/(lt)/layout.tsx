import type { Metadata, Viewport } from "next";
import { RootShell, rootViewport } from "@/components/views/RootShell";
import { rootMetadata } from "@/lib/seo";
import "../globals.css";

/* Root layout for the Lithuanian site, served at the root (/, /kainos …).
   The English site has its own root layout in app/en; see RootShell. */

export const metadata: Metadata = rootMetadata("lt");
export const viewport: Viewport = rootViewport;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale="lt">{children}</RootShell>;
}
