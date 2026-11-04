"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X, Quote, AlertTriangle } from "lucide-react";
import RichText from "./RichText";
import { publications, type Publication } from "@/data/researcher";
import {
  formatCitations,
  isAnomalous,
  primaryTheme,
  publicationType,
  themesFor,
} from "@/lib/derive";

interface OpenOptions {
  layoutId?: string;
}

interface ModalCtx {
  open: (id: string, opts?: OpenOptions) => void;
  activeId: string | null;
}

const Ctx = createContext<ModalCtx>({ open: () => {}, activeId: null });

export const usePublication = () => useContext(Ctx);

export function PublicationProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<{
    id: string;
    layoutId?: string;
  } | null>(null);

  const open = useCallback((id: string, opts?: OpenOptions) => {
    setSelected({ id, layoutId: opts?.layoutId });
  }, []);

  const close = useCallback(() => setSelected(null), []);

  const pub = useMemo(
    () => publications.find((p) => p.id === selected?.id) ?? null,
    [selected]
  );

  useEffect(() => {
    if (!pub) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [pub, close]);

  return (
    <Ctx.Provider value={{ open, activeId: selected?.id ?? null }}>
      {children}
      <AnimatePresence>
        {pub && (
          <PublicationDetail
            key="detail"
            pub={pub}
            layoutId={selected?.layoutId}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

function PublicationDetail({
  pub,
  layoutId,
  onClose,
}: {
  pub: Publication;
  layoutId?: string;
  onClose: () => void;
}) {
  const theme = primaryTheme(pub);
  const allThemes = themesFor(pub);
  const anomalous = isAnomalous(pub);

  const content = (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line/70 bg-surface/95 px-5 py-3 backdrop-blur-sm sm:px-8">
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted"
        >
          {publicationType(pub)}
        </motion.span>
        <button
          onClick={onClose}
          aria-label="Close"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-transform duration-300 hover:rotate-90 hover:text-accent"
        >
          <X size={14} />
        </button>
      </div>

      <div className="px-5 py-8 sm:px-8 sm:py-10">
        {theme && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: theme.hue }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              {theme.label}
            </span>
          </motion.div>
        )}

        <span className="mt-5 block overflow-hidden">
          <motion.h3
            initial={{ y: "108%" }}
            animate={{ y: "0%" }}
            transition={{
              delay: 0.18,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display text-[1.75rem] leading-[1.12] tracking-[-0.01em] sm:text-[2.4rem]"
          >
            <RichText text={pub.title} />
          </motion.h3>
        </span>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.06, delayChildren: 0.32 },
            },
          }}
          className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line/70 pt-6 sm:grid-cols-4"
        >
          <Meta
            label="Year"
            value={pub.year === null ? "Not supplied" : String(pub.year)}
          />
          <Meta
            label="Citations"
            value={formatCitations(pub.cited_by)}
            hint="Source value"
          />
          <Meta
            label="Record"
            value={
              pub.record_status === "source_listed"
                ? "Source-listed"
                : "Review needed"
            }
          />
          <Meta label="Type" value={publicationType(pub)} />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.07, delayChildren: 0.48 },
            },
          }}
          className="mt-8 space-y-7"
        >
          <Row>
            <div className="eyebrow">Authors</div>
            <p className="mt-2.5 text-sm leading-relaxed">{pub.authors}</p>
          </Row>

          <Row>
            <div className="eyebrow">Venue</div>
            <p className="mt-2.5 text-sm leading-relaxed">
              {pub.venue || "Not supplied in the dataset"}
            </p>
          </Row>

          {allThemes.length > 1 && (
            <Row>
              <div className="eyebrow">Dataset themes</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {allThemes.map((t) => (
                  <span
                    key={t.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: t.hue }}
                    />
                    {t.short}
                  </span>
                ))}
              </div>
            </Row>
          )}

          {anomalous && (
            <Row>
              <div className="flex gap-3 rounded border border-ember/40 bg-ember/5 p-4">
                <AlertTriangle size={15} className="mt-0.5 shrink-0 text-ember" />
                <p className="text-xs leading-relaxed text-muted">
                  This record has incomplete or anomalous metadata in the
                  supplied export (for example a missing venue, year, or a
                  citation value outside the plausible range). It is excluded
                  from aggregate charts and should be manually verified before
                  being presented as a confirmed publication.
                </p>
              </div>
            </Row>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-3 border-t border-line/70 pt-6"
        >
          <a
            href={pub.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-2.5 text-[13px] text-bg transition-colors hover:bg-accent"
          >
            <Quote size={13} />
            View source record
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Google Scholar citation view
          </span>
        </motion.div>
      </div>
    </>
  );

  const sharedClassName =
    "relative max-h-[88svh] w-full max-w-3xl overflow-y-auto rounded-lg border border-line bg-surface shadow-[0_50px_140px_-50px_rgba(0,0,0,0.6)]";

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center p-3 sm:p-6">
      <motion.div
        className="absolute inset-0 bg-[#0B0D0F]/72 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32 }}
        onClick={onClose}
      />

      {layoutId ? (
        <motion.div
          layoutId={layoutId}
          className={sharedClassName}
          transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.7 }}
        >
          {content}
        </motion.div>
      ) : (
        <motion.div
          className={sharedClassName}
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.985 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {content}
        </motion.div>
      )}
    </div>
  );
}

function Meta({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        {label}
      </div>
      <div className="mt-1.5 font-display text-xl tabular-nums tracking-tight">
        {value}
      </div>
      {hint && (
        <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted/60">
          {hint}
        </div>
      )}
    </motion.div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}