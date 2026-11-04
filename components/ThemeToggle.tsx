"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = (e: React.MouseEvent) => {
    const next = !dark;
    const root = document.documentElement;

    root.style.setProperty("--vt-x", `${e.clientX}px`);
    root.style.setProperty("--vt-y", `${e.clientY}px`);

    const apply = () => {
      root.classList.toggle("dark", next);
      root.dataset.theme = next ? "dark" : "light";
      try {
        localStorage.setItem("ncp-theme", next ? "dark" : "light");
      } catch {
        /* ignore */
      }
      setDark(next);
    };

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };

    if (!reduced && typeof doc.startViewTransition === "function") {
      doc.startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent ${className}`}
    >
      <motion.span
        className="relative flex h-4 w-4 items-center justify-center"
        animate={{ rotate: mounted && dark ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {mounted && dark ? <Moon size={15} /> : <Sun size={15} />}
      </motion.span>
    </button>
  );
}