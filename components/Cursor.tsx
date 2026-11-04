"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type Variant = "default" | "hover" | "view" | "explore" | "drag";

export default function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("ncp-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;
      if (el) {
        const v = (el.dataset.cursor as Variant) || "hover";
        setVariant(v);
        setLabel(el.dataset.cursorLabel || "");
      } else {
        const interactive = (e.target as HTMLElement)?.closest?.(
          "a, button, [role='button'], input, [data-magnetic]"
        );
        setVariant(interactive ? "hover" : "default");
        setLabel("");
      }
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointerleave", leave);

    return () => {
      document.documentElement.classList.remove("ncp-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointerleave", leave);
    };
  }, [reduced, x, y]);

  if (!enabled || !visible) return null;

  const expanded = variant === "view" || variant === "explore";
  const size = expanded ? 78 : variant === "hover" ? 42 : 12;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
      <motion.div
        className="absolute rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: expanded ? 0 : pressed ? 5 : 6,
          height: expanded ? 0 : pressed ? 5 : 6,
          opacity: expanded ? 0 : 1,
        }}
        transition={{ duration: 0.18 }}
      />
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-accent/70 backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: expanded ? 1 : 0.9,
          backgroundColor: expanded
            ? "rgb(var(--accent) / 0.10)"
            : "rgb(var(--accent) / 0.04)",
          scale: pressed ? 0.86 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        {expanded && label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}