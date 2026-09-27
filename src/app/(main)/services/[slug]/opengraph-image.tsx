import { getService, services } from "@/content/services";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Qollabra service";
export const size = ogSize;
export const contentType = ogContentType;

// Prerender one card per page at build time.
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  return renderOg({ eyebrow: "Services", title: s?.name ?? "Qollabra" });
}
