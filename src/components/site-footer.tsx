import Link from "next/link";
import { services } from "@/content/services";
import { site } from "@/lib/site";
import { Container } from "./container";
import { QMark } from "./q-mark";

const socialLabels: Record<string, string> = {
  linkedin: "LinkedIn",
  youtube: "YouTube",
  github: "GitHub",
  x: "X",
};

export function SiteFooter() {
  const socials = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer className="mt-24 border-t border-line bg-sand">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-3" aria-label="Qollabra home">
            {/* Final stop for the travelling Q on the homepage. */}
            <span className="relative block h-10 w-[28.2px]">
              <span data-q-anchor="" data-q-rotate="0" className="absolute inset-0" />
              <QMark gradient className="h-10 w-auto transition-opacity duration-300 xl:[.q-travel_&]:opacity-0" />
            </span>
            <span className="font-serif text-2xl font-semibold tracking-tight text-charcoal">Qollabra</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline}.</p>
          <p className="mt-4 text-sm">
            <a href={`mailto:${site.email}`} className="hover:text-brand-ink">{site.email}</a>
            <br />
            <a href={`tel:${site.phoneE164}`} className="hover:text-brand-ink">{site.phone}</a>
          </p>
        </div>
        <FooterCol title="Services">
          {services.slice(0, 6).map((s) => (
            <FooterLink key={s.slug} href={`/services/${s.slug}`}>{s.name}</FooterLink>
          ))}
        </FooterCol>
        <FooterCol title="Company">
          <FooterLink href="/work">Work</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/discovery-workshop">Discovery workshop</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterCol>
        <FooterCol title="Qohort">
          <FooterLink href="/qohort">Applied AI Engineering Residency</FooterLink>
          <FooterLink href="/qohort/seminars">College seminars</FooterLink>
          <FooterLink href="/qohort/apply">Apply</FooterLink>
          {socials.map(([key, url]) => (
            <a key={key} href={url} className="text-sm text-muted hover:text-ink" rel="me noopener" target="_blank">
              {socialLabels[key] ?? key}
            </a>
          ))}
        </FooterCol>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
        <p className="flex gap-4">
          <Link href="/privacy" className="hover:text-ink">Privacy</Link>
          <Link href="/terms" className="hover:text-ink">Terms</Link>
          <a href="/rss.xml" className="hover:text-ink">RSS</a>
        </p>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-ink">{title}</h2>
      <div className="mt-4 flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-muted hover:text-ink">
      {children}
    </Link>
  );
}
