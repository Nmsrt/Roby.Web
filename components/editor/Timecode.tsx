"use client";

import { useEffect, useRef } from "react";
import { msToTimecode } from "@/lib/timecode";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Running SMPTE timecode (24fps). Writes straight to the DOM node —
 * no per-frame React re-renders. Freezes under prefers-reduced-motion.
 */
export default function Timecode({ className = "" }: { className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !el.current) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      if (el.current) el.current.textContent = msToTimecode(now - start);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  return (
    <span ref={el} className={`tabular-nums ${className}`}>
      00:00:00:00
    </span>
  );
}
