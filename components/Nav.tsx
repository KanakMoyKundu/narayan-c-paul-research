"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useSectionTransition } from "./SectionTransition";
import { profile } from "@/data/researcher";

const LINKS = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "timeline", label: "Timeline" },
  { id: "impact", label: "Impact" },
  { id: "publications", label: "Publications" },
  { id: "universe", label: "Universe" },
  { id: "network", label: "Network" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const { go } = useSectionTransition();
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    ) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.15, 0.5, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`[data-nav="${active}"]`);
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClick = (id: string) => {
    setOpen(false);
    window.setTimeout(() => go(id), open ? 320 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "border-b border-line/70 bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-shell items-center justify-between px-5 sm:px-8 lg:px-12">
          <button
            onClick={() => handleClick("top")}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-line font-mono text-[10px] tracking-[0.14em] text-accent transition-colors group-hover:border-accent">
              NCP
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.32em] text-muted sm:inline">
              Researcher
            </span>
          </button>

          <div ref={listRef} className="relative hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                data-nav={l.id}
                onClick={() => handleClick(l.id)}
                className={`relative px-3 py-2 text-[13px] tracking-tight transition-colors ${
                  active === l.id ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </button>
            ))}
            <motion.span
              className="absolute -bottom-0.5 h-px bg-accent"
              animate={{ left: indicator.left, width: indicator.width }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.google_scholar_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:border-accent/50 hover:text-accent md:inline-flex"
            >
              Scholar <ArrowUpRight size={11} />
            </a>
            <ThemeToggle />
            <button
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-accent lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>

        <motion.div
          className="h-px origin-left bg-accent"
          style={{ scaleX: progress }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120] bg-bg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div className="flex h-16 items-center justify-between px-5 sm:px-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
                Navigation
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="mt-4 flex flex-col px-5 sm:px-8">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  onClick={() => handleClick(l.id)}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.045,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-line/70 py-4 text-left font-display text-3xl tracking-tight"
                >
                  <span className="mr-3 font-mono text-[11px] align-middle text-accent">
                    0{i + 1}
                  </span>
                  {l.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}