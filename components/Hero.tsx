"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowDown, BookOpen, ExternalLink } from "lucide-react";
import ScientificField from "./ScientificField";
import { useSectionTransition } from "./SectionTransition";
import { useMagnetic } from "./primitives";
import { profile } from "@/data/researcher";
import { datasetStats } from "@/lib/derive";

const NAME_WORDS = profile.name.split(" ");

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { go } = useSectionTransition();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.965]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 180, damping: 22 });
  const sy = useSpring(py, { stiffness: 180, damping: 22 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 6);
  };

  const primary = useMagnetic(0.2);
  const secondary = useMagnetic(0.2);

  const meta = [
    { k: "Records", v: String(datasetStats.totalRecords) },
    {
      k: "Years",
      v: `${datasetStats.yearRange.min}–${datasetStats.yearRange.max}`,
    },
    { k: "Peak citations", v: String(datasetStats.highestCited) },
    { k: "With citation data", v: String(datasetStats.withCitations) },
  ];

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      <ScientificField
        className="absolute inset-0 h-full w-full"
        density={1.05}
        linkDistance={146}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/0 via-bg/30 to-bg" />
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-[0.28]" />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-12"
      >
        <motion.div style={{ x: sx, y: sy }} className="max-w-4xl">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <motion.span
                className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"
                animate={reduced ? {} : { scale: [1, 1.35, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-muted">
              {profile.title}
            </span>
            <span className="hidden h-px w-8 bg-line sm:block" />
            <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-muted">
              {profile.credentials.join(" · ")}
            </span>
          </motion.div>

          <h1 className="mt-7 font-display text-[3.1rem] leading-[0.94] tracking-[-0.02em] sm:text-[4.5rem] lg:text-[6.5rem] xl:text-[7.5rem]">
            {NAME_WORDS.map((word, i) => (
              <span key={i} className="mask-span mr-[0.22em]">
                <motion.span
                  className="inline-block will-change-transform"
                  initial={reduced ? false : { y: "112%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.1,
                    delay: 0.28 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.institution}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06, delayChildren: 0.82 },
              },
            }}
            className="mt-10 flex flex-wrap gap-x-2 gap-y-2"
          >
            {profile.research_interests.map((interest) => (
              <motion.span
                key={interest}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                {interest}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap items-center gap-3"
          >
            <motion.div
              ref={primary.ref}
              style={primary.style}
              onMouseMove={primary.onMouseMove}
              onMouseLeave={primary.onMouseLeave}
            >
              <button
                onClick={() => go("research")}
                data-cursor="explore"
                data-cursor-label="EXPLORE"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm text-bg transition-transform duration-300 hover:scale-[1.015]"
              >
                <span className="relative z-10">Explore Research</span>
                <ArrowDown
                  size={15}
                  className="relative z-10 transition-transform duration-500 group-hover:translate-y-1"
                />
                <span className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-[600ms] ease-editorial group-hover:translate-y-0" />
                <span className="absolute inset-x-6 bottom-2 h-px bg-bg/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </button>
            </motion.div>

            <motion.div
              ref={secondary.ref}
              style={secondary.style}
              onMouseMove={secondary.onMouseMove}
              onMouseLeave={secondary.onMouseLeave}
            >
              <button
                onClick={() => go("publications")}
                data-cursor="view"
                data-cursor-label="VIEW"
                className="group inline-flex items-center gap-3 rounded-full border border-line px-7 py-3.5 text-sm text-ink transition-colors hover:border-accent/60"
              >
                <BookOpen size={15} className="text-accent" />
                View Publications
                <span className="h-px w-0 bg-accent transition-all duration-500 group-hover:w-6" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.35 }}
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line/70 pt-8 sm:grid-cols-4 lg:mt-24"
        >
          {meta.map((s, i) => (
            <motion.div
              key={s.k}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 1.4 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="font-display text-3xl tabular-nums tracking-tight sm:text-4xl">
                {s.v}
              </div>
              <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {s.k}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.7 }}
          className="mt-6 max-w-2xl font-mono text-[10px] leading-relaxed text-muted/80"
        >
          Counts describe the supplied Google Scholar export only. They are not
          Google Scholar profile totals.
        </motion.p>
      </motion.div>

      <motion.a
        href={profile.homepage}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-6 right-5 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-accent sm:right-8 lg:right-12 lg:flex"
      >
        Institutional homepage
        <ExternalLink size={11} />
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 sm:flex lg:bottom-8"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-muted/70">
          Scroll
        </span>
        <span className="relative block h-px w-16 overflow-hidden bg-line">
          <motion.span
            className="absolute inset-y-0 left-0 w-4 bg-accent"
            animate={reduced ? {} : { x: ["-100%", "400%"] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </span>
      </motion.div>
    </section>
  );
}