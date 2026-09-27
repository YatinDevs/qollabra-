"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { QMark } from "./q-mark";

/** Size the travelling Q is drawn at; waypoints scale it relative to this (matches the hero Q). */
const BASE_H = 112;
const BASE_W = (BASE_H * 107) / 152;

type Frame = { s: number; x: number; y: number; scale: number; rotate: number };

// Client-only switch: false during SSR/hydration, true once mounted in the browser.
const noopSubscribe = () => () => {};

/** Piecewise interpolation between waypoints, eased so the Q settles at each stop. */
function sample(frames: Frame[], s: number, key: "x" | "y" | "scale" | "rotate") {
  if (!frames.length) return 0;
  if (s <= frames[0].s) return frames[0][key];
  for (let i = 1; i < frames.length; i++) {
    const a = frames[i - 1];
    const b = frames[i];
    if (s <= b.s) {
      const t = (s - a.s) / (b.s - a.s || 1);
      const e = t * t * (3 - 2 * t);
      return a[key] + (b[key] - a[key]) * e;
    }
  }
  // Past the final stop (the footer dock) the Q rides along with the page, staying on the logo.
  const last = frames[frames.length - 1];
  return key === "y" ? last.y - (s - last.s) : last[key];
}

type TrailPoint = { s: number; x: number; y: number };
const SAMPLES_PER_LEG = 28;
const SVG_NS = "http://www.w3.org/2000/svg";

/** The Q's path through the document (not the viewport), sampled so the trail follows it exactly. */
function trajectory(frames: Frame[]): TrailPoint[] {
  const pts: TrailPoint[] = [];
  for (let i = 1; i < frames.length; i++) {
    const a = frames[i - 1];
    const b = frames[i];
    for (let k = i === 1 ? 0 : 1; k <= SAMPLES_PER_LEG; k++) {
      const t = k / SAMPLES_PER_LEG;
      const e = t * t * (3 - 2 * t);
      const sc = a.s + (b.s - a.s) * t;
      pts.push({ s: sc, x: a.x + (b.x - a.x) * e, y: sc + a.y + (b.y - a.y) * e });
    }
  }
  return pts;
}

/**
 * The balloon-Q that travels with the reader: it starts as the hero mark, drifts between
 * [data-q-anchor] waypoints in each section, and docks into the footer logo.
 * Waypoints are breakpoint-specific (gutter stops on desktop, in-flow stops on mobile); only
 * visible anchors are used. Hidden entirely for reduced-motion users.
 */
