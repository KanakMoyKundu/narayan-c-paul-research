"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Section } from "./primitives";
import { profile } from "@/data/researcher";
import { datasetStats } from "@/lib/derive";

const STATEMENT =
  "Research at the intersection of veterinary microbiology, antimicrobial resistance, bacterial genomics and diagnostic science — with a focus on the bacteria that move between animals, food systems and people.";

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = STATEMENT.split(" ");

  return (
    <Section
      id="about"
      index="02"
      eyebrow="About"
      title={
        <>
          A laboratory scientist&rsquo;s view of{" "}
          <span className="italic text-accent">microbial circulation</span>
        </>
      }
    >
      <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
        <p
          ref={ref}
          className="font-display text-[1.75rem] leading-[1.28] tracking-[-0.01em] sm:text-[2.4rem] lg:text-[2.85rem]"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                reduced={!!reduced}
              >
                {word}
              </Word>
            );
          })}
        </p>

        <div className="space-y-8">
          <div className="border-t border-line/70 pt-6">
            <div className="eyebrow">Verified role</div>
            <p className="mt-3 text-lg leading-snug">{profile.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {profile.institution}
            </p>
          </div>

          <div className="border-t border-line/70 pt-6">
            <div className="eyebrow">Credentials supplied</div>
            <p className="mt-3 font-mono text-xs tracking-[0.1em] text-muted">
              {profile.credentials.join(" · ")}
            </p>
          </div>

          <div className="border-t border-line/70 pt-6">
            <div className="eyebrow">Declared research interests</div>
            <ul className="mt-3 space-y-2.5">
              {profile.research_interests.map((interest, i) => (
                <li key={interest} className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] text-accent">
                    0{i + 1}
                  </span>
                  <span className="text-sm">{interest}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-line/70 pt-6">
            <div className="eyebrow">Data provenance</div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              This site is built from a supplied Google Scholar export containing{" "}
              <span className="tabular-nums text-ink">
                {datasetStats.totalRecords}
              </span>{" "}
              records spanning{" "}
              <span className="tabular-nums text-ink">
                {datasetStats.yearRange.min}–{datasetStats.yearRange.max}
              </span>
              . {datasetStats.excludedRecords} records carry incomplete or
              anomalous metadata and are excluded from aggregates. Nothing
              outside the supplied files has been added.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Word({
  children,
  progress,
  range,
  reduced,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  reduced: boolean;
}) {
  const opacity = useTransform(progress, range, reduced ? [1, 1] : [0.16, 1]);
  const y = useTransform(progress, range, reduced ? [0, 0] : [5, 0]);
  const blur = useTransform(
    progress,
    range,
    reduced ? ["blur(0px)", "blur(0px)"] : ["blur(3px)", "blur(0px)"]
  );
  return (
    <motion.span
      style={{ opacity, y, filter: blur }}
      className="mr-[0.24em] inline-block"
    >
      {children}
    </motion.span>
  );
}