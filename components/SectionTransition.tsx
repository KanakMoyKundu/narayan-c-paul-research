"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const LABELS: Record<string, { num: string; label: string }> = {
  top: { num: "00", label: "Introduction" },
  about: { num: "02", label: "About" },
  research: { num: "03", label: "Research" },
  timeline: { num: "04", label: "Timeline" },
  impact: { num: "05", label: "Impact" },
  featured: { num: "06", label: "Featured" },
  publications: { num: "07", label: "Publications" },
  universe: { num: "08", label: "Universe" },
  network: { num: "09", label: "Network" },
  record: { num: "10", label: "Record" },
  contact: { num: "11", label: "Contact" },
};

interface Ctx {
  go: (id: string) => void;
  busy: boolean;
}

const TransitionCtx = createContext<Ctx>({ go: () => {}, busy: false });
export const useSectionTransition = () => useContext(TransitionCtx);

export function SectionTransitionProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const go = useCallback(
    (targetId: string) => {
      const el = document.getElementById(targetId);
      if (!el) return;

      if (reduced) {
        el.scrollIntoView({ block: "start" });
        return;
      }

      setTarget(targetId);

      window.setTimeout(() => {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      }, 520);

      window.setTimeout(() => setTarget(null), 900);
    },
    [reduced]
  );

  const meta = target ? LABELS[target] ?? { num: "—", label: target } : null;

  return (
    <TransitionCtx.Provider value={{ go, busy: target !== null }}>
      {children}
      <AnimatePresence>
        {target && meta && (
          <motion.div
            key="overlay"
            className="pointer-events-none fixed inset-0 z-[150] flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#0B0D0F]"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            />

            <motion.div
              className="absolute left-0 right-0 top-1/2 mx-auto flex max-w-shell -translate-y-1/2 items-baseline justify-between px-5 sm:px-8 lg:px-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, delay: 0.14 }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-[#6FB3D9]">
                {meta.num}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-[#6FB3D9]">
                Navigating
              </span>
            </motion.div>

            <div className="relative overflow-hidden">
              <motion.p
                className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-none tracking-[-0.02em] text-[#EFEDE7]"
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-115%" }}
                transition={{
                  duration: 0.6,
                  delay: 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {meta.label}
              </motion.p>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-[#6FB3D9]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              exit={{ width: "100%" }}
              transition={{ duration: 0.62, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionCtx.Provider>
  );
}