export function ScrollQ() {
  const reduce = useReducedMotion();
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const enabled = mounted && !reduce;

  const frames = useRef<Frame[]>([]);
  const trail = useRef<TrailPoint[]>([]);
  const trailPath = useRef<SVGPathElement>(null);
  const rings = useRef<SVGGElement>(null);
  const { scrollY } = useScroll();
  const opacity = useMotionValue(0);
  // Bumped after every re-measure so the transforms below recompute against the new frames.
  const version = useMotionValue(0);

  // Recomputed on every scroll change and after every re-measure (version bump).
  const inputs = [scrollY, version];
  const at = (key: "x" | "y" | "scale" | "rotate") => (v: number[]) => sample(frames.current, v[0], key);
  const x = useTransform(inputs, (v: number[]) => at("x")(v) - BASE_W / 2);
  const y = useTransform(inputs, (v: number[]) => at("y")(v) - BASE_H / 2);
  const scale = useTransform(inputs, at("scale"));
  const rotate = useTransform(inputs, at("rotate"));

  useEffect(() => {
    const root = document.documentElement;
    if (!enabled) {
      root.classList.remove("q-travel");
      opacity.set(0);
      return;
    }

    // Dashed circle at every intermediate stop (the hero has its own rings; the footer is the dock).
    const buildRings = (list: Frame[]) => {
      const g = rings.current;
      if (!g) return;
      g.replaceChildren(
        ...list.slice(1, -1).map((f) => {
          const c = document.createElementNS(SVG_NS, "circle");
          c.setAttribute("cx", String(f.x));
          c.setAttribute("cy", String(f.s + f.y));
          // Keep each ring inside the viewport on narrow screens.
          const vw = root.clientWidth;
          const r = Math.min(f.scale * BASE_H * 0.78, f.x - 3, vw - f.x - 3);
          c.setAttribute("r", String(Math.max(r, f.scale * BASE_W * 0.7)));
          c.dataset.s = String(f.s);
          c.setAttribute("class", "q-ring animate-spin-slow");
          return c;
        }),
      );
    };

    // Draw the dotted trail up to the Q's current position and light the rings it has reached.
    const draw = () => {
      const pts = trail.current;
      const sy = scrollY.get();
      const path = trailPath.current;
      if (path && pts.length && sy <= pts[0].s + 24) {
        // Nothing to draw yet — avoids a lone dot showing through the Q's counter in the hero.
        path.setAttribute("d", "");
      } else if (path && pts.length) {
        let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
        for (let i = 1; i < pts.length && pts[i].s <= sy; i++) {
          d += `L${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`;
        }
        const head = { x: sample(frames.current, sy, "x"), y: sy + sample(frames.current, sy, "y") };
        d += `L${head.x.toFixed(1)} ${head.y.toFixed(1)}`;
        path.setAttribute("d", d);
      }
      rings.current?.querySelectorAll<SVGCircleElement>("circle").forEach((c) => {
        const gap = Math.abs(sy - Number(c.dataset.s));
        c.style.opacity = sy + 60 >= Number(c.dataset.s) ? (gap < 160 ? "1" : "0.45") : "0.15";
      });
    };
    const unsubscribe = scrollY.on("change", draw);

    const measure = () => {
      const vh = window.innerHeight;
      const max = Math.max(0, root.scrollHeight - vh);
      const sy = window.scrollY;
      const list = Array.from(document.querySelectorAll<HTMLElement>("[data-q-anchor]"))
        .filter((el) => el.offsetParent !== null)
        .map((el) => {
          const r = el.getBoundingClientRect();
          const cy = r.top + sy + r.height / 2;
          const s = Math.min(Math.max(cy - vh / 2, 0), max);
          return {
            s,
            x: r.left + r.width / 2,
            y: cy - s,
            scale: r.height / BASE_H,
            rotate: Number(el.dataset.qRotate ?? 0),
          };
        })
        .sort((a, b) => a.s - b.s);
      // Keep scroll positions strictly increasing so every segment has a length.
      for (let i = 1; i < list.length; i++) {
        if (list[i].s <= list[i - 1].s) list[i].s = list[i - 1].s + 1;
      }
      frames.current = list;
      trail.current = trajectory(list);
      buildRings(list);
      version.set(version.get() + 1);
      draw();
    };

    // Hand over from the static hero Q once its entrance has played, or on first scroll.
    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      measure();
      root.classList.add("q-travel");
      opacity.set(1);
    };
    const timer = window.setTimeout(show, 1400);
    window.addEventListener("scroll", show, { once: true, passive: true });

    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return; // mobile URL bar show/hide — keep the route stable
      lastWidth = window.innerWidth;
      measure();
    };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(measure);
    measure();

    return () => {
      unsubscribe();
      window.clearTimeout(timer);
      window.removeEventListener("scroll", show);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      root.classList.remove("q-travel");
    };
  }, [enabled, opacity, version, scrollY]);

  if (!enabled) return null;

  // Portalled to <body>. The trail sits behind the page content (z-0 < main's z-10); the Q itself
  // is on top of everything, including the sticky header (z-50). pointer-events-none keeps it
  // from ever blocking a click. The trail lives in document coordinates; the Q is fixed.
  return createPortal(
    <>
      <motion.svg
        aria-hidden
        width="1"
        height="1"
        className="pointer-events-none absolute left-0 top-0 z-0 overflow-visible"
        style={{ opacity }}
      >
        <path
          ref={trailPath}
          fill="none"
          stroke="#ff9a33"
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="0.5 9"
        />
        <g ref={rings} />
      </motion.svg>
      <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60]"
      style={{ x, y, scale, rotate, opacity, width: BASE_W, height: BASE_H }}
    >
      <QMark
        gradient
        className="animate-q-float h-full w-full drop-shadow-[0_18px_24px_rgba(224,116,26,0.35)]"
      />
      </motion.div>
    </>,
    document.body,
  );
}
