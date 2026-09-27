# qollabra.com

Next.js 16 (App Router) + Tailwind v4 + MDX. Every page is statically prerendered; the only
server code is the lead-form Server Action (`src/app/actions/lead.ts`).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # must show every route as ○ or ● (static)
```

Copy `.env.example` → `.env.local` and set `LEAD_WEBHOOK_URL` to receive form submissions.

## Where things live

| What | File |
| --- | --- |
| Site name, email, phone, social links, nav | `src/lib/site.ts` |
| Service pages | `src/content/services.ts` |
| Case studies | `src/content/work.ts` |
| Qohort tiers, seminars, FAQs | `src/content/qohort.ts` |
| Blog posts | `src/content/blog/*.mdx` |
| Metadata + JSON-LD helpers | `src/lib/seo.ts` |
| Social cards (OG images) | `src/lib/og.tsx` + `opengraph-image.tsx` files |
| Colours / fonts | `src/app/globals.css`, `src/app/layout.tsx` |
| Logos | `public/brand/` |

Adding a service, case study or tier to its content file automatically creates the page, the
sitemap entry, the social card, `llms.txt` entry and structured data.

## Publishing a blog post

1. Create `src/content/blog/<url-slug>.mdx`:

   ```mdx
   export const metadata = {
     title: "Under ~65 characters, containing the phrase people search for",
     description: "140–160 characters. This is the Google snippet and LinkedIn preview text.",
     date: "2026-10-04",
     tags: ["Applied GenAI"],
     author: "Qollabra Engineering",
     brand: "qollabra", // or "qohort" — switches the CTA and social card style
     // linkedin: "https://www.linkedin.com/posts/...",  // add after posting
     // draft: true,
   };

   Your article in Markdown…
   ```

2. Link to at least one service / tier page and one other post (internal links matter).
3. Deploy. Sitemap, RSS, `llms.txt` and the social card update automatically.
4. Post on LinkedIn: a native summary (the key argument or checklist) with the article link,
   then add that post URL as `linkedin` in the metadata.

## Launch checklist

- [ ] Deploy to Vercel, set `NEXT_PUBLIC_SITE_URL=https://qollabra.com` and `LEAD_WEBHOOK_URL`.
- [ ] Point qollabra.com at it; redirect `www` → apex (Vercel domain settings).
- [ ] Google Search Console: verify the domain, submit `https://qollabra.com/sitemap.xml`.
- [ ] Bing Webmaster Tools: import from Search Console (also feeds ChatGPT search / Copilot).
- [ ] Google Business Profile for Qollabra (Pune) — important for local "AI course Pune" searches.
- [ ] Fill in `site.social` in `src/lib/site.ts` once the LinkedIn company page / YouTube exist.
- [ ] Replace the placeholder Privacy and Terms pages, then remove their `noindex`.
- [ ] Add founder/team bios with photos to `/about`.
- [ ] Get SVG versions of the logos from the designer.
- [ ] Test social cards with LinkedIn Post Inspector and Google's Rich Results Test.
