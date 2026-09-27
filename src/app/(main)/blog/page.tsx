import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/blog";
import { graph, orgId, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Engineering Notes — Applied AI & Software Blog",
  description:
    "Practical writing on production GenAI, agentic systems, document pipelines, software architecture and engineering careers from the Qollabra team.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />}
        eyebrow="Blog"
        title="Engineering notes"
        lead="Short, practical writing on building AI-enabled software that survives production — and on becoming an engineer who can build it."
      />
      <Container className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </Container>
      <JsonLd
        data={graph({
          "@type": "Blog",
          name: "Qollabra engineering notes",
          url: absoluteUrl("/blog"),
          publisher: { "@id": orgId },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.meta.title,
            url: absoluteUrl(`/blog/${p.slug}`),
            datePublished: p.meta.date,
          })),
        })}
      />
    </>
  );
}
