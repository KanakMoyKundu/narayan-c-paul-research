import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/researcher";
import { datasetStats } from "@/lib/derive";

export default function Footer() {
  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto w-full max-w-shell px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-display text-2xl tracking-tight">
              {profile.name}
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              {profile.credentials.join(" · ")}
            </div>
            <p className="mt-5 max-w-sm text-xs leading-relaxed text-muted">
              {profile.title}, {profile.institution}
            </p>
          </div>

          <div>
            <div className="eyebrow">Links</div>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={profile.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-accent"
                >
                  Institutional homepage
                  <ArrowUpRight size={11} />
                </a>
              </li>
              <li>
                <a
                  href={profile.google_scholar_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-accent"
                >
                  Google Scholar
                  <ArrowUpRight size={11} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow">Data</div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              {datasetStats.totalRecords} records from a supplied Google Scholar
              export, spanning {datasetStats.yearRange.min}–
              {datasetStats.yearRange.max}. Citation values are source values
              and are not live Google Scholar metrics.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Built from supplied research data only
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            No fabricated metrics · No invented affiliations
          </p>
        </div>
      </div>
    </footer>
  );
}