"use client";

import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { services } from "@/content/services";
import { QMark } from "./q-mark";
import { ServiceIcon } from "./service-icon";

const links = [
  { href: "/work", label: "Work" },
  { href: "/qohort", label: "Qohort" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation (adjusting state during render, per React docs, instead of an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setServicesOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServicesSoon = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || mobileOpen ? "border-line bg-paper/85 backdrop-blur-xl" : "border-transparent bg-paper"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Qollabra home">
          <QMark className="h-7 w-auto text-brand" />
          <span className="font-serif text-[1.35rem] font-semibold tracking-tight text-charcoal">
            Qollabra
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          <div className="relative" onMouseEnter={openServices} onMouseLeave={closeServicesSoon}>
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              onClick={() => setServicesOpen((v) => !v)}
              className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors hover:text-ink ${
                isActive("/services") ? "text-ink" : "text-muted"
              }`}
            >
              Services
              <ChevronDown
                aria-hidden
                className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  id="services-menu"
                  initial={reduce ? false : { opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-3"
                >
                  <ul className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-white p-2 shadow-[0_20px_50px_-20px_rgba(31,31,31,0.2)]">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-sand"
                        >
                          <ServiceIcon slug={s.slug} className="mt-0.5 h-4 w-4 shrink-0 text-muted group-hover:text-brand-ink" />
                          <span>
                            <span className="block text-sm font-medium text-ink">{s.name}</span>
                            <span className="block text-xs text-muted">{s.short}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors hover:text-ink ${
                isActive(l.href) ? "text-ink" : "text-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="/contact"
            className="hidden rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-ink lg:inline-flex"
          >
            Contact
          </Link>
          <Link
            href="/discovery-workshop"
            className="group hidden items-center gap-1.5 rounded-full bg-ink py-2 pl-4 pr-3.5 text-sm font-medium text-white transition-colors hover:bg-charcoal sm:inline-flex"
          >
            Book a call
            <ArrowRight
              aria-hidden
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-sand md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper px-2 pb-4 pt-2 md:hidden"
          >
            <p className="px-3 pb-1 pt-2 text-xs uppercase tracking-[0.16em] text-muted">Services</p>
            <ul className="grid gap-0.5 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-sand"
                  >
                    <ServiceIcon slug={s.slug} className="h-4 w-4 text-brand-ink" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="my-2 h-px bg-line" />
            <ul>
              {[...links, { href: "/contact", label: "Contact" }].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-xl px-3 py-2.5 text-base font-medium hover:bg-sand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/discovery-workshop"
              className="mx-1 mt-3 flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-medium text-white"
            >
              Book a discovery call <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
