"use client";

import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Search, SlidersHorizontal, X, ArrowUpRight } from "lucide-react";
import { Section } from "./primitives";
import RichText from "./RichText";
import { usePublication } from "./PublicationModal";
import {
  ALL_PUB_TYPES,
  THEMES,
  datasetStats,
  formatCitations,
  isAnomalous,
  publicationType,
  themesFor,
  venueShort,
  type PubType,
} from "@/lib/derive";
import { publications, type Publication } from "@/data/researcher";

type Sort = "newest" | "oldest" | "cited";

export default function Explorer() {
  const { open } = usePublication();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("cited");
  const [themeFilter, setThemeFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<PubType | null>(null);
  const [minCites, setMinCites] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [includeAnomalous, setIncludeAnomalous] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = publications.filter((p) => {
      if (!includeAnomalous && isAnomalous(p)) return false;
      if (themeFilter && !themesFor(p).some((t) => t.id === themeFilter))
        return false;
      if (typeFilter && publicationType(p) !== typeFilter) return false;
      if ((p.cited_by ?? 0) < minCites) return false;
      if (q) {
        const hay = `${p.title} ${p.authors} ${p.venue}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "newest") return (b.year ?? 0) - (a.year ?? 0);
      if (sort === "oldest") return (a.year ?? 0) - (b.year ?? 0);
      return (b.cited_by ?? 0) - (a.cited_by ?? 0);
    });

    return list;
  }, [query, sort, themeFilter, typeFilter, minCites, includeAnomalous]);

  const activeFilters =
    (themeFilter ? 1 : 0) +
    (typeFilter ? 1 : 0) +
    (minCites > 0 ? 1 : 0) +
    (includeAnomalous ? 1 : 0);

  const clear = () => {
    setThemeFilter(null);
    setTypeFilter(null);
    setMinCites(0);
    setIncludeAnomalous(false);
  };

  return (
    <Section
      id="publications"
      index="07"
      eyebrow="Publication explorer"
      title={
        <>
          The full record <span className="italic text-accent">set</span>
        </>
      }
      lede={`Search and filter ${datasetStats.totalRecords} records from the supplied Google Scholar export.`}
    >
      <div className="sticky top-16 z-30 -mx-5 mb-8 border-y border-line/70 bg-bg/85 px-5 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-md sm:border sm:px-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search
              size={14}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, authors, venues…"
              className="w-full rounded-full border border-line bg-transparent py-2.5 pl-10 pr-9 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-accent"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 rounded-full border border-line p-0.5">
            {(
              [
                ["cited", "Most cited"],
                ["newest", "Newest"],
                ["oldest", "Oldest"],
              ] as [Sort, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={`relative rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                  sort === key ? "text-bg" : "text-muted hover:text-ink"
                }`}
              >
                {sort === key && (
                  <motion.span
                    layoutId="sort-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilters((s) => !s)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
              showFilters || activeFilters
                ? "border-accent text-accent"
                : "border-line text-muted hover:text-ink"
            }`}
          >
            <SlidersHorizontal size={12} />
            Filters
            {activeFilters > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] text-bg">
                {activeFilters}
              </span>
            )}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-5 border-t border-line/70 pt-5">
                <div>
                  <div className="eyebrow mb-2.5">Theme</div>
                  <div className="flex flex-wrap gap-1.5">
                    {THEMES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() =>
                          setThemeFilter((cur) => (cur === t.id ? null : t.id))
                        }
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors ${
                          themeFilter === t.id
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
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <div className="eyebrow mb-2.5">Type</div>
                    <div className="flex flex-wrap gap-1.5">
                      {ALL_PUB_TYPES.map((t) => (
                        <button
                          key={t}
                          onClick={() =>
                            setTypeFilter((cur) => (cur === t ? null : t))
                          }
                          className={`rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors ${
                            typeFilter === t
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-line text-muted hover:border-accent/40 hover:text-ink"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="eyebrow mb-2.5">
                      Minimum citations · {minCites}
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={260}
                      step={5}
                      value={minCites}
                      onChange={(e) => setMinCites(Number(e.target.value))}
                      className="h-2 w-full"
                    />
                    <label className="mt-4 flex cursor-pointer items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={includeAnomalous}
                        onChange={(e) => setIncludeAnomalous(e.target.checked)}
                        className="h-3.5 w-3.5 accent-[rgb(var(--accent))]"
                      />
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                        Include flagged records ({datasetStats.excludedRecords})
                      </span>
                    </label>
                  </div>
                </div>

                {activeFilters > 0 && (
                  <button
                    onClick={clear}
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent"
                  >
                    <X size={11} /> Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mb-6 flex items-baseline justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <motion.span
            key={results.length}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="tabular-nums text-ink"
          >
            {results.length}
          </motion.span>{" "}
          of {datasetStats.totalRecords} records
        </p>
      </div>

      <motion.div
        layout
        className="grid gap-px bg-line/60 sm:grid-cols-2 lg:grid-cols-3"
        transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      >
        <AnimatePresence mode="popLayout">
          {results.map((p) => (
            <PubCard
              key={p.id}
              pub={p}
              onOpen={() => open(p.id, { layoutId: `explorer-${p.id}` })}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {results.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden border border-dashed border-line py-20 text-center"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 400 40"
            className="mx-auto mb-6 h-10 w-40 text-line"
          >
            <path
              d="M0,20 Q20,4 40,20 T80,20 T120,20 T160,20 T200,20 T240,20 T280,20 T320,20 T360,20 T400,20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          <p className="font-display text-2xl tracking-tight">
            No records match
          </p>
          <p className="mt-2 text-sm text-muted">
            Try clearing a filter or widening the citation range.
          </p>
          {activeFilters > 0 && (
            <button
              onClick={clear}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              <X size={11} /> Clear all filters
            </button>
          )}
        </motion.div>
      )}
    </Section>
  );
}

function PubCard({ pub, onOpen }: { pub: Publication; onOpen: () => void }) {
  const theme = themesFor(pub)[0];
  const flagged = isAnomalous(pub);
  const reduced = useReducedMotion();
  const { activeId } = usePublication();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sRotateX = useSpring(rotateX, { stiffness: 260, damping: 24, mass: 0.4 });
  const sRotateY = useSpring(rotateY, { stiffness: 260, damping: 24, mass: 0.4 });

  const isActive = activeId === pub.id;

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(cx * 5);
    rotateX.set(-cy * 5);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      layout
      layoutId={`explorer-${pub.id}`}
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: isActive ? 0 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={{
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: sRotateX,
        rotateY: sRotateY,
        transformPerspective: 900,
      }}
      className="group relative flex flex-col bg-bg p-6 transition-[background-color,box-shadow] duration-300 hover:bg-surface hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]"
    >
      <button
        onClick={onOpen}
        data-cursor="view"
        data-cursor-label="VIEW"
        className="flex h-full flex-col text-left"
        aria-label={`View details for ${pub.title}`}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tabular-nums text-muted">
            {pub.year ?? "—"}
          </span>
          <span className="flex items-center gap-2">
            {flagged && (
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ember">
                verify
              </span>
            )}
            <span className="font-mono text-[10px] tabular-nums text-muted">
              {formatCitations(pub.cited_by)}
            </span>
          </span>
        </div>

        <h3 className="mt-4 flex-1 text-[15px] font-medium leading-[1.4] tracking-[-0.005em] transition-colors duration-300 group-hover:text-accent">
          <RichText text={pub.title} />
        </h3>

        <div className="mt-5 border-t border-line/60 pt-4">
          <p className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {venueShort(pub.venue)}
          </p>
          <p className="mt-1.5 truncate text-[11px] text-muted/80">
            {pub.authors}
          </p>
          <div className="mt-3 flex items-center justify-between">
            {theme && (
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: theme.hue }}
                />
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  {theme.short}
                </span>
              </span>
            )}
            <ArrowUpRight
              size={13}
              className="text-muted/40 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-accent"
            />
          </div>
        </div>

        <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-700 ease-editorial group-hover:w-full" />
      </button>
    </motion.article>
  );
}