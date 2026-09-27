import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for qollabra.com.",
  path: "/privacy",
  noindex: true, // remove once the final policy is published
});

// PLACEHOLDER — have this reviewed by an appropriate adviser before launch.
export default function Page() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }]} />}
        title="Privacy Policy"
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
