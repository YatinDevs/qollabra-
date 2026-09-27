import type { Metadata } from "next";
import type {
  BreadcrumbList,
  FAQPage,
  Graph,
  Organization,
  Thing,
  WebSite,
} from "schema-dts";
import { absoluteUrl, qohort, site, socialLinks } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute title (skips the " | Qollabra" template). */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noindex?: boolean;
  /**
   * Fallback social image. Segments with their own opengraph-image file override this automatically;
   * it exists because a page-level `openGraph` object otherwise drops the inherited root image.
   */
  image?: string;
};

/** One place to build per-page metadata so every page gets canonical + OG + Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
  noindex,
  image = "/opengraph-image",
}: PageMetaInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: image, width: 1200, height: 630 }],
      ...(type === "article" ? { publishedTime, modifiedTime, tags } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export const orgId = absoluteUrl("/#organization");
export const websiteId = absoluteUrl("/#website");

export function organizationSchema(): Organization {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/brand/qollabra-logo.png"),
    description: site.description,
    email: site.email,
    telephone: site.phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    sameAs: socialLinks(),
    knowsAbout: [
      "Product engineering",
      "Generative AI",
      "LLM application development",
      "Agentic automation",
      "Document processing and OCR",
      "Backend and data systems",
      "Cloud and DevOps",
    ],
    subOrganization: {
      "@type": "EducationalOrganization",
      "@id": absoluteUrl("/qohort#organization"),
      name: `${qohort.name} by ${site.name}`,
      url: absoluteUrl("/qohort"),
      logo: absoluteUrl("/brand/qohort-ink.png"),
      description: qohort.description,
    },
  };
}

export function websiteSchema(): WebSite {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): FAQPage {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function graph(...nodes: Thing[]): Graph {
  return { "@context": "https://schema.org", "@graph": nodes };
}
