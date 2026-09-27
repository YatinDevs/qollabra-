const DEFAULT_SITE_URL = "https://qollabra.com";

/** Tolerates an unset or empty env var and a value typed without a protocol (e.g. "qollabra.com"). */
function resolveSiteUrl(raw: string | undefined) {
  const value = raw?.trim();
  if (!value) return DEFAULT_SITE_URL;
  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const site = {
  name: "Qollabra",
  legalName: "Qollabra",
  tagline: "Product engineering and production GenAI",
  description:
    "Qollabra is a product-engineering company that turns complex business processes into reliable software — web applications, backend and data systems, applied GenAI and bounded agentic automation, built for production.",
  url: siteUrl,
  email: "hello@qollabra.com",
  phone: "+91 8550-96-4848",
  phoneE164: "+918550964848",
  locale: "en_IN",
  address: {
    locality: "Pune",
    region: "Maharashtra",
    country: "IN",
  },
  // Fill these in as the profiles go live; empty values are skipped in JSON-LD and the footer.
  social: {
    linkedin: "",
    youtube: "",
    github: "",
    x: "",
  },
} as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/qohort", label: "Qohort" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

export const qohort = {
  name: "Qohort",
  programme: "Applied AI Engineering Residency",
  tagline: "Supervised engineering for the AI era",
  description:
    "Qohort by Qollabra runs the Applied AI Engineering Residency — three 12-week, competency-based tiers that take students and early-career developers from full-stack foundations to evaluated LLM features and bounded agentic systems.",
} as const;

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function socialLinks() {
  return Object.values(site.social).filter(Boolean) as string[];
}
