import { getPost, getPostSlugs } from "@/lib/blog";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Qollabra blog post";
export const size = ogSize;
export const contentType = ogContentType;

// Prerender one card per page at build time.
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { meta } = await getPost((await params).slug);
  return renderOg({
    brand: meta.brand === "qohort" ? "qohort" : "qollabra",
    eyebrow: meta.tags[0] ?? "Blog",
    title: meta.title,
  });
}
