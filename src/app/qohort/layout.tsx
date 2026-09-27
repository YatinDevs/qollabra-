import type { Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { site } from "@/lib/site";

export const viewport: Viewport = { themeColor: "#1c1c1c" };

const qNav = [
  { href: "/qohort#tiers", label: "Tiers" },
  { href: "/qohort/seminars", label: "Seminars" },
  { href: "/blog", label: "Blog" },
];

export default function QohortLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col bg-q-bg text-q-text">
      <header className="sticky top-0 z-40 border-b border-q-line bg-q-bg/90 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/qohort" aria-label="Qohort home" className="flex items-center gap-3">
            <Image src="/brand/qohort-paper.png" alt="" width={216} height={82} className="h-8 w-auto" priority />
            <span className="hidden text-xs text-q-muted sm:inline">by Qollabra</span>
          </Link>
          <nav aria-label="Qohort" className="flex items-center gap-5 font-mono text-sm">
            {qNav.map((n) => (
              <Link key={n.href} href={n.href} className="hidden text-q-muted hover:text-q-text sm:inline">
                {n.label}
              </Link>
            ))}
            <Link href="/qohort/apply" className="rounded-full bg-brand px-4 py-1.5 font-semibold text-q-bg hover:bg-white">
              Apply
            </Link>
          </nav>
        </Container>
      </header>

      <main id="main" className="flex-1">{children}</main>

      <footer className="mt-24 border-t border-q-line">
        <Container className="flex flex-col gap-4 py-10 text-sm text-q-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Qohort is the education venture of{" "}
            <Link href="/" className="text-q-text underline decoration-brand underline-offset-4">
              {site.name}
            </Link>
            .
          </p>
          <p className="flex flex-wrap gap-4">
            <a href={`mailto:${site.email}`} className="hover:text-q-text">{site.email}</a>
            <Link href="/privacy" className="hover:text-q-text">Privacy</Link>
            <Link href="/terms" className="hover:text-q-text">Terms</Link>
          </p>
        </Container>
      </footer>
    </div>
  );
}
