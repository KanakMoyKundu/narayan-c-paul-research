"use client";

import { ArrowUpRight } from "lucide-react";
import { Section, Reveal } from "./primitives";
import RichText from "./RichText";
import { usePublication } from "./PublicationModal";
import {
  featuredPublications,
  formatCitations,
  primaryTheme,
  venueShort,
} from "@/lib/derive";

export default function Featured() {
  const { open } = usePublication();

  return (
    <Section
      id="featured"
      index="06"
      eyebrow="Featured"
      title={
        <>
          Selected from the <span className="italic text-accent">dataset</span>
        </>
      }
      lede="These records are surfaced algorithmically — highest citation values and most recent entries — as a presentation choice, not as an official designation."
    >
      <div className="space-y-px">
        {featuredPublications.map((p, i) => {
          const theme = primaryTheme(p);
          const big = i === 0;
          return (
            <Reveal key={p.id} delay={i * 0.06}>
              <button
                onClick={() => open(p.id)}
                data-cursor="view"
                data-cursor-label="VIEW"
                className="group relative block w-full overflow-hidden border-t border-line/70 text-left last:border-b"
              >
                <div
                  className={`relative grid items-baseline gap-4 py-8 transition-[padding] duration-500 group-hover:py-10 sm:grid-cols-[auto_1fr_auto] sm:gap-8 sm:py-10 sm:group-hover:py-12 ${
                    big ? "lg:py-14" : ""
                  }`}
                >
                  <span
                    className="hidden font-display tabular-nums tracking-tight text-line transition-colors duration-500 group-hover:text-accent sm:block"
                    style={{ fontSize: big ? "3rem" : "1.75rem" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      {theme && (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: theme.hue }}
                          />
                          {theme.short}
                        </span>
                      )}
                      <span className="font-mono text-[10px] tabular-nums text-muted">
                        {p.year ?? "—"}
                      </span>
                    </div>

                    <h3
                      className={`mt-3 font-display leading-[1.1] tracking-[-0.01em] transition-colors duration-300 group-hover:text-accent ${
                        big
                          ? "text-[1.75rem] sm:text-[2.6rem] lg:text-[3.2rem]"
                          : "text-xl sm:text-2xl lg:text-3xl"
                      }`}
                    >
                      <RichText text={p.title} />
                    </h3>

                    <p className="mt-4 max-w-2xl font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      {venueShort(p.venue)}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-3">
                    <div className="text-right">
                      <div
                        className={`font-display tabular-nums tracking-tight ${
                          big ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
                        }`}
                      >
                        {formatCitations(p.cited_by)}
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                        citations
                      </div>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-muted/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                    />
                  </div>
                </div>

                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-700 ease-editorial group-hover:w-full" />
              </button>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}