import { Container } from "./container";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
}) {
  return (
    <Container className="pt-10 pb-12 sm:pt-14">
      {breadcrumbs}
      {eyebrow && (
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">{eyebrow}</p>
      )}
      <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">{title}</h1>
      {lead && <p className="mt-5 max-w-3xl text-lg text-muted">{lead}</p>}
      {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
    </Container>
  );
}
