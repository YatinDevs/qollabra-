import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Bot,
  Compass,
  FileStack,
  Gauge,
  Hammer,
  PenTool,
  RefreshCw,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Hero } from "@/components/home/hero";
import { QWaypoint } from "@/components/q-waypoint";
import { ScrollQ } from "@/components/scroll-q";
import { ServiceIcon } from "@/components/service-icon";
import { services } from "@/content/services";
import { formatDate, getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Qollabra — Product Engineering & Production GenAI Consultants",
  absoluteTitle: true,
  description:
    "We turn complex business processes into reliable software: web apps, backend and data systems, applied GenAI and bounded agentic automation — built for production.",
  path: "/",
});

const builtFor = [
  { icon: Blocks, label: "Complex domains" },
  { icon: FileStack, label: "Document-heavy" },
  { icon: ShieldCheck, label: "AI with human review" },
  { icon: Bot, label: "Agentic workflows" },
  { icon: Gauge, label: "High-volume workloads" },
  { icon: RefreshCw, label: "Careful modernisation" },
];

const steps = [
  { icon: Compass, label: "Discover", note: "Outcome & constraints" },
  { icon: PenTool, label: "Design", note: "Workflow & data" },
  { icon: Hammer, label: "Build", note: "Tested & traceable" },
  { icon: Rocket, label: "Run", note: "Observed & scaled" },
];

// Claims taken from the Capability Brief — keep them evidence-based.
const proof = [
  { value: "1,000s", label: "of pages per document set" },
  { value: "Human", label: "review before results are final" },
  { value: "Live", label: "scaled while users kept working" },
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-brand-ink">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">{title}</h2>
    </div>
  );
}

export default async function HomePage() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <Hero />

      {/* Built for */}
      <Container className="relative mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <QWaypoint side="left" size="lg" rotate={-8} className="top-10" />
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src="/images/whiteboard-design.jpg"
            alt="An engineer sketching a system design on a glass whiteboard"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionTitle eyebrow="Where we fit" title="Built for the hard part." />
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6">
            {builtFor.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-ink">
                  <Icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <span className="font-medium">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* What we build */}
      <Container className="relative mt-32">
        <QWaypoint side="right" size="md" rotate={8} />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow="Services" title="What we build." />
          <Link href="/services" className="group flex items-center gap-1 text-sm font-medium text-ink">
            All services
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex flex-col bg-paper p-5 transition-colors hover:bg-white sm:p-7"
            >
              <ServiceIcon slug={s.slug} className="h-6 w-6 text-brand-ink" />
              <h3 className="mt-6 text-sm font-medium leading-snug sm:mt-8 sm:text-base">{s.name}</h3>
              <p className="mt-1 text-xs text-muted sm:text-sm">{s.short}</p>
              <ArrowUpRight
                aria-hidden
                className="mt-6 h-4 w-4 text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>
      </Container>

      {/* Case study */}
      <Container className="relative mt-32">
        <QWaypoint side="left" size="md" rotate={-10} className="top-16" />
        <Link
          href="/work/legal-title-ai-platform"
          className="group relative block overflow-hidden rounded-3xl bg-ink text-white"
        >
          <Image
            src="/images/document-stacks.jpg"
            alt="Stacks of legal documents and file folders"
            fill
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="object-cover opacity-45 transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/10" />
          <div className="relative grid gap-12 p-8 sm:p-14 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-medium text-brand">Case study · Legal AI</p>
              <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                Title intelligence for U.S. attorneys.
              </h2>
              <p className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                Read the story
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-6 border-t border-white/15 pt-8 lg:border-0 lg:pt-0">
              {proof.map((p) => (
                <div key={p.label}>
                  <dt className="font-serif text-3xl text-brand sm:text-4xl">{p.value}</dt>
                  <dd className="mt-1 text-xs text-white/60">{p.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Link>
      </Container>

      {/* How we work */}
      <Container className="relative mt-32">
        <QWaypoint side="right" size="sm" rotate={10} />
        <SectionTitle eyebrow="How we work" title="From idea to production." />
        <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span
            aria-hidden
            className="absolute left-6 right-6 top-6 hidden border-t border-dashed border-brand/40 lg:block"
          />
          {steps.map(({ icon: Icon, label, note }, i) => (
            <li key={label} className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper text-ink">
                <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <p className="mt-5 font-mono text-xs text-muted">0{i + 1}</p>
              <h3 className="mt-1 text-xl font-medium">{label}</h3>
              <p className="mt-1 text-sm text-muted">{note}</p>
            </li>
          ))}
        </ol>
      </Container>

      {/* Qohort */}
      <Container className="relative mt-32">
        <QWaypoint side="left" size="lg" rotate={-6} className="top-12" />
        <div className="grid overflow-hidden rounded-3xl bg-q-bg text-q-text lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-14">
            <Image src="/brand/qohort-paper.png" alt="Qohort" width={216} height={82} className="h-9 w-auto self-start" />
            <h2 className="mt-8 font-mono text-3xl leading-tight sm:text-4xl">Learn to build it.</h2>
            <p className="mt-4 font-mono text-sm text-q-muted">
              Applied AI Engineering Residency · 3 tiers · 12 weeks each
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/qohort"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-mono text-sm font-semibold text-q-bg hover:bg-white"
              >
                Explore Qohort <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link href="/qohort/seminars" className="font-mono text-sm text-q-muted hover:text-q-text">
                College seminars →
              </Link>
            </div>
          </div>
          <div className="relative min-h-72">
            <Image
              src="/images/cohort-learning.jpg"
              alt="Three learners working through code together on one laptop"
              fill
              sizes="(min-width: 1024px) 552px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>

      {/* Notes */}
      {posts.length > 0 && (
        <Container className="relative mt-32">
          <QWaypoint side="right" size="md" rotate={8} />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle eyebrow="Insights" title="Engineering notes." />
            <Link href="/blog" className="group flex items-center gap-1 text-sm font-medium text-ink">
              All articles
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <ul className="mt-10 border-t border-line">
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link
                  href={`/blog/${p.slug}`}
                  className="group grid gap-2 py-6 sm:grid-cols-[160px_1fr_auto] sm:items-center sm:gap-8"
                >
                  <time dateTime={p.meta.date} className="text-sm text-muted">
                    {formatDate(p.meta.date)}
                  </time>
                  <span className="font-serif text-xl leading-snug group-hover:text-brand-ink sm:text-2xl">
                    {p.meta.title}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="hidden h-5 w-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-ink sm:block"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      )}

      {/* Closing CTA */}
      <Container className="mt-32">
        <div className="relative overflow-hidden rounded-3xl bg-ink text-white">
          <Image
            src="/images/balloon-sunrise.jpg"
            alt="A hot-air balloon rising over mountains at sunrise"
            fill
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="object-cover object-[50%_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
          <div className="relative flex min-h-[420px] flex-col items-center justify-end p-8 text-center sm:p-14">
            <h2 className="max-w-2xl font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
              Ready to lift off?
            </h2>
            <p className="mt-4 text-white/75">Start with a focused discovery workshop.</p>
            <Link
              href="/discovery-workshop"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink hover:bg-brand"
            >
              Book a discovery call
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Container>

      <ScrollQ />
    </>
  );
}
