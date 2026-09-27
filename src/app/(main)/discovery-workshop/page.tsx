import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";
import { discoveryQuestions, services } from "@/content/services";
import { graph, orgId, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "AI & Product Discovery Workshop",
  description:
    "Start with a focused discovery or AI workflow workshop: agree the outcome, map the process, data and constraints, and scope the smallest production-ready version worth building.",
  path: "/discovery-workshop",
});

export default function DiscoveryPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Discovery workshop", path: "/discovery-workshop" }]} />}
        eyebrow="Suggested first step"
        title="A focused discovery or AI workflow workshop"
        lead="Before anyone writes code, we agree what success looks like, where automation genuinely helps, where a person should stay in control — and the smallest production-ready version worth building."
      />
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <section>
          <h2 className="font-serif text-2xl">Questions we answer together</h2>
          <ol className="mt-6 space-y-4">
            {discoveryQuestions.map((q, i) => (
              <li key={q} className="flex gap-4">
                <span className="font-serif text-xl text-brand-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="pt-0.5">{q}</span>
              </li>
            ))}
          </ol>
        </section>
        <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
          <h2 className="font-serif text-2xl">Request a discovery call</h2>
          <p className="mt-2 text-sm text-muted">We reply within two working days.</p>
          <div className="mt-6">
            <LeadForm
              kind="discovery"
              source="/discovery-workshop"
              interests={[
                ...services.map((s) => ({ value: s.slug, label: s.name })),
                { value: "not-sure", label: "Not sure yet" },
              ]}
              roleLabel="Your role"
              submitLabel="Request a call"
            />
          </div>
        </section>
      </Container>
      <JsonLd
        data={graph({
          "@type": "Service",
          name: "Discovery & AI workflow workshop",
          url: absoluteUrl("/discovery-workshop"),
          provider: { "@id": orgId },
          description: metadata.description as string,
        })}
      />
    </>
  );
}
