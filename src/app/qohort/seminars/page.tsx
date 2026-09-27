import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { LeadForm } from "@/components/lead-form";
import { seminars } from "@/content/qohort";
import { graph, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Free AI & Software Engineering Seminars for Colleges — Qohort",
  absoluteTitle: true,
  description:
    "Standalone, career-relevant seminars for engineering colleges in Pune and PCMC: AI-assisted SDLC, AI engineering careers, job readiness, technical interviews and agentic AI.",
  path: "/qohort/seminars",
  image: "/qohort/opengraph-image",
});

export default function SeminarsPage() {
  return (
    <>
      <Container className="pt-10">
        <Breadcrumbs
          dark
          items={[
            { name: "Home", path: "/" },
            { name: "Qohort", path: "/qohort" },
            { name: "Seminars", path: "/qohort/seminars" },
          ]}
        />
      </Container>
      <Container className="py-14">
        <p className="font-mono text-sm text-brand">For colleges, placement cells & coding clubs</p>
        <h1 className="mt-4 max-w-4xl font-mono text-4xl leading-tight sm:text-5xl">
          Seminars that teach something, even if nobody enrols.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-q-muted">
          Each 60-minute talk stands alone, is built around one real question, includes audience
          participation and leaves attendees with a practical takeaway. Any programme mention is optional
          and agreed with the host in advance.
        </p>
      </Container>

      <Container className="grid gap-4 md:grid-cols-2">
        {seminars.map((s, i) => (
          <article key={s.title} className="rounded-2xl border border-q-line bg-q-panel p-7">
            <p className="font-mono text-sm text-brand">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 font-mono text-lg">{s.title}</h2>
            <p className="mt-3 text-sm text-q-muted"><span className="text-q-text">The question:</span> {s.question}</p>
            <p className="mt-2 text-sm text-q-muted"><span className="text-q-text">Takeaway:</span> {s.takeaway}</p>
          </article>
        ))}
      </Container>

      <Container className="mt-20 max-w-3xl">
        <h2 className="font-mono text-2xl">Invite us to your campus</h2>
        <div className="mt-6">
          <LeadForm
            dark
            kind="seminar"
            source="/qohort/seminars"
            organisationLabel="College / department"
            roleLabel="Your role (faculty, placement cell, club…)"
            interestLabel="Which seminar?"
            interests={seminars.map((s) => ({ value: s.title, label: s.title }))}
            messageLabel="Preferred dates, audience size and year of study"
            submitLabel="Request a seminar"
          />
        </div>
      </Container>

      <JsonLd
        data={graph({
          "@type": "ItemList",
          name: "Qohort college seminars",
          url: absoluteUrl("/qohort/seminars"),
          itemListElement: seminars.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title })),
        })}
      />
    </>
  );
}
