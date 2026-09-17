import type { MetadataRoute } from "next";
import { absoluteUrl, indexablePaths } from "@/content/site";
import { locales, localizePath } from "@/i18n/config";
import { languageAlternates } from "@/lib/seo";

export const dynamic = "force-static";

const priorities: Record<string, number> = {
  "/": 1,
  "/paslaugos": 0.9,
  "/kainos": 0.9,
  "/darbai": 0.8,
  "/duk": 0.7,
  "/kontaktai": 0.7,
  "/darbai/minerda": 0.8,
};

/** Every indexable page in every language, each entry listing all of its
 *  language versions (xhtml:link hreflang), the same set the pages declare
 *  in their own <head>. The demos are noindex and stay out. */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizePath(path, locale)),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: priorities[path] ?? 0.5,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
