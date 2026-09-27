import Link from "next/link";
import { breadcrumbSchema, graph } from "@/lib/seo";
import { JsonLd } from "./json-ld";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail + BreadcrumbList structured data. First crumb should be Home. */
export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-xs ${dark ? "text-q-muted" : "text-muted"}`}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => (
            <li key={item.path} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {i === items.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path} className={dark ? "hover:text-q-text" : "hover:text-ink"}>
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={graph(breadcrumbSchema(items))} />
    </>
  );
}
