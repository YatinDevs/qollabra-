import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { getService, services } from "@/content/services";
import { caseStudies } from "@/content/work";
import { graph, orgId, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ title: s.seoTitle, description: s.description, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = s.related.map(getService).filter((r) => r !== undefined);
  const studies = caseStudies.filter((c) => c.services.includes(s.slug));

  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: s.name, path: `/services/${s.slug}` },
            ]}
          />
        }
        eyebrow="Service"
        title={s.name}
        lead={s.summary}
      >
        <ButtonLink href="/discovery-workshop">Discuss your project →</ButtonLink>
      </PageHero>

      <Container className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-charcoal">
          {s.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <aside className="rounded-2xl bg-sand p-7">
          <h2 className="font-semibold">When you need this</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {s.whenYouNeedIt.map((w) => (
              <li key={w} className="flex gap-3">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {w}
              </li>
            ))}
          </ul>
        </aside>
      </Container>

      <Container className="mt-20">
        <h2 className="font-serif text-3xl">What we build</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {s.whatWeBuild.map((w) => (
            <div key={w.title} className="rounded-2xl border border-line bg-white p-6">
              <h3 className="font-semibold">{w.title}</h3>
              <p className="mt-2 text-muted">{w.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-20">
        <h2 className="font-serif text-3xl">What you can expect</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {s.outcomes.map((o) => (
            <li key={o} className="border-t-2 border-brand pt-4 font-medium">{o}</li>
          ))}
        </ul>
      </Container>

      {studies.length > 0 && (
        <Container className="mt-20">
          <h2 className="font-serif text-3xl">Related work</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {studies.map((c) => (
              <Link key={c.slug} href={`/work/${c.slug}`} className="rounded-2xl bg-sand p-6 hover:bg-brand-soft">
                <p className="text-xs uppercase tracking-wider text-brand-ink">{c.sector}</p>
                <h3 className="mt-2 font-serif text-xl">{c.title}</h3>
              </Link>
            ))}
          </div>
        </Container>
      )}

      <Container className="mt-20">
        <Faq items={s.faqs} />
      </Container>

      {related.length > 0 && (
        <Container className="mt-20">
          <h2 className="font-serif text-2xl">Related services</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/services/${r.slug}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm hover:border-brand">
                {r.name}
              </Link>
            ))}
          </div>
        </Container>
      )}

      <CtaBand />

      <JsonLd
        data={graph({
          "@type": "Service",
          "@id": absoluteUrl(`/services/${s.slug}#service`),
          name: s.name,
          serviceType: s.name,
          description: s.description,
          url: absoluteUrl(`/services/${s.slug}`),
          provider: { "@id": orgId },
          areaServed: "Worldwide",
        })}
      />
    </>
  );
}
