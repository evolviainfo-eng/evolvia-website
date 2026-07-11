import type { MetadataRoute } from "next";
import { site, pages } from "@/content/site";

export const dynamic = "force-static";

const priorities: Record<string, number> = {
  "/": 1,
  "/paslaugos": 0.9,
  "/kainos": 0.9,
  "/darbai": 0.8,
  "/duk": 0.7,
  "/kontaktai": 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: page.path === "/" ? site.url : `${site.url}${page.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: priorities[page.path] ?? 0.5,
  }));
}
