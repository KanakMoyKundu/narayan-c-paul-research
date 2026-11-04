"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number;
}

export default function ScientificField({
  className = "",
  density = 1,
  linkDistance = 132,
  opacity = 1,
}: {
  className?: string;
  density?: number;
  linkDistance?: number;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;
    let accent = "14 75 110";
    let line = "214 209 200";
    let pointer = { x: -9999, y: -9999 };

    const readTokens = () => {
      const cs = getComputedStyle(document.documentElement);
      accent = cs.getPropertyValue("--accent").trim() || accent;
      line = cs.getPropertyValue("--line").trim() || line;
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.max(
        16,
        Math.min(90, Math.round(((width * height) / 26000) * density))
      );

      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: 0.7 + Math.random() * 1.5,
        depth: 0.4 + Math.random() * 0.6,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > linkDistance * linkDistance) continue;
          const d = Math.sqrt(d2);
          const alpha = (1 - d / linkDistance) * 0.22 * opacity;
          ctx.strokeStyle = `rgb(${accent} / ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      nodes.forEach((n) => {
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const d = Math.hypot(dx, dy);
        const near = d < 160 ? 1 - d / 160 : 0;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${accent} / ${(0.28 + near * 0.5) * opacity})`;
        ctx.fill();
      });

      const ringCount = Math.min(4, Math.floor(nodes.length / 14));
      for (let i = 0; i < ringCount; i++) {
        const n = nodes[i * 7];
        if (!n) continue;
        const pulse = reduced ? 0 : Math.sin(performance.now() / 3200 + i) * 4;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 16 + i * 5 + pulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgb(${line} / ${0.32 * opacity})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    };

    const step = () => {
      if (!running) return;
      nodes.forEach((n) => {
        n.x += n.vx * n.depth;
        n.y += n.vy * n.depth;

        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < 200 && d > 1) {
          n.x += (dx / d) * 0.06 * (1 - d / 200);
          n.y += (dy / d) * 0.06 * (1 - d / 200);
        }

        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      });
      draw();
      raf = requestAnimationFrame(step);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      pointer = { x: -9999, y: -9999 };
    };

    const onResize = () => {
      build();
      if (reduced) draw();
    };

    const observer = new MutationObserver(() => {
      readTokens();
      if (reduced) draw();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(step);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );

    readTokens();
    build();
    draw();

    if (!reduced) {
      raf = requestAnimationFrame(step);
      io.observe(canvas);
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      io.disconnect();
      observer.disconnect();
    };
  }, [density, linkDistance, opacity]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}