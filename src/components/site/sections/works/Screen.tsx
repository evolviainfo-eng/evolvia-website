import type { Locale } from "@/i18n/config";
import s from "../Works.module.css";

/* A window's screen: the demo's real first screen, still, in the page's
   language (the English shots end in -en). The window links to the live
   demo. */
export function Screen({ slug, locale }: { slug: string; locale: Locale }) {
  const suffix = locale === "en" ? "-en" : "";
  return (
    <img
      className={s.media}
      src={`/work/shot-${slug}${suffix}.webp`}
      width={1500}
      height={938}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}
