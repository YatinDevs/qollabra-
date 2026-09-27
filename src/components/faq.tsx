import { faqSchema, graph } from "@/lib/seo";
import { JsonLd } from "./json-ld";

export function Faq({
  items,
  dark = false,
  heading = "Frequently asked questions",
}: {
  items: { q: string; a: string }[];
  dark?: boolean;
  heading?: string;
}) {
  if (!items.length) return null;
  const line = dark ? "border-q-line" : "border-line";
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className={dark ? "font-mono text-2xl" : "font-serif text-3xl"}>
        {heading}
      </h2>
      <div className={`mt-6 border-t ${line}`}>
        {items.map((item) => (
          <details key={item.q} className={`faq border-b ${line} py-4`}>
            <summary className="flex items-start justify-between gap-6 font-medium">
              {item.q}
              <span aria-hidden className="faq-icon text-xl leading-none transition-transform">+</span>
            </summary>
            <p className={`mt-3 max-w-3xl ${dark ? "text-q-muted" : "text-muted"}`}>{item.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={graph(faqSchema(items))} />
    </section>
  );
}
