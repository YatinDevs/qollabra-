import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { QMark } from "@/components/q-mark";
import { HeroQohortCard, HeroSystemCard } from "./hero-sides";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 text-center sm:px-6 sm:pb-24 sm:pt-16 lg:pb-32">
        <div className="absolute left-4 top-8 hidden xl:block">
          <HeroSystemCard />
        </div>
        <div className="absolute right-4 top-8 hidden xl:block">
          <HeroQohortCard />
        </div>

        {/* The balloon Q: lift — taking an idea from the ground to production. */}
        <div aria-hidden className="relative mx-auto flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
          <div className="absolute inset-0 rounded-full bg-brand/30 blur-3xl" />
          <div className="absolute inset-3 rounded-full border border-brand/15" />
          <div className="absolute -inset-6 rounded-full border border-brand/10" />
          {/* Where the travelling Q (ScrollQ) starts; same box as the static mark below. */}
          <span
            data-q-anchor=""
            data-q-rotate="0"
            className="absolute left-1/2 top-1/2 h-24 w-[67.6px] -translate-x-1/2 -translate-y-1/2 sm:h-28 sm:w-[78.8px]"
          />
          <div className="animate-q-rise relative transition-opacity duration-300 [.q-travel_&]:opacity-0">
            <QMark gradient className="animate-q-float h-24 w-auto drop-shadow-[0_18px_24px_rgba(224,116,26,0.35)] sm:h-28" />
          </div>
        </div>

        <h1 className="animate-rise-soft mx-auto mt-8 max-w-4xl sm:mt-10 font-serif text-[2.3rem] leading-[1.05] tracking-[-0.03em] text-ink min-[400px]:text-[2.6rem] sm:text-7xl lg:text-[5.25rem]">
          We build the system,
          <br />
          <span className="italic text-brand-ink">not just the demo.</span>
        </h1>

        <p
          className="animate-rise mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-muted sm:mt-7 sm:text-xl"
          style={{ animationDelay: "120ms" }}
        >
          Product engineering and applied AI for complex, high-stakes workflows.
        </p>

        <div
          className="animate-rise mx-auto mt-8 flex max-w-xs flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
          style={{ animationDelay: "200ms" }}
        >
          <Link
            href="/discovery-workshop"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-charcoal sm:py-3"
          >
            Book a discovery call
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-charcoal/30 sm:py-3"
          >
            See our work
          </Link>
        </div>

        {/* Below xl there is no room beside the Q, so the two visuals sit as a pair under the CTAs. */}
        <div className="mx-auto mt-14 grid max-w-md grid-cols-2 justify-items-center gap-2 xl:hidden">
          <div className="h-[178px] w-[168px]">
            <div className="w-60 origin-top-left scale-[0.7]">
              <HeroSystemCard />
            </div>
          </div>
          <div className="h-[178px] w-[168px]">
            <div className="w-60 origin-top-left scale-[0.7]">
              <HeroQohortCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
