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
    // The answer engines are named explicitly rather than left to the
    // wildcard. Same permission, but stated: a crawler looking for its own
    // user-agent finds an allow rule instead of inferring one, and the list
    // doubles as the record of which engines this site wants to be quoted by.
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "Bingbot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
