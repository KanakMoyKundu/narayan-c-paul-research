"use client";

import { Lock, CheckCircle2 } from "lucide-react";
import { Section, Reveal } from "./primitives";
import { profile } from "@/data/researcher";

const VERIFIED = [
  {
    label: "Current role",
    value: profile.title,
    source: "Supplied profile data",
  },
  {
    label: "Institution",
    value: profile.institution,
    source: "Supplied profile data",
  },
  {
    label: "Credentials",
    value: profile.credentials.join(" · "),
    source: "Supplied profile data",
  },
];

const PENDING = [
  {
    label: "Career history",
    note: "Previous positions and appointment dates are not present in the supplied data.",
  },
  {
    label: "Education",
    note: "Degree-granting institutions and graduation years are not present in the supplied data.",
  },
  {
    label: "Awards & honours",
    note: "No awards, prizes or honorary listings are present in the supplied data.",
  },
  {
    label: "Grants & funding",
    note: "No grant or funding records are present in the supplied data.",
  },
];

export default function Record() {
  return (
    <Section
      id="record"
      index="10"
      eyebrow="Verified record"
      title={
        <>
          Only what the <span className="italic text-accent">data supports</span>
        </>
      }
      lede="This site deliberately does not display career history, education, awards, grants, contact details or bibliometric indices that are not present in the supplied files."
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="eyebrow mb-6">Confirmed from supplied data</div>
          <ul className="space-y-0">
            {VERIFIED.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.07}>
                <li className="flex gap-4 border-b border-line/70 py-5">
                  <CheckCircle2
                    size={15}
                    className="mt-1 shrink-0 text-accent"
                  />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {item.label}
                    </div>
                    <div className="mt-1.5 text-lg leading-snug">
                      {item.value}
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted/60">
                      {item.source}
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-6">Awaiting verification</div>
          <ul className="space-y-0">
            {PENDING.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.07}>
                <li className="flex gap-4 border-b border-line/70 py-5">
                  <Lock size={14} className="mt-1 shrink-0 text-muted/50" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {item.label}
                    </div>
                    <div className="mt-1.5 text-sm leading-relaxed text-muted">
                      {item.note}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-dashed border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted/70">
                      Placeholder — ready to populate
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <p className="mt-8 font-mono text-[10px] leading-relaxed text-muted/80">
            To publish any of the above, add verified data to{" "}
            <span className="text-ink">data/researcher.ts</span> and remove the
            corresponding placeholder.
          </p>
        </div>
      </div>
    </Section>
  );
}