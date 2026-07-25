import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // /demo/ is deliberately NOT disallowed here. Those pages carry a
    // `noindex` meta tag (see app/demo/layout.tsx) and a matching
    // X-Robots-Tag header from netlify.toml — and a crawler has to be
    // allowed to fetch a page in order to see that it says noindex. A
    // Disallow would do the opposite of what it looks like: the URLs could
    // still be indexed, just without the instruction not to.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
