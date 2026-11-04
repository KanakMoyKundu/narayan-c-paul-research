"use client";

import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Section } from "./primitives";
import RichText from "./RichText";
import { usePublication } from "./PublicationModal";
import {
  THEMES,
  analyticRecords,
  formatCitations,
  primaryTheme,
  publicationType,
} from "@/lib/derive";
import type { Publication } from "@/data/researcher";

const W = 1200;
const H = 620;
const PAD = { l: 78, r: 40, t: 48, b: 62 };

export default function Universe() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [focused, setFocused] = useState<Publication | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { open } = usePublication();
  const reduced = useReducedMotion();

  const yearValues = analyticRecords
    .map((p) => p.year)
    .filter((y): y is number => y !== null);
  const minYear = yearValues.length ? Math.min(...yearValues) : 2010;
  const maxYear = yearValues.length
    ? Math.max(...yearValues)
    : new Date().getFullYear();
  const maxCites = Math.max(
    ...analyticRecords.map((p) => p.cited_by ?? 0),
    1
  );

  const nodes = useMemo(() => {
    const yearSpan = Math.max(1, maxYear - minYear);
    const x = (year: number) =>
      PAD.l + ((year - minYear) / yearSpan) * (W - PAD.l - PAD.r);
    const y = (cites: number | null) => {
      if (cites === null) return H - PAD.b;
      const t = Math.sqrt(cites) / Math.sqrt(maxCites);
      return H - PAD.b - t * (H - PAD.t - PAD.b);
    };
    return analyticRecords
      .filter((p) => p.year !== null)
      .map((p) => ({
        pub: p,
        x: x(p.year!),
        y: y(p.cited_by),
        r: 3 + Math.sqrt(p.cited_by ?? 0) * 0.42,
      }));
  }, [minYear, maxYear, maxCites]);

  const yearTicks = useMemo(() => {
    const out: number[] = [];
    for (let y = minYear; y <= maxYear; y++) out.push(y);
    return out;
  }, [minYear, maxYear]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFocused(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isDim = (p: Publication) => {
    if (!activeTheme) return false;
    return !THEMES.some(
      (t) => t.id === activeTheme && t.pattern.test(`${p.title} ${p.venue}`)
    );
  };

  return (
    <Section
      id="universe"
      index="08"
      eyebrow="Research universe"
      title={
        <>
          The dataset as a <span className="italic text-accent">field</span>
        </>
      }
      lede="Every record with a year plotted by publication year (horizontal) against its supplied citation value (vertical, square-root scale). Node size follows the same citation value."
    >
      <div className="mb-6 flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveTheme(null)}
          className={`rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors ${
            activeTheme === null
              ? "border-accent bg-accent/10 text-accent"
              : "border-line text-muted hover:border-accent/40"
          }`}
        >
          All themes
        </button>
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTheme((cur) => (cur === t.id ? null : t.id))}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors ${
              activeTheme === t.id
                ? "border-accent bg-accent/10 text-accent"
                : "border-line text-muted hover:border-accent/40 hover:text-ink"
            }`}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: t.hue }}
            />
            {t.short}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-md border border-line bg-surface">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Publication field plotted by year and citations"
        >
          {yearTicks.map((y, i) => {
            const x =
              PAD.l +
              ((y - minYear) / Math.max(1, maxYear - minYear)) *
                (W - PAD.l - PAD.r);
            return (
              <g key={y}>
                <motion.line
                  x1={x}
                  y1={PAD.t}
                  x2={x}
                  y2={H - PAD.b}
                  stroke="rgb(var(--line))"
                  strokeWidth={0.5}
                  strokeDasharray="1 6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.02 }}
                />
                <motion.text
                  x={x}
                  y={H - PAD.b + 20}
                  textAnchor="middle"
                  fill="rgb(var(--muted))"
                  style={{ font: "400 10px var(--font-mono)" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.02 }}
                >
                  {y}
                </motion.text>
              </g>
            );
          })}

          {[0.25, 0.5, 0.75, 1].map((t) => {
            const yy = H - PAD.b - t * (H - PAD.t - PAD.b);
            return (
              <g key={t}>
                <line
                  x1={PAD.l}
                  y1={yy}
                  x2={W - PAD.r}
                  y2={yy}
                  stroke="rgb(var(--line))"
                  strokeWidth={0.5}
                />
                <text
                  x={PAD.l - 12}
                  y={yy + 3}
                  textAnchor="end"
                  fill="rgb(var(--muted))"
                  style={{ font: "400 10px var(--font-mono)" }}
                >
                  {Math.round(t * t * maxCites)}
                </text>
              </g>
            );
          })}

          <text
            x={PAD.l}
            y={PAD.t - 20}
            fill="rgb(var(--muted))"
            style={{ font: "400 10px var(--font-mono)", letterSpacing: "0.18em" }}
          >
            CITATIONS (√ SCALE)
          </text>

          <line
            x1={PAD.l}
            y1={H - PAD.b}
            x2={W - PAD.r}
            y2={H - PAD.b}
            stroke="rgb(var(--accent))"
            strokeOpacity={0.35}
            strokeWidth={0.8}
          />

          {nodes.map((n, i) => {
            const theme = primaryTheme(n.pub);
            const dim = isDim(n.pub);
            const isHovered = hovered === n.pub.id;
            return (
              <motion.circle
                key={n.pub.id}
                cx={n.x}
                cy={n.y}
                fill={theme?.hue ?? "rgb(var(--accent))"}
                stroke="rgb(var(--surface))"
                initial={reduced ? false : { r: 0, opacity: 0 }}
                animate={{
                  r: isHovered ? n.r * 1.6 : n.r,
                  opacity: dim ? 0.12 : 0.92,
                  strokeWidth: isHovered ? 2 : 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: reduced ? 0 : Math.min(i * 0.012, 0.55),
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(n.pub.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setFocused(n.pub)}
              >
                <title>{n.pub.title}</title>
              </motion.circle>
            );
          })}
        </svg>

        <AnimatePresence>
          {hovered &&
            (() => {
              const n = nodes.find((x) => x.pub.id === hovered);
              if (!n) return null;
              const leftPct = (n.x / W) * 100;
              const topPct = (n.y / H) * 100;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.18 }}
                  className="pointer-events-none absolute z-10 w-64 rounded border border-line bg-bg/95 p-3 backdrop-blur-sm"
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: `translate(-50%, calc(-100% - 12px))`,
                  }}
                >
                  <p className="text-[12px] leading-snug">
                    <RichText text={n.pub.title} />
                  </p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                    {n.pub.year} · {formatCitations(n.pub.cited_by)} citations
                  </p>
                </motion.div>
              );
            })()}
        </AnimatePresence>
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        {nodes.length} records plotted · records without a year are excluded
      </p>

      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 grid gap-6 rounded-md border border-line bg-surface p-6 sm:grid-cols-[1fr_auto] sm:p-8"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  {publicationType(focused)}
                </span>
                <span className="font-mono text-[10px] tabular-nums text-muted">
                  {focused.year} · {formatCitations(focused.cited_by)} citations
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight sm:text-3xl">
                <RichText text={focused.title} />
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                {focused.authors}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {focused.venue || "Venue not supplied"}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => open(focused.id)}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] text-bg transition-colors hover:bg-accent"
                >
                  Open record
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </div>
            <button
              onClick={() => setFocused(null)}
              aria-label="Close record panel"
              className="flex h-8 w-8 items-start justify-center self-start rounded-full border border-line text-muted transition-transform hover:rotate-90 hover:text-accent"
            >
              <X size={13} className="mt-2" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}