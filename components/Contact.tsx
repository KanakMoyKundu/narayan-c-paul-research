"use client";

import { ArrowUpRight, GraduationCap, Globe } from "lucide-react";
import { Section, Reveal } from "./primitives";
import { profile } from "@/data/researcher";

export default function Contact() {
  return (
    <Section
      id="contact"
      index="11"
      eyebrow="Contact"
      title={
        <>
          Research. Diagnostics.{" "}
          <span className="italic text-accent">Discovery.</span>
        </>
      }
      lede="Only verified contact routes from the supplied data are listed. No email address has been fabricated."
    >
      <div className="grid gap-px bg-line/60 lg:grid-cols-2">
        <Reveal>
          <a
            href={profile.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col justify-between bg-bg p-8 transition-colors hover:bg-surface sm:p-12"
          >
            <div>
              <Globe size={20} className="text-accent" />
              <h3 className="mt-6 font-display text-3xl tracking-tight sm:text-4xl">
                Institutional homepage
              </h3>
              <p className="mt-4 break-all font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {profile.homepage}
              </p>
            </div>
            <div className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Visit
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <a
            href={profile.google_scholar_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col justify-between bg-bg p-8 transition-colors hover:bg-surface sm:p-12"
          >
            <div>
              <GraduationCap size={20} className="text-accent" />
              <h3 className="mt-6 font-display text-3xl tracking-tight sm:text-4xl">
                Google Scholar profile
              </h3>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                Source of the dataset used on this site
              </p>
            </div>
            <div className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Open profile
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
          </a>
        </Reveal>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line/70 pt-8">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Verified email domain
          </span>
          <span className="font-mono text-[11px] text-ink">
            {profile.verified_email_domain}
          </span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted/70">
          Full address not supplied
        </p>
      </div>
    </Section>
  );
}