import type { Metadata } from "next";
import { site } from "@/content/site";

/** BreadcrumbList structured data for a subpage. */
export function breadcrumbJsonLd(label: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Pradžia",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: `${site.url}${path}`,
      },
    ],
  };
}

/** Full per-page metadata: title (templated in layout), description,
 *  self-canonical and complete OG/Twitter blocks. openGraph merges shallowly
 *  in Next, so images must be respecified here or they'd be lost. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — Evolvia`,
      description,
      url,
      siteName: "Evolvia",
      locale: "lt_LT",
      type: "website",
      images: [
        {
          url: "/brand/lockup-dark.png",
          width: 1600,
          height: 900,
          alt: "evolvia. — web design",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Evolvia`,
      description,
      images: ["/brand/lockup-dark.png"],
    },
  };
}
