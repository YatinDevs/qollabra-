import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms of Use for qollabra.com.",
  path: "/terms",
  noindex: true, // remove once the final terms are published
});

// PLACEHOLDER — have this reviewed by an appropriate adviser before launch.
export default function Page() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Terms of Use", path: "/terms" }]} />}
        title="Terms of Use"
      />
      <Container className="prose prose-neutral max-w-3xl">
        <p>
          This page is being finalised. For any questions in the meantime, contact{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Container>
    </>
  );
}
