import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Demo sites are deliberately kept out of search.
 *
 *  They depict companies that do not exist. If Google indexed them, someone
 *  could land on "Konstrukta" from a search and take it for a real builder —
 *  which is exactly the misunderstanding the honesty bar exists to prevent.
 *  The demos are reachable only from /darbai, and robots.ts disallows /demo/. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: ReactNode }) {
  return children;
}
