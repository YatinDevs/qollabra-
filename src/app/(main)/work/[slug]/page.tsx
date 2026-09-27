import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { getService } from "@/content/services";
import { caseStudies, getCaseStudy } from "@/content/work";
import { graph, orgId, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return pageMetadata({ title: c.seoTitle, description: c.description, path: `/work/${c.slug}`, type: "article" });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const usedServices = c.services.map(getService).filter((s) => s !== undefined);

  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
              { name: c.title, path: `/work/${c.slug}` },
            ]}
          />
        }
        eyebrow={`Case study · ${c.sector}`}
        title={c.title}
        lead={c.description}
      />

      <Container className="grid gap-14 lg:grid-cols-[1.6fr_1fr]">
        <article className="space-y-12">
          {c.sections.map((sec) => (
            <section key={sec.heading}>
              <h2 className="font-serif text-3xl">{sec.heading}</h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-charcoal">
                {sec.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </article>
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-sand p-6">
            <h2 className="font-semibold">Highlights</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {c.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Services</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {usedServices.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full border border-line bg-white px-3 py-1 text-sm hover:border-brand">
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Technology</h2>
            <p className="mt-3 flex flex-wrap gap-2 text-xs">
              {c.stack.map((t) => (
                <span key={t} className="rounded-full bg-sand px-3 py-1">{t}</span>
              ))}
            </p>
            <p className="mt-3 text-xs text-muted">The list is evidence, not a prescription.</p>
          </div>
        </aside>
      </Container>

      <CtaBand title="Working on something with similar constraints?" />

      <JsonLd
        data={graph({
          "@type": "Article",
          headline: c.title,
          description: c.description,
          url: absoluteUrl(`/work/${c.slug}`),
          author: { "@id": orgId },
          publisher: { "@id": orgId },
          about: usedServices.map((s) => s.name),
        })}
      />
    </>
  );
}
