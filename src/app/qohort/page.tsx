import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { qohortFaqs, tiers, weeklyFormat } from "@/content/qohort";
import { graph, pageMetadata } from "@/lib/seo";
import { absoluteUrl, qohort } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Qohort — Applied AI Engineering Residency in Pune",
  absoluteTitle: true,
  description:
    "A supervised, competency-based applied AI engineering programme: full-stack foundations, LLM integrations and agentic AI — 12-week tiers with weekly code review. Pune & online.",
  path: "/qohort",
});

const promise = [
  { title: "Supervised practice", body: "Six scheduled live hours every week — instruction, guided implementation and engineering review." },
  { title: "Reviewed work", body: "At least one substantive pull request reviewed per learner, per week." },
  { title: "Realistic failure", body: "Recovery drills, evaluation cases and debugging — not just happy-path demos." },
  { title: "Assessed evidence", body: "Midpoint and final gates, live project defence and a competency credential backed by your work." },
];

export default function QohortPage() {
  return (
    <>
      <Container className="pt-10">
        <Breadcrumbs dark items={[{ name: "Home", path: "/" }, { name: "Qohort", path: "/qohort" }]} />
      </Container>

      <Container className="py-16 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
          [ ] {qohort.programme}
        </p>
        <h1 className="mt-5 max-w-4xl font-mono text-4xl leading-tight tracking-tight sm:text-6xl">
          Become an engineer who can build, deploy and defend AI-enabled software.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-q-muted">
          Not a collection of AI tutorials. Three supervised, competency-based tiers for final-year students
          and developers with 2–4 years of experience — taught by engineers who ship production AI systems.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/qohort/apply" variant="qohort">Take the readiness assessment →</ButtonLink>
          <Link href="#tiers" className="inline-flex items-center rounded-full border border-q-line px-5 py-2.5 font-mono text-sm hover:border-q-muted">
            See the tiers
          </Link>
        </div>
      </Container>

      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {promise.map((p) => (
            <div key={p.title} className="rounded-2xl border border-q-line bg-q-panel p-6">
              <h2 className="font-mono font-semibold text-brand">{p.title}</h2>
              <p className="mt-2 text-sm text-q-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-24" >
        <h2 id="tiers" className="scroll-mt-24 font-mono text-3xl">Three tiers. Enter where your evidence says.</h2>
        <p className="mt-4 max-w-3xl text-q-muted">
          Each tier is 12 teaching weeks and can be completed on its own. Join Tier 2 or 3 directly by passing
          its entry assessment. The full pathway is 36 taught weeks — typically 9–12 calendar months.
        </p>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {tiers.map((t) => (
            <Link key={t.slug} href={`/qohort/${t.slug}`} className="group flex flex-col rounded-2xl border border-q-line bg-q-panel p-7 hover:border-brand">
              <p className="font-mono text-sm text-brand">Tier {t.number}</p>
              <h3 className="mt-2 font-mono text-xl group-hover:text-brand">{t.name}</h3>
              <p className="mt-3 flex-1 text-sm text-q-muted">{t.exit}</p>
              <p className="mt-6 text-xs text-q-muted">12 weeks · {t.hoursPerWeek}</p>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="mt-24">
        <h2 className="font-mono text-3xl">A teaching week</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {weeklyFormat.map((w) => (
            <div key={w.label} className="border-t border-q-line pt-5">
              <p className="font-mono text-sm text-brand">{w.hours}</p>
              <h3 className="mt-1 font-semibold">{w.label}</h3>
              <p className="mt-2 text-sm text-q-muted">{w.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm text-q-muted">
          Coding assistants are allowed with disclosure. You remain responsible for your tests and changes,
          and assessments include unaided code-reading and debugging.
        </p>
      </Container>

      <Container className="mt-24">
        <div className="rounded-3xl border border-q-line p-8 sm:p-12">
          <h2 className="font-mono text-2xl">What we will not promise</h2>
          <p className="mt-4 max-w-3xl text-q-muted">
            No salary figures, placement guarantees or accreditation claims. We provide supervised practice,
            assessed evidence of your capability and structured job-search support. Hiring decisions stay with
            employers — and your evidence is what they will look at.
          </p>
        </div>
      </Container>

      <Container className="mt-24">
        <Faq items={qohortFaqs} dark />
      </Container>

      <JsonLd
        data={graph(
          {
            "@type": "EducationalOccupationalProgram",
            "@id": absoluteUrl("/qohort#program"),
            name: `${qohort.name} ${qohort.programme}`,
            description: qohort.description,
            url: absoluteUrl("/qohort"),
            provider: { "@id": absoluteUrl("/qohort#organization") },
            timeToComplete: "P9M",
            educationalProgramMode: "blended",
            hasCourse: tiers.map((t) => ({ "@id": absoluteUrl(`/qohort/${t.slug}#course`) })),
          },
        )}
      />
    </>
  );
}
