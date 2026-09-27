import { tiers } from "@/content/qohort";
import { services } from "@/content/services";
import { caseStudies } from "@/content/work";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, qohort, site } from "@/lib/site";

export const dynamic = "force-static";

/** llms.txt (https://llmstxt.org) — a plain-language map of the site for AI assistants and answer engines. */
export async function GET() {
  const posts = await getAllPosts();
  const link = (title: string, path: string, note?: string) =>
    `- [${title}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;

  const body = `# ${site.name}

> ${site.description}

Contact: ${site.email} · ${site.phone} · ${site.address.locality}, India

## Services
${services.map((s) => link(s.name, `/services/${s.slug}`, s.summary)).join("\n")}
${link("Discovery workshop", "/discovery-workshop", "Recommended first step for new engagements")}

## Case studies
${caseStudies.map((c) => link(c.title, `/work/${c.slug}`, c.description)).join("\n")}

## ${qohort.name} — ${qohort.programme}
${qohort.description}
${tiers.map((t) => link(`Tier ${t.number}: ${t.name}`, `/qohort/${t.slug}`, t.exit)).join("\n")}
${link("College seminars", "/qohort/seminars")}

## Blog
${posts.map((p) => link(p.meta.title, `/blog/${p.slug}`, p.meta.description)).join("\n")}

## Optional
${link("About", "/about")}
${link("Contact", "/contact")}
`;

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
