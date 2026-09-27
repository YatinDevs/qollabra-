import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

export type PostMeta = {
  title: string;
  description: string;
  /** ISO date, e.g. "2026-09-27" */
  date: string;
  updated?: string;
  tags: string[];
  author: string;
  /** Which brand the post primarily supports; drives CTAs and related links. */
  brand?: "qollabra" | "qohort";
  /** URL of the LinkedIn post that promotes this article, once published. */
  linkedin?: string;
  draft?: boolean;
};

export type Post = {
  slug: string;
  meta: PostMeta;
  readingMinutes: number;
  Content: ComponentType;
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getPostSlugs() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getPost(slug: string): Promise<Post> {
  const mod = await import(`@/content/blog/${slug}.mdx`);
  const words = fs
    .readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8")
    .split(/\s+/).length;
  return {
    slug,
    meta: mod.metadata as PostMeta,
    readingMinutes: Math.max(1, Math.round(words / 225)),
    Content: mod.default,
  };
}

export async function getAllPosts() {
  const posts = await Promise.all(getPostSlugs().map(getPost));
  return posts
    .filter((p) => !p.meta.draft)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
