"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/researcher";

export default function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    const t = window.setTimeout(() => setDone(true), 1650);
    return () => window.clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[#0B0D0F]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex flex-col items-center">
            <svg
              viewBox="0 0 240 120"
              className="h-[120px] w-[240px]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="pl-line" x1="0" x2="1">
                  <stop offset="0%" stopColor="#6FB3D9" stopOpacity="0" />
                  <stop offset="50%" stopColor="#6FB3D9" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6FB3D9" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[
                [30, 88, 72, 44],
                [72, 44, 120, 74],
                [120, 74, 168, 34],
                [168, 34, 210, 66],
                [72, 44, 168, 34],
                [30, 88, 120, 74],
              ].map(([x1, y1, x2, y2], i) => (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#pl-line)"
                  strokeWidth={0.8}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 1.0,
                    delay: 0.08 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}

              {[
                [30, 88],
                [72, 44],
                [120, 74],
                [168, 34],
                [210, 66],
              ].map(([cx, cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  fill="#6FB3D9"
                  initial={{ r: 0, opacity: 0 }}
                  animate={{ r: 2.8, opacity: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.4 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </svg>

            <span className="mask-span mt-2">
              <motion.p
                className="font-mono text-[10px] uppercase tracking-[0.42em] text-[#6FB3D9]"
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: 0.85,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {profile.name}
              </motion.p>
            </span>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-px bg-[#6FB3D9]/60"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.55, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}