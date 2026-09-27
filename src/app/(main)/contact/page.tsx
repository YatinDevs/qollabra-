import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: `Talk to Qollabra about product engineering, applied GenAI or the Qohort programme. Email ${site.email} or call ${site.phone}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />}
        eyebrow="Contact"
        title="Let's talk"
        lead="Tell us about the problem you're working on. We'll reply within two working days."
      />
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
        <address className="space-y-6 not-italic">
          <div>
            <h2 className="text-sm font-semibold">Email</h2>
            <a href={`mailto:${site.email}`} className="text-lg hover:text-brand-ink">{site.email}</a>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Phone</h2>
            <a href={`tel:${site.phoneE164}`} className="text-lg hover:text-brand-ink">{site.phone}</a>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Location</h2>
            <p className="text-lg">{site.address.locality}, India · working with teams worldwide</p>
          </div>
        </address>
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
          <LeadForm
            kind="contact"
            source="/contact"
            interests={[
              { value: "project", label: "A software or AI project" },
              { value: "qohort", label: "The Qohort programme" },
              { value: "seminar", label: "A college seminar" },
              { value: "other", label: "Something else" },
            ]}
            organisationLabel="Company / college"
            messageLabel="Message"
          />
        </div>
      </Container>
    </>
  );
}
