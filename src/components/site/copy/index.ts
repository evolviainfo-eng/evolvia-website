import type { Locale } from "@/i18n/config";
import { chrome } from "./chrome";

/* The shared frame's words. Each section keeps its own copy module next to
   this one (copy/<area>.ts) with an `lt` and an `en` entry. */
export function getCopy(locale: Locale) {
  return { chrome: chrome[locale] };
}
