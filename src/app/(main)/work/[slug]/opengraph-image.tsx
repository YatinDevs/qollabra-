import { caseStudies, getCaseStudy } from "@/content/work";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Qollabra case study";
export const size = ogSize;
export const contentType = ogContentType;

// Prerender one card per page at build time.
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCaseStudy((await params).slug);
  return renderOg({ eyebrow: `Case study · ${c?.sector ?? ""}`, title: c?.title ?? "Qollabra" });
}
