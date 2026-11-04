"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./primitives";
import RichText from "./RichText";
import { usePublication } from "./PublicationModal";
import { analyticRecords, formatCitations } from "@/lib/derive";
import type { Publication } from "@/data/researcher";

export default function Timeline() {
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { open } = usePublication();

  const grouped = useMemo(() => {
    const map = new Map<number, Publication[]>();
    analyticRecords.forEach((p) => {
      if (p.year === null) return;
      if (!map.has(p.year)) map.set(p.year, []);
      map.get(p.year)!.push(p);
    });
    return [...map.entries()]
      .map(([year, pubs]) => ({
        year,
        pubs: pubs.sort((a, b) => (b.cited_by ?? 0) - (a.cited_by ?? 0)),
      }))
      .sort((a, b) => a.year - b.year);
  }, []);

  const maxCount = Math.max(...grouped.map((g) => g.pubs.length));

  const visible = useMemo(
    () =>
      selectedYear === "all"
        ? grouped
        : grouped.filter((g) => g.year === selectedYear),
    [grouped, selectedYear]
  );

  useEffect(() => {
    const groups = document.querySelectorAll<HTMLElement>("[data-year-group]");
    if (!groups.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) {
          const y = Number((top.target as HTMLElement).dataset.yearGroup);
          if (!Number.isNaN(y)) setSelectedYear((cur) => (cur === "all" ? cur : y));
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    groups.forEach((g) => io.observe(g));
    return () => io.disconnect();
  }, [visible]);

  const scrollToYear = (year: number) => {
    setSelectedYear(year);
    window.setTimeout(() => {
      const el = document.querySelector(`[data-year-group="${year}"]`);
      el?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "center",
      });
    }, 60);
  };

  return (
    <Section
      id="timeline"
      index="04"
      eyebrow="Publication timeline"
      title={
        <>
          Published output, <span className="italic text-accent">by year</span>
        </>
      }
      lede="A chronological view of the records in the supplied dataset. This is a publication timeline — not a career history."
    >
      <div
        ref={railRef}
        className="-mx-5 mb-12 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0"
      >
        <div className="flex min-w-max items-end gap-1.5">
          <button
            onClick={() => setSelectedYear("all")}
            className={`mb-0.5 mr-3 rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
              selectedYear === "all"
                ? "border-accent bg-accent text-bg"
                : "border-line text-muted hover:border-accent/50 hover:text-accent"
            }`}
          >
            All years
          </button>

          {grouped.map((g) => {
            const h = 18 + (g.pubs.length / maxCount) * 42;
            const isActive = selectedYear === g.year;
            return (
              <button
                key={g.year}
                onClick={() => scrollToYear(g.year)}
                className="group flex flex-col items-center gap-1.5"
                aria-label={`${g.year}: ${g.pubs.length} records`}
              >
                <span
                  className={`font-mono text-[10px] tabular-nums transition-colors ${
                    isActive ? "text-accent" : "text-muted/60"
                  }`}
                >
                  {g.pubs.length}
                </span>
                <motion.span
                  className={`w-[26px] rounded-sm transition-colors ${
                    isActive
                      ? "bg-accent"
                      : "bg-line group-hover:bg-accent/50"
                  }`}
                  animate={{ height: h }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
                <span
                  className={`font-mono text-[10px] tabular-nums transition-colors ${
                    isActive ? "text-ink" : "text-muted"
                  }`}
                >
                  {String(g.year).slice(2)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-[7px] top-2 hidden h-full w-px bg-line sm:block" />

        <AnimatePresence mode="popLayout">
          {visible.map((group) => (
            <motion.div
              key={group.year}
              data-year-group={group.year}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative pb-14 pl-0 sm:pl-10"
            >
              <span className="absolute left-0 top-[9px] hidden h-[15px] w-[15px] items-center justify-center rounded-full border border-line bg-bg sm:flex">
                <span className="h-[5px] w-[5px] rounded-full bg-accent" />
              </span>

              <div className="mb-5 flex items-baseline gap-4">
                <h3 className="font-display text-4xl tabular-nums tracking-tight sm:text-5xl">
                  {group.year}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {group.pubs.length}{" "}
                  {group.pubs.length === 1 ? "record" : "records"}
                </span>
              </div>

              <ul className="space-y-0">
                {group.pubs.map((p, i) => (
                  <motion.li
                    key={p.id}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min(i * 0.04, 0.3),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <button
                      onClick={() => open(p.id)}
                      data-cursor="view"
                      data-cursor-label="VIEW"
                      className="group grid w-full grid-cols-[1fr_auto] items-start gap-4 border-b border-line/60 py-4 text-left transition-colors hover:border-accent/40 sm:grid-cols-[1fr_120px_auto]"
                    >
                      <span className="text-[15px] leading-snug transition-colors group-hover:text-accent">
                        <RichText text={p.title} />
                      </span>
                      <span className="hidden truncate font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:block">
                        {p.venue.split(/[,(]/)[0].trim() || "—"}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-[11px] tabular-nums text-muted">
                          {formatCitations(p.cited_by)}
                        </span>
                        <ArrowUpRight
                          size={13}
                          className="text-muted/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                        />
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}