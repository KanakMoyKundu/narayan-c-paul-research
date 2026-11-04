"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Section, useCountUp } from "./primitives";
import RichText from "./RichText";
import {
  citationsByYear,
  datasetStats,
  topCited,
  yearCounts,
} from "@/lib/derive";

export default function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduced = useReducedMotion();

  const maxYear = Math.max(...yearCounts.map((y) => y.count), 1);
  const maxCitations = Math.max(...citationsByYear.map((c) => c.citations), 1);
  const maxTop = topCited[0]?.cited_by ?? 1;

  const records = useCountUp(datasetStats.totalRecords, inView, 1.1);
  const cited = useCountUp(datasetStats.withCitations, inView, 1.2);
  const peak = useCountUp(datasetStats.highestCited, inView, 1.3);
  const sum = useCountUp(datasetStats.citationSum, inView, 1.5);

  return (
    <Section
      id="impact"
      index="05"
      eyebrow="Impact"
      title={
        <>
          Citation and output <span className="italic text-accent">analytics</span>
        </>
      }
      lede="Every figure below is computed from the citation values recorded in the supplied export. They are dataset values, not a live Google Scholar profile."
    >
      <div ref={ref}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-y border-line/70 py-10 lg:grid-cols-4">
          <Stat value={records} label="Records in dataset" index={0} inView={inView} />
          <Stat
            value={cited}
            label="Records carrying a citation value"
            index={1}
            inView={inView}
          />
          <Stat
            value={peak}
            label="Highest single-record citations"
            index={2}
            inView={inView}
          />
          <Stat
            value={sum}
            label="Sum of supplied citation values"
            hint="Not a Scholar profile total"
            index={3}
            inView={inView}
          />
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          <div>
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-2xl tracking-tight">
                Records per year
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {datasetStats.yearRange.min}–{datasetStats.yearRange.max}
              </span>
            </div>
            <div className="mt-8 flex h-52 items-end gap-1.5">
              {yearCounts.map((y, i) => (
                <div
                  key={y.year}
                  className="group relative flex flex-1 flex-col items-center justify-end"
                >
                  <span className="mb-1.5 font-mono text-[9px] tabular-nums text-muted opacity-0 transition-opacity group-hover:opacity-100">
                    {y.count}
                  </span>
                  <motion.div
                    className="w-full rounded-sm bg-accent/70 transition-colors group-hover:bg-accent"
                    initial={reduced ? { height: "0%" } : { height: 0 }}
                    animate={
                      inView
                        ? { height: `${(y.count / maxYear) * 100}%` }
                        : { height: 0 }
                    }
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + i * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ minHeight: y.count === 0 ? 2 : undefined }}
                  />
                  <motion.span
                    className="mt-2 font-mono text-[9px] tabular-nums text-muted"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.03 }}
                  >
                    {String(y.year).slice(2)}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-2xl tracking-tight">
                Citation values by year
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Source values
              </span>
            </div>
            <div className="relative mt-8 h-52">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="h-full w-full"
              >
                <defs>
                  <linearGradient id="imp-area" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="rgb(var(--accent))"
                      stopOpacity="0.35"
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(var(--accent))"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                {inView && (
                  <>
                    <motion.path
                      d={areaPath(citationsByYear, maxCitations)}
                      fill="url(#imp-area)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.9, delay: 0.7 }}
                    />
                    <motion.path
                      d={linePath(citationsByYear, maxCitations)}
                      fill="none"
                      stroke="rgb(var(--accent))"
                      strokeWidth={1.4}
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 1.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </>
                )}
              </svg>
              <div className="mt-3 flex justify-between font-mono text-[9px] tabular-nums text-muted">
                <span>{citationsByYear[0]?.year}</span>
                <span>{citationsByYear[citationsByYear.length - 1]?.year}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-2xl tracking-tight">
              Most-cited records
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Top {Math.min(8, topCited.length)}
            </span>
          </div>

          <ul className="mt-8 space-y-1">
            {topCited.slice(0, 8).map((p, i) => {
              const w = ((p.cited_by ?? 0) / maxTop) * 100;
              return (
                <li key={p.id} className="group relative">
                  <div className="relative flex items-center gap-4 border-b border-line/60 py-3.5">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-accent/[0.07]"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${w}%` } : { width: 0 }}
                      transition={{
                        duration: 1.0,
                        delay: 0.1 + i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                    <span className="relative w-6 shrink-0 font-mono text-[10px] tabular-nums text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative flex-1 text-[13px] leading-snug sm:text-sm">
                      <RichText text={p.title} />
                    </span>
                    <span className="relative shrink-0 font-mono text-xs tabular-nums text-accent">
                      {p.cited_by}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-8 font-mono text-[10px] leading-relaxed text-muted/80">
          {datasetStats.excludedRecords} of {datasetStats.totalRecords} supplied
          records are excluded from these aggregates because they carry
          incomplete or anomalous metadata.
        </p>
      </div>
    </Section>
  );
}

function Stat({
  value,
  label,
  hint,
  index,
  inView,
}: {
  value: number;
  label: string;
  hint?: string;
  index: number;
  inView: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="font-display text-4xl tabular-nums tracking-tight sm:text-5xl">
        {value.toLocaleString("en-US")}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted">
        {label}
      </div>
      {hint && (
        <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted/60">
          {hint}
        </div>
      )}
    </motion.div>
  );
}

function linePath(data: { year: number; citations: number }[], max: number) {
  const minYear = data[0]?.year ?? 0;
  const maxYear = data[data.length - 1]?.year ?? 1;
  const span = Math.max(1, maxYear - minYear);
  return data
    .map((d, i) => {
      const x = ((d.year - minYear) / span) * 100;
      const y = 100 - (d.citations / max) * 92 - 4;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function areaPath(data: { year: number; citations: number }[], max: number) {
  return `${linePath(data, max)} L100,100 L0,100 Z`;
}