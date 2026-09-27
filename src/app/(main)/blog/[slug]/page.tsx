import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PostCard } from "@/components/post-card";
import { formatDate, getAllPosts, getPost, getPostSlugs } from "@/lib/blog";
import { graph, orgId, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const { meta } = await getPost(slug);
  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: meta.date,
    modifiedTime: meta.updated ?? meta.date,
    tags: meta.tags,
    noindex: meta.draft,
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug).catch(() => null);
  if (!post) notFound();
  const { meta, Content, readingMinutes } = post;
  const url = absoluteUrl(`/blog/${slug}`);

  const more = (await getAllPosts())
    .filter((p) => p.slug !== slug)
    .sort((a, b) => Number(b.meta.brand === meta.brand) - Number(a.meta.brand === meta.brand))
    .slice(0, 2);

  return (
    <>
      <Container className="pt-10 sm:pt-14">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: meta.title, path: `/blog/${slug}` },
          ]}
        />
      </Container>

      <article className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <header className="mt-8">
          <p className="text-sm text-muted">
            <time dateTime={meta.date}>{formatDate(meta.date)}</time> · {readingMinutes} min read · {meta.author}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">{meta.title}</h1>
          <p className="mt-5 text-lg text-muted">{meta.description}</p>
          <p className="mt-5 flex flex-wrap gap-2 text-xs">
            {meta.tags.map((t) => (
              <span key={t} className="rounded-full bg-sand px-3 py-1">{t}</span>
            ))}
          </p>
        </header>

        <div className="prose prose-lg prose-neutral mt-10 max-w-none prose-headings:font-serif prose-headings:font-semibold prose-a:text-brand-ink prose-a:decoration-brand/50 prose-th:text-left">
          <Content />
        </div>

        <footer className="mt-12 flex flex-wrap items-center gap-4 border-t border-line pt-6 text-sm">
          <span className="text-muted">Share:</span>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-brand-ink"
          >
            LinkedIn
          </a>
          <a
            href={`https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(meta.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-brand-ink"
          >
            X
          </a>
          {meta.linkedin && (
            <a href={meta.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-brand-ink">
              Join the discussion on LinkedIn →
            </a>
          )}
          <Link href="/blog" className="ml-auto text-muted hover:text-ink">← All articles</Link>
        </footer>
      </article>

      {more.length > 0 && (
        <Container className="mt-20">
          <h2 className="font-serif text-2xl">Keep reading</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      )}

      {meta.brand === "qohort" ? (
        <CtaBand
          title="Build the evidence, not just the project"
          body="The Qohort Applied AI Engineering Residency gives you supervised practice, weekly code review and assessed evidence of what you can build."
          href="/qohort"
          label="Explore Qohort"
        />
      ) : (
        <CtaBand />
      )}

      <JsonLd
        data={graph({
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          headline: meta.title,
          description: meta.description,
          datePublished: meta.date,
          dateModified: meta.updated ?? meta.date,
          url,
          mainEntityOfPage: url,
          keywords: meta.tags.join(", "),
          author: { "@type": "Organization", name: meta.author, url: absoluteUrl("/") },
          publisher: { "@id": orgId },
          ...(meta.linkedin ? { sameAs: [meta.linkedin] } : {}),
        })}
      />
    </>
  );
}
