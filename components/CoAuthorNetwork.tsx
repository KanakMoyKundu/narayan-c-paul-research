"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Section } from "./primitives";
import RichText from "./RichText";
import { usePublication } from "./PublicationModal";
import {
  authorIndex,
  coAuthorEdges,
  type AuthorNode,
} from "@/lib/derive";
import { publications as allPubs } from "@/data/researcher";

const W = 1000;
const H = 680;

function layout(names: string[], edges: [number, number][], iterations = 300) {
  const n = names.length;
  const pos = names.map((_, i) => {
    const a = i * 2.399963;
    const r = 8 * Math.sqrt(i + 1);
    return { x: W / 2 + r * Math.cos(a), y: H / 2 + r * Math.sin(a) };
  });

  for (let it = 0; it < iterations; it++) {
    const cool = 1 - it / iterations;

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = pos[j].x - pos[i].x;
        const dy = pos[j].y - pos[i].y;
        const d2 = dx * dx + dy * dy || 0.01;
        if (d2 > 52000) continue;
        const d = Math.sqrt(d2);
        const f = (1400 / d2) * cool;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        pos[i].x -= fx;
        pos[i].y -= fy;
        pos[j].x += fx;
        pos[j].y += fy;
      }
    }

    edges.forEach(([a, b]) => {
      const dx = pos[b].x - pos[a].x;
      const dy = pos[b].y - pos[a].y;
      const d = Math.hypot(dx, dy) || 1;
      const f = (d - 96) * 0.045 * cool;
      const fx = (dx / d) * f;
      const fy = (dy / d) * f;
      pos[a].x += fx;
      pos[a].y += fy;
      pos[b].x -= fx;
      pos[b].y -= fy;
    });

    pos.forEach((p) => {
      p.x += (W / 2 - p.x) * 0.014;
      p.y += (H / 2 - p.y) * 0.014;
    });
  }

  pos.forEach((p) => {
    p.x = Math.max(46, Math.min(W - 46, p.x));
    p.y = Math.max(46, Math.min(H - 46, p.y));
  });

  return pos;
}

