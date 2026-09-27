import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { getTier, tiers } from "@/content/qohort";
import { graph, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return tiers.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/qohort/[slug]">) {
  const { slug } = await params;
  const t = getTier(slug);
  if (!t) return {};
  return pageMetadata({ title: t.seoTitle, absoluteTitle: true, description: t.description, path: `/qohort/${t.slug}` });
}

export default async function TierPage({ params }: PageProps<"/qohort/[slug]">) {
  const { slug } = await params;
  const t = getTier(slug);
  if (!t) notFound();
  const next = tiers.find((x) => x.number === t.number + 1);

  return (
    <>
      <Container className="pt-10">
        <Breadcrumbs
          dark
          items={[
            { name: "Home", path: "/" },
            { name: "Qohort", path: "/qohort" },
            { name: `Tier ${t.number}: ${t.name}`, path: `/qohort/${t.slug}` },
          ]}
        />
      </Container>

      <Container className="py-14">
        <p className="font-mono text-sm text-brand">Tier {t.number} · 12 weeks · {t.hoursPerWeek}</p>
        <h1 className="mt-4 max-w-4xl font-mono text-4xl leading-tight sm:text-5xl">{t.name}</h1>
        <p className="mt-6 max-w-3xl text-lg text-q-muted">{t.purpose}</p>
        <div className="mt-8">
          <ButtonLink href="/qohort/apply" variant="qohort">Apply for Tier {t.number} →</ButtonLink>
        </div>
      </Container>

      <Container className="grid gap-4 md:grid-cols-3">
        <Card title="Who it's for">{t.forWho}</Card>
        <Card title="Entry evidence">{t.entry}</Card>
        <Card title="Capability at exit">{t.exit}</Card>
      </Container>

      <Container className="mt-20 grid gap-14 lg:grid-cols-2">
        <section>
          <h2 className="font-mono text-2xl">What you’ll build and learn</h2>
          <ul className="mt-6 space-y-3">
            {t.scope.map((s) => (
              <li key={s} className="flex gap-3">
                <span aria-hidden className="font-mono text-brand">›</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-mono text-2xl">How you’ll show it</h2>
          <ul className="mt-6 space-y-3">
            {t.exitEvidence.map((s) => (
              <li key={s} className="flex gap-3">
                <span aria-hidden className="font-mono text-brand">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-q-line bg-q-panel p-6 text-sm">
            <p><span className="text-q-muted">Credential:</span> {t.credential}</p>
            <p className="mt-2"><span className="text-q-muted">Role direction:</span> {t.roleDirection}</p>
            <p className="mt-2 text-xs text-q-muted">Role readiness is assessed; it is not conferred by attendance.</p>
          </div>
        </section>
      </Container>

      <Container className="mt-20 flex flex-wrap gap-3">
        {tiers.filter((x) => x.slug !== t.slug).map((x) => (
          <Link key={x.slug} href={`/qohort/${x.slug}`} className="rounded-full border border-q-line px-4 py-2 font-mono text-sm hover:border-brand">
            Tier {x.number}: {x.name}{x === next ? " →" : ""}
          </Link>
        ))}
      </Container>

      <JsonLd
        data={graph({
          "@type": "Course",
          "@id": absoluteUrl(`/qohort/${t.slug}#course`),
          name: t.name,
          description: t.description,
          url: absoluteUrl(`/qohort/${t.slug}`),
          provider: { "@id": absoluteUrl("/qohort#organization") },
          coursePrerequisites: t.entry,
          educationalCredentialAwarded: t.credential,
          teaches: t.scope,
          timeRequired: "P12W",
          inLanguage: "en",
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "blended",
            courseWorkload: "PT18H",
            location: { "@type": "Place", name: "Pune, India" },
          },
        })}
      />
    </>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-q-line bg-q-panel p-6">
      <h2 className="font-mono text-sm text-brand">{title}</h2>
      <p className="mt-3 text-sm text-q-muted">{children}</p>
    </div>
  );
}
