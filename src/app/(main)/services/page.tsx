import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { engagements, services } from "@/content/services";
import { graph, orgId, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Software Development & Applied AI Services",
  description:
    "Product and workflow engineering, web applications, backend and data systems, applied GenAI, agentic automation, scalable pipelines and production DevOps.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />}
        eyebrow="Services"
        title="Engineering across the full product lifecycle"
        lead="From understanding the business problem to running the system in production. We are not tied to one language, framework, cloud or AI model — technology is chosen for the problem, the environment, the scale and the team that will maintain it."
      />
      <Container>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-line bg-white p-7 transition-colors hover:border-brand"
            >
              <h2 className="font-serif text-2xl group-hover:text-brand-ink">{s.name}</h2>
              <p className="mt-3 text-muted">{s.summary}</p>
              <p className="mt-4 text-sm font-medium text-brand-ink">Learn more →</p>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="mt-24">
        <h2 className="font-serif text-3xl">Ways to engage</h2>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {engagements.map((e) => (
            <div key={e.name} className="border-t border-line pt-5">
              <h3 className="font-semibold">{e.name}</h3>
              <p className="mt-2 text-sm text-muted">{e.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <CtaBand />

      <JsonLd
        data={graph({
          "@type": "ItemList",
          name: "Qollabra services",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.name,
              description: s.description,
              url: absoluteUrl(`/services/${s.slug}`),
              provider: { "@id": orgId },
            },
          })),
        })}
      />
    </>
  );
}
