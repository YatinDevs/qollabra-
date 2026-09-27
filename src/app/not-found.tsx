import Link from "next/link";
import { Container } from "@/components/container";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="py-32 text-center">
          <p className="font-serif text-6xl text-brand">404</p>
          <h1 className="mt-4 font-serif text-3xl">This page doesn’t exist</h1>
          <p className="mt-4 text-muted">It may have moved. Try one of these instead:</p>
          <p className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium">
            <Link href="/" className="hover:text-brand-ink">Home</Link>
            <Link href="/services" className="hover:text-brand-ink">Services</Link>
            <Link href="/qohort" className="hover:text-brand-ink">Qohort</Link>
            <Link href="/blog" className="hover:text-brand-ink">Blog</Link>
          </p>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
