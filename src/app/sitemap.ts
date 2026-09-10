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
  "/darbai/minerda": 0.8,
};

/** Pages that are indexable but deliberately not in the footer navigation. */
const extraPaths = ["/darbai/minerda"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pages.map((p) => p.path), ...extraPaths].map((path) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: priorities[path] ?? 0.5,
  }));
}
