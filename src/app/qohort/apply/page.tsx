import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { LeadForm } from "@/components/lead-form";
import { tiers } from "@/content/qohort";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Apply — Qohort Applied AI Engineering Residency",
  absoluteTitle: true,
  description:
    "Register interest and take the readiness assessment for the Qohort Applied AI Engineering Residency. Admission is by assessment, not payment.",
  path: "/qohort/apply",
  image: "/qohort/opengraph-image",
});

const steps = [
  "Register your interest below.",
  "Complete a bounded practical task (declared AI assistance allowed).",
  "Join a short live review, including an unaided debugging or modification segment.",
  "Receive a written entry recommendation for the right tier.",
];

export default function ApplyPage() {
  return (
    <>
      <Container className="pt-10">
        <Breadcrumbs
          dark
          items={[
            { name: "Home", path: "/" },
            { name: "Qohort", path: "/qohort" },
            { name: "Apply", path: "/qohort/apply" },
          ]}
        />
      </Container>
      <Container className="grid gap-14 py-14 lg:grid-cols-[1fr_1.3fr]">
        <section>
          <h1 className="font-mono text-4xl leading-tight">Apply</h1>
          <p className="mt-5 text-q-muted">
            Admission is by assessment, not payment. We look for functioning code, willingness to debug,
            consistency and the ability to explain a decision.
          </p>
          <ol className="mt-8 space-y-4">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="font-mono text-brand">{i + 1}.</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </section>
        <section className="rounded-3xl border border-q-line bg-q-panel p-6 sm:p-8">
          <LeadForm
            dark
            kind="apply"
            source="/qohort/apply"
            organisationLabel="College or current employer"
            roleLabel="Year of study or years of experience"
            interestLabel="Which tier are you considering?"
            interests={[
              ...tiers.map((t) => ({ value: t.slug, label: `Tier ${t.number}: ${t.name}` })),
              { value: "not-sure", label: "Not sure — assess me" },
            ]}
            messageLabel="Link to a project or repository you're proud of (optional)"
            messageRequired={false}
            submitLabel="Register interest"
          />
        </section>
      </Container>
    </>
  );
}
