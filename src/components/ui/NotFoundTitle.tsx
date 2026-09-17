"use client";

import { useEffect } from "react";
import { splitLocale } from "@/i18n/config";

/** Keeps the 404's tab title and description in the address's language.
 *
 *  The head script sets them while the page parses, but hydration puts the
 *  server-rendered (default-language) title back about a tenth of a second
 *  later: the metadata in the RSC payload is the Lithuanian one, because the
 *  404 is a single file. So this re-applies the right text whenever <head>
 *  changes. Setting the same text again is a no-op, so it cannot loop. */
export function NotFoundTitle({
  titles,
  descriptions,
}: {
  titles: Record<string, string>;
  descriptions: Record<string, string>;
}) {
  useEffect(() => {
    const { locale } = splitLocale(window.location.pathname);
    const title = titles[locale];
    const description = descriptions[locale];
    if (!title) return;
    const apply = () => {
      if (document.title !== title) document.title = title;
      const meta = document.querySelector('meta[name="description"]');
      if (meta && description && meta.getAttribute("content") !== description) {
        meta.setAttribute("content", description);
      }
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.head, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
    });
    return () => observer.disconnect();
  }, [titles, descriptions]);
  return null;
}
