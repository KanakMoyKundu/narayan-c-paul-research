"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Section } from "./primitives";
import RichText from "./RichText";
import { usePublication } from "./PublicationModal";
import {
  DOMAINS,
  publicationsForDomain,
  themeIndex,
  THEMES,
} from "@/lib/derive";
import type { Publication } from "@/data/researcher";

const RADIUS = 196;
const CENTER = 320;
const SAT_RADIUS = RADIUS + 112;

const polar = (r: number, deg: number) => ({
  x: CENTER + r * Math.cos((deg * Math.PI) / 180),
  y: CENTER + r * Math.sin((deg * Math.PI) / 180),
});

export default function ResearchMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { open } = usePublication();

  const active = DOMAINS.find((d) => d.id === activeId) ?? null;

  const domainData = useMemo(
    () =>
      DOMAINS.map((d) => {
        const pubs = publicationsForDomain(d);
        return { domain: d, count: pubs.length };
      }),
    []
  );

  const activeData = useMemo(
    () => (active ? publicationsForDomain(active) : []),
    [active]
  );

  const satellites = useMemo(() => {
    if (!active) return [];
    const pubs = activeData.slice(0, 12);
    const span = 82;
    const start = active.angle - span / 2;
    const anchor = polar(RADIUS, active.angle);
    return pubs.map((p, i) => {
      const t = pubs.length === 1 ? 0.5 : i / (pubs.length - 1);
      const deg = start + t * span;
      const pos = polar(SAT_RADIUS, deg);
      return { pub: p, from: anchor, to: pos, deg };
    });
  }, [active, activeData]);

  return (
    <Section
      id="research"
      index="03"
      eyebrow="Research"
      title={
        <>
          Four domains, one <span className="italic text-accent">dataset</span>
        </>
      }
      lede="The declared research interests are shown as an interactive map. Selecting a domain draws its associated publications outward from the node."
      aside={
        <div className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted lg:block">
          Derived from title &amp; venue text
        </div>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-[680px]">
          <div className="relative aspect-square w-full">
            <svg
              viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`}
              className="h-full w-full"
              role="img"
              aria-label="Interactive research domain map"
            >
              <defs>
                <radialGradient id="rm-core">
                  <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
                </radialGradient>
              </defs>

              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="url(#rm-core)" />

              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke="rgb(var(--line))"
                strokeDasharray="2 6"
              />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={SAT_RADIUS}
                fill="none"
                stroke="rgb(var(--line))"
                strokeDasharray="2 10"
                opacity="0.5"
              />

              {domainData.map(({ domain }) => {
                const p = polar(RADIUS, domain.angle);
                const isActive = activeId === domain.id;
                const dim = activeId !== null && !isActive;
                return (
                  <motion.line
                    key={domain.id}
                    x1={CENTER}
                    y1={CENTER}
                    x2={p.x}
                    y2={p.y}
                    stroke={isActive ? "rgb(var(--accent))" : "rgb(var(--line))"}
                    strokeWidth={isActive ? 1.4 : 0.8}
                    animate={{ opacity: dim ? 0.22 : 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                );
              })}

              <AnimatePresence>
                {satellites.map((s, i) => (
                  <motion.line
                    key={`link-${s.pub.id}`}
                    x1={s.from.x}
                    y1={s.from.y}
                    x2={s.to.x}
                    y2={s.to.y}
                    stroke="rgb(var(--accent))"
                    strokeWidth={0.8}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.04 * i,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                ))}
              </AnimatePresence>

              <circle
                cx={CENTER}
                cy={CENTER}
                r={54}
                fill="rgb(var(--surface))"
                stroke="rgb(var(--line))"
              />
              <text
                x={CENTER}
                y={CENTER - 4}
                textAnchor="middle"
                className="fill-ink"
                style={{
                  font: "500 12px var(--font-mono)",
                  letterSpacing: "0.22em",
                }}
              >
                RESEARCH
              </text>
              <text
                x={CENTER}
                y={CENTER + 14}
                textAnchor="middle"
                fill="rgb(var(--muted))"
                style={{
                  font: "400 10px var(--font-mono)",
                  letterSpacing: "0.16em",
                }}
              >
                47 RECORDS
              </text>

              {domainData.map(({ domain, count }) => {
                const p = polar(RADIUS, domain.angle);
                const isActive = activeId === domain.id;
                const dim = activeId !== null && !isActive;
                return (
                  <motion.g
                    key={domain.id}
                    animate={{ opacity: dim ? 0.24 : 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      fill={
                        isActive ? "rgb(var(--accent))" : "rgb(var(--surface))"
                      }
                      stroke={
                        isActive ? "rgb(var(--accent))" : "rgb(var(--line))"
                      }
                      strokeWidth={isActive ? 1.5 : 1}
                      animate={{ r: isActive ? 36 : 26 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    />
                    <text
                      x={p.x}
                      y={p.y + 4}
                      textAnchor="middle"
                      fill={isActive ? "rgb(var(--bg))" : "rgb(var(--ink))"}
                      style={{
                        font: "500 12px var(--font-mono)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {count}
                    </text>
                  </motion.g>
                );
              })}

              <AnimatePresence>
                {satellites.map((s, i) => {
                  const theme = THEMES.find((t) =>
                    t.pattern.test(`${s.pub.title} ${s.pub.venue}`)
                  );
                  return (
                    <motion.circle
                      key={`sat-${s.pub.id}`}
                      r={7}
                      fill={theme?.hue ?? "rgb(var(--accent))"}
                      stroke="rgb(var(--surface))"
                      strokeWidth={1.5}
                      initial={{
                        cx: s.from.x,
                        cy: s.from.y,
                        scale: 0,
                        opacity: 0,
                      }}
                      animate={{
                        cx: s.to.x,
                        cy: s.to.y,
                        scale: 1,
                        opacity: 1,
                      }}
                      exit={{
                        cx: s.from.x,
                        cy: s.from.y,
                        scale: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.7,
                        delay: 0.05 + i * 0.035,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        cursor: "pointer",
                        transformOrigin: `${s.to.x}px ${s.to.y}px`,
                      }}
                      onClick={() => open(s.pub.id)}
                    >
                      <title>{s.pub.title}</title>
                    </motion.circle>
                  );
                })}
              </AnimatePresence>
            </svg>

            {domainData.map(({ domain, count }) => {
              const p = polar(RADIUS + 62, domain.angle);
              const isActive = activeId === domain.id;
              const left = (p.x / (CENTER * 2)) * 100;
              const top = (p.y / (CENTER * 2)) * 100;
              const dim = activeId !== null && !isActive;
              return (
                <button
                  key={domain.id}
                  onClick={() =>
                    setActiveId((cur) => (cur === domain.id ? null : domain.id))
                  }
                  data-cursor="explore"
                  data-cursor-label="SELECT"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className={`absolute max-w-[150px] px-1 text-center transition-opacity duration-500 ${
                    dim ? "opacity-25" : "opacity-100"
                  }`}
                >
                  <span
                    className={`block font-mono text-[10px] uppercase leading-tight tracking-[0.14em] transition-colors ${
                      isActive ? "text-accent" : "text-muted"
                    }`}
                  >
                    {domain.label}
                  </span>
                  <span className="mt-1 block font-mono text-[9px] tabular-nums text-muted/70">
                    {count} pubs
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {!active && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-muted"
              >
                Select a domain
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="relative min-h-[440px]">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-line/70 pt-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <motion.div
                      className="eyebrow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      Domain
                    </motion.div>
                    <motion.h3
                      className="mt-2 font-display text-3xl tracking-tight"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12, duration: 0.5 }}
                    >
                      {active.label}
                    </motion.h3>
                  </div>
                  <button
                    onClick={() => setActiveId(null)}
                    aria-label="Clear selection"
                    className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-transform duration-300 hover:rotate-90 hover:text-accent"
                  >
                    <X size={13} />
                  </button>
                </div>

                <motion.p
                  className="mt-4 text-sm leading-relaxed text-muted"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.18, duration: 0.5 }}
                >
                  {active.blurb}
                </motion.p>

                <motion.div
                  className="mt-5 flex flex-wrap gap-1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.24, duration: 0.5 }}
                >
                  {active.themeIds.map((tid) => {
                    const t = THEMES.find((x) => x.id === tid);
                    if (!t) return null;
                    return (
                      <span
                        key={tid}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: t.hue }}
                        />
                        {t.short}
                      </span>
                    );
                  })}
                </motion.div>

                <motion.div
                  className="mt-6 flex items-baseline gap-3 border-t border-line/70 pt-5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.5 }}
                >
                  <span className="font-display text-4xl tabular-nums">
                    {activeData.length}
                  </span>
                  <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.18em] text-muted">
                    matching records
                    <br />
                    in the supplied dataset
                  </span>
                </motion.div>

                <ul className="mt-6 max-h-[320px] space-y-0 overflow-y-auto pr-1">
                  {activeData.slice(0, 14).map((p, i) => (
                    <motion.li
                      key={p.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.3 + Math.min(i * 0.035, 0.4),
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <PublicationRow pub={p} onOpen={() => open(p.id)} />
                    </motion.li>
                  ))}
                </ul>
                {activeData.length > 14 && (
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    + {activeData.length - 14} more in the explorer
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="border-t border-line/70 pt-6"
              >
                <div className="eyebrow">How this map works</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Each domain maps to keyword groups applied to publication
                  titles and venues in the supplied dataset. A record can belong
                  to more than one domain — the graph is a reading aid derived
                  from the data, not an official classification.
                </p>

                <div className="mt-8 space-y-4">
                  {THEMES.map((t, i) => {
                    const count = themeIndex.get(t.id)?.length ?? 0;
                    const max = Math.max(
                      ...THEMES.map(
                        (x) => themeIndex.get(x.id)?.length ?? 0
                      ),
                      1
                    );
                    return (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.5 }}
                        className="flex items-center gap-3"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: t.hue }}
                        />
                        <span className="flex-1 truncate text-[13px] text-muted">
                          {t.label}
                        </span>
                        <span className="relative h-px w-10 overflow-hidden bg-line">
                          <motion.span
                            className="absolute inset-y-0 left-0 bg-accent/60"
                            initial={{ width: 0 }}
                            animate={{ width: `${(count / max) * 100}%` }}
                            transition={{
                              duration: 0.7,
                              delay: 0.2 + i * 0.04,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />
                        </span>
                        <span className="w-6 text-right font-mono text-[10px] tabular-nums text-muted/70">
                          {count}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

function PublicationRow({
  pub,
  onOpen,
}: {
  pub: Publication;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      data-cursor="view"
      data-cursor-label="VIEW"
      className="group flex w-full items-start gap-3 border-b border-line/60 py-3 text-left transition-colors last:border-0 hover:border-accent/40"
    >
      <span className="mt-1.5 font-mono text-[10px] tabular-nums text-muted/70">
        {pub.year ?? "—"}
      </span>
      <span className="flex-1 text-[13px] leading-snug text-ink/90 transition-colors group-hover:text-accent">
        <RichText text={pub.title} />
      </span>
      <ArrowUpRight
        size={13}
        className="mt-1 shrink-0 text-muted/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
      />
    </button>
  );
}
