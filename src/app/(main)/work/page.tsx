import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { caseStudies } from "@/content/work";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Work — AI & Software Case Studies",
  description:
    "Case studies from Qollabra: production AI, document processing, specialist workspaces and systems that scale safely.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]} />}
        eyebrow="Work"
        title="Software where the domain is complicated and reliability matters"
        lead="We are comfortable where AI needs supervision, workloads are expensive, failures must be recoverable and production reliability matters."
      />
      <Container className="grid gap-6">
        {caseStudies.map((c) => (
          <Link key={c.slug} href={`/work/${c.slug}`} className="group grid gap-6 rounded-3xl bg-sand p-8 sm:p-10 lg:grid-cols-[1.4fr_1fr] hover:bg-brand-soft">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">{c.sector}</p>
              <h2 className="mt-3 font-serif text-3xl group-hover:underline">{c.title}</h2>
              <p className="mt-4 text-muted">{c.description}</p>
            </div>
            <p className="flex flex-wrap content-start gap-2 text-xs">
              {c.stack.map((t) => (
                <span key={t} className="rounded-full bg-white px-3 py-1">{t}</span>
              ))}
            </p>
          </Link>
        ))}
      </Container>
      <CtaBand />
    </>
  );
}
