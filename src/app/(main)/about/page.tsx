import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Qollabra is a product-engineering and technology company helping organisations turn complex business processes into practical, reliable software systems.",
  path: "/about",
});

const principles = [
  {
    title: "Technology without lock-in",
    body: "We are not tied to one language, framework, cloud or AI model. Technology is chosen for the problem, the existing environment, the expected scale, security requirements, team constraints and long-term maintainability.",
  },
  {
    title: "The whole system, not the demo",
    body: "The durable work is everything around the model: product design, domain context, tools, data, evaluations, human controls, failure recovery, observability, security and cost management.",
  },
  {
    title: "Humans stay in control where it matters",
    body: "AI output becomes a reviewed suggestion before it becomes an authoritative record. Consequential actions need explicit approval.",
  },
  {
    title: "Engineering discipline that outlasts the stack",
    body: "The stack can change. Testing, validation, authorisation, observability, idempotency and recoverability do not.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />}
        eyebrow="About"
        title="Turning complex business processes into reliable software"
        lead="We work across the full product lifecycle: understanding the business problem, shaping the workflow, designing the solution, building the product, integrating AI and automation where useful, deploying it to production, and supporting the system as it grows."
      />
      <Container>
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="rounded-2xl border border-line bg-white p-7">
              <h2 className="font-serif text-xl">{p.title}</h2>
              <p className="mt-3 text-muted">{p.body}</p>
            </div>
          ))}
        </div>
        {/* TODO: add founder/team bios with photos and LinkedIn links — named people are a strong trust and E-E-A-T signal. */}
      </Container>
      <CtaBand />
    </>
  );
}
