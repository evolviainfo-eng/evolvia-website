"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, type Locale } from "@/i18n/config";

/* The page's language, for client components deep inside a demo site.
 *
 * Server components take `locale` as a prop. Client trees that would
 * otherwise thread it through five levels (a cart drawer inside a shop
 * provider inside a header) read it from here instead. DemoShell provides
 * it for every demo. Only the language code travels through context; each
 * component picks its own words from its demo's dictionary. */

const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