export default function CoAuthorNetwork() {
  const [minPubs, setMinPubs] = useState(2);
  const [selected, setSelected] = useState<string | null>(null);
  const { open } = usePublication();

  const { nodes, edges, positions } = useMemo(() => {
    const filtered = authorIndex.filter((a) => a.count >= minPubs);
    const names = filtered.map((a) => a.name);
    const indexOf = new Map(names.map((n, i) => [n, i]));

    const edges: [number, number][] = [];
    coAuthorEdges.forEach(([a, b]) => {
      const ia = indexOf.get(a);
      const ib = indexOf.get(b);
      if (ia !== undefined && ib !== undefined) edges.push([ia, ib]);
    });

    return {
      nodes: filtered,
      edges,
      positions: layout(names, edges),
    };
  }, [minPubs]);

  const selectedNode: AuthorNode | null =
    nodes.find((n) => n.name === selected) ?? null;

  const neighbours = useMemo(() => {
    if (!selected) return new Set<string>();
    const set = new Set<string>();
    edges.forEach(([a, b]) => {
      if (nodes[a]?.name === selected) set.add(nodes[b]?.name);
      if (nodes[b]?.name === selected) set.add(nodes[a]?.name);
    });
    return set;
  }, [selected, edges, nodes]);

  const connectedPubs = useMemo(() => {
    if (!selectedNode) return [];
    return selectedNode.publications
      .map((id) => allPubs.find((p) => p.id === id))
      .filter(Boolean) as typeof allPubs;
  }, [selectedNode]);

  return (
    <Section
      id="network"
      index="09"
      eyebrow="Co-author network"
      title={
        <>
          Collaboration, as recorded in the{" "}
          <span className="italic text-accent">dataset</span>
        </>
      }
      lede="Nodes are author strings parsed from the supplied records. Node size is the number of records in which that author appears. Only co-authorships present in the data are drawn."
      aside={
        <div className="flex items-center gap-1 rounded-full border border-line p-0.5">
          {[1, 2, 3].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMinPubs(m);
                setSelected(null);
              }}
              className={`relative rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                minPubs === m ? "text-bg" : "text-muted hover:text-ink"
              }`}
            >
              {minPubs === m && (
                <motion.span
                  layoutId="network-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">≥{m} records</span>
            </button>
          ))}
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
        <div className="relative overflow-hidden rounded-md border border-line bg-surface">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="block h-auto w-full"
            role="img"
            aria-label="Co-author network graph"
          >
            {edges.map(([a, b], i) => {
              const p1 = positions[a];
              const p2 = positions[b];
              if (!p1 || !p2) return null;
              const involvesSelected =
                selected === null ||
                nodes[a]?.name === selected ||
                nodes[b]?.name === selected;
              return (
                <motion.line
                  key={i}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={
                    involvesSelected && selected
                      ? "rgb(var(--accent))"
                      : "rgb(var(--line))"
                  }
                  strokeWidth={selected && involvesSelected ? 1.2 : 0.6}
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: selected
                      ? involvesSelected
                        ? 0.8
                        : 0.06
                      : 0.4,
                  }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(i * 0.002, 0.3),
                  }}
                />
              );
            })}

            {nodes.map((node, i) => {
              const p = positions[i];
              if (!p) return null;
              const r = 4 + Math.sqrt(node.count) * 2.1;
              const isSelected = selected === node.name;
              const isNeighbour = neighbours.has(node.name);
              const dim = selected !== null && !isSelected && !isNeighbour;
              const isPaul = /paul/i.test(node.name);

              return (
                <motion.g
                  key={node.name}
                  animate={{ opacity: dim ? 0.16 : 1 }}
                  transition={{ duration: 0.45 }}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setSelected((cur) => (cur === node.name ? null : node.name))
                  }
                >
                  <circle cx={p.x} cy={p.y} r={r + 6} fill="transparent" />
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    fill={
                      isPaul ? "rgb(var(--accent))" : "rgb(var(--surface))"
                    }
                    stroke={
                      isPaul ? "rgb(var(--accent))" : "rgb(var(--line))"
                    }
                    initial={false}
                    animate={{
                      r: isSelected ? r * 1.4 : r,
                      strokeWidth: isSelected ? 2 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 24,
                    }}
                  />
                  {(isSelected || isNeighbour || isPaul || node.count >= 6) && (
                    <motion.text
                      x={p.x}
                      y={p.y - r - 7}
                      textAnchor="middle"
                      fill="rgb(var(--ink))"
                      style={{
                        font: "500 10px var(--font-mono)",
                        letterSpacing: "0.02em",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {node.name}
                    </motion.text>
                  )}
                  <title>
                    {node.name} — {node.count} record
                    {node.count === 1 ? "" : "s"}
                  </title>
                </motion.g>
              );
            })}
          </svg>

          <div className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
            {nodes.length} authors · {edges.length} co-authorship links
          </div>
        </div>

        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-line/70 pt-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="eyebrow">Author</div>
                    <h3 className="mt-2 font-display text-3xl tracking-tight">
                      {selectedNode.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Clear selection"
                    className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-transform hover:rotate-90 hover:text-accent"
                  >
                    <X size={13} />
                  </button>
                </div>

                <div className="mt-5 flex items-baseline gap-6 border-y border-line/70 py-5">
                  <div>
                    <div className="font-display text-3xl tabular-nums">
                      {selectedNode.count}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                      records
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-3xl tabular-nums">
                      {neighbours.size}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                      co-authors
                    </div>
                  </div>
                </div>

                <ul className="mt-5 max-h-[340px] space-y-0 overflow-y-auto pr-1">
                  {connectedPubs.map((p, i) => (
                    <motion.li
                      key={p.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: Math.min(i * 0.03, 0.3),
                        duration: 0.4,
                      }}
                    >
                      <button
                        onClick={() => open(p.id)}
                        className="group flex w-full items-start gap-3 border-b border-line/60 py-3 text-left last:border-0"
                      >
                        <span className="mt-1 font-mono text-[10px] tabular-nums text-muted/70">
                          {p.year ?? "—"}
                        </span>
                        <span className="flex-1 text-[13px] leading-snug transition-colors group-hover:text-accent">
                          <RichText text={p.title} />
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="border-t border-line/70 pt-6"
              >
                <div className="eyebrow">Reading the graph</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Author names are parsed directly from the author strings in
                  the supplied records. Where the export uses more than one form
                  of a name, the forms remain separate nodes — no name merging
                  has been applied.
                </p>

                <div className="mt-8 space-y-2.5">
                  <div className="eyebrow">Most frequent in this dataset</div>
                  {authorIndex.slice(0, 10).map((a, i) => (
                    <motion.button
                      key={a.name}
                      onClick={() => setSelected(a.name)}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.4 }}
                      className="flex w-full items-center gap-3 border-b border-line/50 py-2 text-left transition-colors hover:text-accent"
                    >
                      <span className="w-5 font-mono text-[10px] tabular-nums text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 truncate text-[13px]">
                        {a.name}
                      </span>
                      <span className="font-mono text-[10px] tabular-nums text-muted">
                        {a.count}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}