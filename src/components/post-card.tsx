import Link from "next/link";
import { formatDate, type Post } from "@/lib/blog";

export function PostCard({ post, dark = false }: { post: Post; dark?: boolean }) {
  return (
    <article
      className={`group relative flex flex-col rounded-2xl border p-6 transition-colors ${
        dark ? "border-q-line bg-q-panel hover:border-q-muted" : "border-line bg-white hover:border-charcoal/40"
      }`}
    >
      <p className={`text-xs ${dark ? "text-q-muted" : "text-muted"}`}>
        <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time> · {post.readingMinutes} min read
      </p>
      <h3 className={`mt-3 text-lg font-semibold leading-snug ${dark ? "" : "font-serif"}`}>
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.meta.title}
        </Link>
      </h3>
      <p className={`mt-2 line-clamp-3 text-sm ${dark ? "text-q-muted" : "text-muted"}`}>{post.meta.description}</p>
      <p className={`mt-4 flex flex-wrap gap-2 text-xs ${dark ? "text-q-muted" : "text-muted"}`}>
        {post.meta.tags.map((t) => (
          <span key={t} className={`rounded-full px-2 py-0.5 ${dark ? "bg-q-bg" : "bg-sand"}`}>{t}</span>
        ))}
      </p>
    </article>
  );
}
