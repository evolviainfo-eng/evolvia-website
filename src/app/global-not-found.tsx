import type { Metadata, Viewport } from "next";
import { RootShell, rootViewport } from "@/components/views/RootShell";
import { NotFoundView } from "@/components/views/NotFoundView";
import { getDictionary } from "@/i18n";
import "./globals.css";

/* The site's one 404.
 *
 * Each language has its own root layout, so there is no single layout left
 * to compose a not-found page from; `global-not-found` (enabled in
 * next.config.ts) renders a whole document instead. A static export writes
 * it once, as out/404.html, and the host serves it for every missing path in
 * every language, which is why NotFoundView carries both.
 *
 * The title and description below are the default language's; the head
 * script swaps the tab title on /en/… addresses. */

const t = getDictionary("lt").pages.notFound;

export const metadata: Metadata = {
  title: `${t.metaTitle} · Evolvia`,
  description: t.metaDescription,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = rootViewport;

export default function GlobalNotFound() {
  return (
    <RootShell locale="lt" notFound>
      <NotFoundView />
    </RootShell>
  );
}
