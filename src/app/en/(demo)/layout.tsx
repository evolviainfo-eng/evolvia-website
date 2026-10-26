import type { Metadata, Viewport } from "next";
import { RootShell, rootViewport } from "@/components/views/RootShell";
import { rootMetadata } from "@/lib/seo";
import "../../globals.css";

/* Root layout for the English site, served under /en. Every page here is
   the same view as its Lithuanian counterpart, rendered with locale "en". */

export const metadata: Metadata = rootMetadata("en");
export const viewport: Viewport = rootViewport;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale="en">{children}</RootShell>;
}
