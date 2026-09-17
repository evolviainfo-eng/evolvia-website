import type { Metadata } from "next";

/** Shared by the demo layouts in both languages: never index a company that
 *  does not exist. No hreflang either — alternates are for pages that want
 *  to be found. */
export const demoLayoutMetadata: Metadata = {
  robots: { index: false, follow: false },
};
