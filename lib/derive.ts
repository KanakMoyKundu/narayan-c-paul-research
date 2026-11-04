import { publications, profile, type Publication } from "@/data/researcher";

/* ------------------------------------------------------------------ */
/* Record integrity                                                    */
/* ------------------------------------------------------------------ */

export function isAnomalous(p: Publication): boolean {
  if (p.record_status === "review_needed") return true;
  if (!p.title?.trim()) return true;
  if (!p.venue?.trim()) return true;
  if (p.year === null) return true;
  if (p.cited_by !== null && p.cited_by > 1000) return true;
  return false;
}

export const anomalousRecords = publications.filter(isAnomalous);
export const analyticRecords = publications.filter((p) => !isAnomalous(p));

const yearList = analyticRecords
  .map((p) => p.year)
  .filter((y): y is number => y !== null);

export const datasetStats = {
  totalRecords: publications.length,
  analyticRecords: analyticRecords.length,
  excludedRecords: anomalousRecords.length,
  withCitations: analyticRecords.filter((p) => p.cited_by !== null).length,
  citationSum: analyticRecords.reduce((a, p) => a + (p.cited_by ?? 0), 0),
  highestCited: analyticRecords.reduce(
    (a, p) => Math.max(a, p.cited_by ?? 0),
    0
  ),
  yearRange: {
    min: yearList.length ? Math.min(...yearList) : 2010,
    max: yearList.length ? Math.max(...yearList) : new Date().getFullYear(),
  },
};

/* ------------------------------------------------------------------ */
/* Authors                                                             */
/* ------------------------------------------------------------------ */

export function parseAuthors(authors: string): string[] {
  return authors
    .split(/,\s*/)
    .map((a) => a.replace(/\.+$/, "").trim())
    .filter(
      (a) => a.length > 1 && a !== "..." && !/^et al/i.test(a) && !/^…$/.test(a)
    );
}

export interface AuthorNode {
  name: string;
  count: number;
  publications: string[];
}

export const authorIndex: AuthorNode[] = (() => {
  const map = new Map<string, AuthorNode>();
  publications.forEach((p) => {
    parseAuthors(p.authors).forEach((name) => {
      const existing = map.get(name);
      if (existing) {
        existing.count += 1;
        existing.publications.push(p.id);
      } else {
        map.set(name, { name, count: 1, publications: [p.id] });
      }
    });
  });
  return [...map.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  );
})();

export const coAuthorEdges: [string, string][] = (() => {
  const set = new Set<string>();
  publications.forEach((p) => {
    const names = parseAuthors(p.authors);
    for (let i = 0; i < names.length; i++) {
      for (let j = i + 1; j < names.length; j++) {
        const key = [names[i], names[j]].sort().join("|||");
        set.add(key);
      }
    }
  });
  return [...set].map((k) => k.split("|||") as [string, string]);
})();

/* ------------------------------------------------------------------ */
/* Themes                                                              */
/* ------------------------------------------------------------------ */

export interface ThemeDef {
  id: string;
  label: string;
  short: string;
  pattern: RegExp;
  hue: string;
}

export const THEMES: ThemeDef[] = [
  {
    id: "amr",
    label: "Antimicrobial resistance",
    short: "AMR",
    pattern:
      /methicillin|antimicrobial|antibiotic|resistance|MRSP|lactamase|carbapenem|nitrofurantoin|susceptibility|ciprofloxacin|chlorine/i,
    hue: "#B45309",
  },
  {
    id: "staph",
    label: "Staphylococcus pseudintermedius",
    short: "S. pseudintermedius",
    pattern: /staphylococc|pseudintermedius/i,
    hue: "#0E7490",
  },
  {
    id: "salmonella",
    label: "Salmonella",
    short: "Salmonella",
    pattern:
      /salmonella|serovar|serotypes|SPI-13|pathogenicity island|enteritidis|typhimurium|kentucky/i,
    hue: "#9F1239",
  },
  {
    id: "genomics",
    label: "Bacterial genomics & bioinformatics",
    short: "Genomics",
    pattern:
      /genom|genetic|lineages|ST313|ST19|ST198|ST71|bioinformatic|phylo|microbiome|microbial communities/i,
    hue: "#4C1D95",
  },
  {
    id: "diagnostics",
    label: "Diagnostic test development",
    short: "Diagnostics",
    pattern:
      /PCR|assay|detect|diagnos|survey|multiplex|evaluation|assessment|susceptibility/i,
    hue: "#065F46",
  },
  {
    id: "food",
    label: "Food safety & low-moisture foods",
    short: "Food safety",
    pattern:
      /food|flour|thermal|desiccation|freeze-dried|water sorption|biofilm|sorption/i,
    hue: "#92400E",
  },
  {
    id: "poultry",
    label: "Poultry health",
    short: "Poultry",
    pattern:
      /poultry|chicken|broiler|chick|egg yolk|newcastle|bronchitis|fowl|enteritidis/i,
    hue: "#A16207",
  },
  {
    id: "animal",
    label: "Companion & livestock animal health",
    short: "Animal health",
    pattern:
      /dog|canine|cat\b|feline|goat|cow|cattle|bovine|equine|alligator|animal|mastitis|keratoconjunctivitis|veterinar|dermatolog/i,
    hue: "#1D4ED8",
  },
  {
    id: "zoonoses",
    label: "Zoonoses & public health",
    short: "Zoonoses",
    pattern:
      /zoonot|public health|rabies|SARS-CoV-2|COVID|post-exposure|outbreak|emergency/i,
    hue: "#BE123C",
  },
  {
    id: "immuno",
    label: "Immunology & vaccines",
    short: "Immunology",
    pattern:
      /antibody|vaccin|immunotherap|seroconversion|maternal|hyperimmunized/i,
    hue: "#0F766E",
  },
];

