import type { ReactNode } from "react";
import { demoLayoutMetadata } from "@/components/demo/demoMetadata";

/** Demo sites are deliberately kept out of search.
 *
 *  They depict companies that do not exist. If Google indexed them, someone
 *  could land on "Konstrukta" from a search and take it for a real builder —
 *  which is exactly the misunderstanding the honesty bar exists to prevent.
 *  The demos are reachable only from /darbai; see robots.ts for why /demo/
 *  is NOT disallowed there. */
export const metadata = demoLayoutMetadata;

export default function DemoLayout({ children }: { children: ReactNode }) {
  return children;
}
