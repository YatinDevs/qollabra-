import { getTier, tiers } from "@/content/qohort";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Qohort programme tier";
export const size = ogSize;
export const contentType = ogContentType;

// Prerender one card per page at build time.
export function generateStaticParams() {
  return tiers.map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTier((await params).slug);
  return renderOg({ brand: "qohort", eyebrow: t ? `Tier ${t.number} · 12 weeks` : "Qohort", title: t?.name ?? "Qohort" });
}