export function themesFor(p: Publication): ThemeDef[] {
  const haystack = `${p.title} ${p.venue}`;
  return THEMES.filter((t) => t.pattern.test(haystack));
}

export const themeIndex = (() => {
  const map = new Map<string, Publication[]>();
  THEMES.forEach((t) => map.set(t.id, []));
  publications.forEach((p) => {
    themesFor(p).forEach((t) => map.get(t.id)!.push(p));
  });
  return map;
})();

export function primaryTheme(p: Publication): ThemeDef | null {
  return themesFor(p)[0] ?? null;
}

/* ------------------------------------------------------------------ */
/* Domains                                                             */
/* ------------------------------------------------------------------ */

export interface Domain {
  id: string;
  label: string;
  blurb: string;
  themeIds: string[];
  angle: number;
}

export const DOMAINS: Domain[] = [
  {
    id: "clinical-microbiology",
    label: "Clinical Microbiology",
    blurb:
      "Culture, characterisation and clinical interpretation of bacterial pathogens isolated from veterinary cases.",
    themeIds: ["staph", "salmonella", "animal", "food"],
    angle: -45,
  },
  {
    id: "antibiotic-resistance",
    label: "Antibiotic Resistance",
    blurb:
      "Resistance phenotypes and determinants across veterinary and zoonotic bacterial populations.",
    themeIds: ["amr", "staph", "salmonella"],
    angle: 45,
  },
  {
    id: "bioinformatics",
    label: "Bioinformatics",
    blurb:
      "Genome-scale analysis: sequence typing, comparative genomics and microbial community data.",
    themeIds: ["genomics"],
    angle: 135,
  },
  {
    id: "diagnostics",
    label: "Diagnostic Test Development",
    blurb:
      "Assay design, validation and laboratory workflow research for veterinary diagnostics.",
    themeIds: ["diagnostics", "immuno"],
    angle: 225,
  },
];

export function publicationsForDomain(domain: Domain): Publication[] {
  const ids = new Set<string>();
  domain.themeIds.forEach((tid) =>
    (themeIndex.get(tid) ?? []).forEach((p) => ids.add(p.id))
  );
  return publications.filter((p) => ids.has(p.id));
}

/* ------------------------------------------------------------------ */
/* Aggregations                                                        */
/* ------------------------------------------------------------------ */

export const yearCounts = (() => {
  const { min, max } = datasetStats.yearRange;
  const counts = new Map<number, number>();
  for (let y = min; y <= max; y++) counts.set(y, 0);
  analyticRecords.forEach((p) => {
    if (p.year === null) return;
    counts.set(p.year, (counts.get(p.year) ?? 0) + 1);
  });
  return [...counts.entries()].map(([year, count]) => ({ year, count }));
})();

export const citationsByYear = (() => {
  const map = new Map<number, number>();
  analyticRecords.forEach((p) => {
    if (p.year === null || p.cited_by === null) return;
    map.set(p.year, (map.get(p.year) ?? 0) + p.cited_by);
  });
  return [...map.entries()]
    .map(([year, citations]) => ({ year, citations }))
    .sort((a, b) => a.year - b.year);
})();

export const topCited = [...analyticRecords]
  .filter((p) => p.cited_by !== null)
  .sort((a, b) => (b.cited_by ?? 0) - (a.cited_by ?? 0));

export const mostRecent = [...analyticRecords]
  .filter((p) => p.year !== null)
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

export const featuredPublications: Publication[] = (() => {
  const picked: Publication[] = [];
  const push = (p?: Publication) => {
    if (p && !picked.some((x) => x.id === p.id)) picked.push(p);
  };
  topCited.slice(0, 3).forEach(push);
  mostRecent.slice(0, 3).forEach(push);
  const seen = new Set(picked.map((p) => primaryTheme(p)?.id));
  analyticRecords.forEach((p) => {
    if (picked.length >= 5) return;
    const t = primaryTheme(p);
    if (t && !seen.has(t.id)) {
      seen.add(t.id);
      push(p);
    }
  });
  return picked.slice(0, 5);
})();

/* ------------------------------------------------------------------ */
/* Publication type                                                    */
/* ------------------------------------------------------------------ */

export type PubType =
  | "Journal article"
  | "Conference paper"
  | "Book chapter"
  | "Thesis"
  | "Preprint";

export function publicationType(p: Publication): PubType {
  const s = `${p.title} ${p.venue}`;
  if (/thesis/i.test(s)) return "Thesis";
  if (/producing safe eggs|chapter/i.test(s)) return "Book chapter";
  if (
    /conference|annual meeting|convention|poster|abstract|ASM-ESCMID|association of veterinary laboratory/i.test(
      s
    )
  )
    return "Conference paper";
  if (/authorea|preprint/i.test(s)) return "Preprint";
  return "Journal article";
}

export const ALL_PUB_TYPES: PubType[] = [
  "Journal article",
  "Conference paper",
  "Book chapter",
  "Thesis",
  "Preprint",
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const prettyYear = (y: number | null) =>
  y === null ? "Year not supplied" : String(y);

export const formatCitations = (c: number | null) =>
  c === null ? "—" : c.toLocaleString("en-US");

export const scholarProfileUrl = profile.google_scholar_url;

export function venueShort(venue: string): string {
  if (!venue) return "Venue not supplied";
  const cut = venue.split(/[,(]/)[0].trim();
  return cut.length > 64 ? `${cut.slice(0, 61)}…` : cut;
}