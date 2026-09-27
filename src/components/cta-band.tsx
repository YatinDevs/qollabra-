import Link from "next/link";
import { Container } from "./container";

export function CtaBand({
  title = "Start with a focused discovery workshop",
  body = "We map the business outcome, the current process, the data and the constraints — then agree the smallest production-ready version worth building.",
  href = "/discovery-workshop",
  label = "Book a discovery call",
}: {
  title?: string;
  body?: string;
  href?: string;
  label?: string;
}) {
  return (
    <Container className="mt-24">
      <div className="rounded-3xl bg-ink px-6 py-12 text-white sm:px-12">
        <h2 className="max-w-2xl font-serif text-3xl sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-white/75">{body}</p>
        <div className="mt-8">
          <Link
            href={href}
            className="inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-ink hover:bg-white"
          >
            {label} →
          </Link>
        </div>
      </div>
    </Container>
  );
}
