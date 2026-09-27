import type { MetadataRoute } from "next";
import { tiers } from "@/content/qohort";
import { services } from "@/content/services";
import { caseStudies } from "@/content/work";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

// Bump this when you make a meaningful site-wide content change to the static pages.
const CONTENT_UPDATED = "2026-09-27";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const latestPost = posts[0]?.meta.updated ?? posts[0]?.meta.date ?? CONTENT_UPDATED;

  const page = (path: string, priority: number, lastModified = CONTENT_UPDATED) => ({
    url: absoluteUrl(path),
    lastModified,
    priority,
  });

  return [
    page("/", 1),
    page("/services", 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, 0.8)),
    page("/work", 0.7),
    ...caseStudies.map((c) => page(`/work/${c.slug}`, 0.8)),
    page("/discovery-workshop", 0.8),
    page("/about", 0.6),
    page("/contact", 0.6),
    page("/qohort", 0.9),
    ...tiers.map((t) => page(`/qohort/${t.slug}`, 0.8)),
    page("/qohort/seminars", 0.7),
    page("/qohort/apply", 0.6),
    page("/blog", 0.7, latestPost),
    ...posts.map((p) => page(`/blog/${p.slug}`, 0.6, p.meta.updated ?? p.meta.date)),
  ];
}
