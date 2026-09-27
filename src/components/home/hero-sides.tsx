import { ArrowRight, Boxes, Database, Layers, Server, Workflow } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const nodes = [
  { icon: Server, label: "API", angle: -135 },
  { icon: Workflow, label: "Queue", angle: -45 },
  { icon: Boxes, label: "Workers", angle: 45 },
  { icon: Database, label: "Data", angle: 135 },
];
const ORBIT = 72; // px from centre, in the 200-unit drawing

/** Left of the hero: a system core with its components in orbit and data flowing out — mirrors the Qohort ring. */
export function HeroSystemCard() {
  return (
    <Link href="/services/scalable-async-systems" className="group block w-60 text-left">
      <div className="relative mx-auto aspect-square w-52">
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#1f1f1f"
            strokeOpacity="0.15"
            strokeDasharray="3 6"
            className="animate-spin-slow"
          />
          {nodes.map(({ label, angle }, i) => {
            const rad = (angle * Math.PI) / 180;
            const dx = Math.cos(rad) * ORBIT;
            const dy = Math.sin(rad) * ORBIT;
            return (
              <g key={label}>
                <line
                  x1="100"
                  y1="100"
                  x2={100 + dx}
                  y2={100 + dy}
                  stroke="#ff9a33"
                  strokeOpacity="0.45"
                  strokeDasharray="2 4"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="3"
                  fill="#ff9a33"
                  className="animate-spoke"
                  style={{ "--dx": `${dx}px`, "--dy": `${dy}px`, animationDelay: `${i * 0.6}s` } as React.CSSProperties}
                />
              </g>
            );
          })}
          <circle cx="100" cy="100" r="34" fill="#fff" stroke="#ff9a33" strokeWidth="1.25" />
          <circle cx="100" cy="100" r="44" fill="none" stroke="#ff9a33" strokeOpacity="0.2" />
        </svg>

        {/* Core */}
        <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <Layers aria-hidden className="h-6 w-6 text-brand-ink" strokeWidth={1.75} />
        </span>

        {/* Components in orbit */}
        {nodes.map(({ icon: Icon, label, angle }) => {
          const rad = (angle * Math.PI) / 180;
          const left = 50 + (Math.cos(rad) * ORBIT) / 2;
          const top = 50 + (Math.sin(rad) * ORBIT) / 2;
          return (
            <span
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-charcoal shadow-sm">
                <Icon aria-hidden className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                {label}
              </span>
            </span>
          );
        })}
      </div>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-ink">
        Systems that scale
        <ArrowRight aria-hidden className="h-3.5 w-3.5 text-brand-ink transition-transform group-hover:translate-x-0.5" />
      </p>
    </Link>
  );
}

const SEATS = 12;

/** Right of the hero: a cohort forming — seats lighting up around the Qohort mark. */
export function HeroQohortCard() {
  return (
    <Link href="/qohort" className="group block w-60 text-left">
      <div className="relative mx-auto aspect-square w-52">
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#1f1f1f"
            strokeOpacity="0.15"
            strokeDasharray="3 6"
            className="animate-spin-slow"
          />
          <circle cx="100" cy="100" r="62" fill="#1c1c1c" />
          {Array.from({ length: SEATS }, (_, i) => {
            const a = (i / SEATS) * Math.PI * 2 - Math.PI / 2;
            return (
              <circle
                key={i}
                cx={100 + Math.cos(a) * 78}
                cy={100 + Math.sin(a) * 78}
                r="5.5"
                className="animate-seat fill-brand"
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            );
          })}
        </svg>
        <Image
          src="/brand/qohort-paper.png"
          alt="Qohort"
          width={216}
          height={82}
          className="absolute left-1/2 top-1/2 w-24 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <p className="mt-3 flex items-center justify-center gap-1.5 font-mono text-sm text-ink">
        Learn to build it
        <ArrowRight aria-hidden className="h-3.5 w-3.5 text-brand-ink transition-transform group-hover:translate-x-0.5" />
      </p>
    </Link>
  );
}
