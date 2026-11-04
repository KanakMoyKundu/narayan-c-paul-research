"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useInView,
  type MotionStyle,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";

export function Section({
  id,
  index,
  eyebrow,
  title,
  lede,
  children,
  className = "",
  aside,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
  aside?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduced = useReducedMotion();

  return (
    <section
      id={id}
      ref={ref}
      className={`relative scroll-mt-20 border-t border-line/70 ${className}`}
    >
      <div className="mx-auto w-full max-w-shell px-5 py-20 sm:px-8 md:py-28 lg:px-12 lg:py-32">
        <header className="mb-12 flex flex-col gap-8 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <motion.span
                className="font-mono text-[10px] tabular-nums tracking-[0.3em] text-accent"
                initial={reduced ? false : { opacity: 0, x: -6 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {index}
              </motion.span>
              <motion.span
                className="h-px bg-line"
                initial={reduced ? false : { width: 0 }}
                animate={inView ? { width: 40 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="eyebrow"
                initial={reduced ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.18 }}
              >
                {eyebrow}
              </motion.span>
            </div>

            <MaskedHeading
              as="h2"
              className="mt-6 font-display text-[2.1rem] leading-[1.02] tracking-[-0.015em] sm:text-5xl lg:text-[3.75rem]"
              inView={inView}
            >
              {title}
            </MaskedHeading>

            {lede && (
              <motion.p
                className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {lede}
              </motion.p>
            )}
          </div>
          {aside && (
            <motion.div
              className="shrink-0"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {aside}
            </motion.div>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}

export function MaskedHeading({
  children,
  as: Tag = "h2",
  className = "",
  inView = true,
  delay = 0.2,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  inView?: boolean;
  delay?: number;
}) {
  return (
    <Tag className={className}>
      <MaskLine inView={inView} delay={delay}>
        {children}
      </MaskLine>
    </Tag>
  );
}

export function MaskLine({
  children,
  inView = true,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  inView?: boolean;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={`mask-span ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={reduced ? false : { y: "115%", opacity: 0.001 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 14,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = "",
  delay = 0,
  stagger = 0.06,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function useMagnetic(strength = 0.22) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });
  const reduced = useReducedMotion();

  const onMouseMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    style: { x: sx, y: sy } as MotionStyle,
    onMouseMove,
    onMouseLeave,
  };
}

export function useCountUp(target: number, active: boolean, duration = 1.3) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, reduced]);

  return value;
}