"use client";

import { useEffect, useRef } from "react";
import { formatFrames, FPS } from "@/lib/timecode";

/**
 * Fixed timeline strip at the bottom of the viewport. The playhead tracks
 * scroll progress; the timecode maps the full page to a 60-second "edit".
 * Scroll-linked (user-driven), so it stays active under reduced motion.
 */
export default function ScrollPlayhead() {
  const playhead = useRef<HTMLDivElement>(null);
  const timecode = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (playhead.current) {
        playhead.current.style.left = `${progress * 100}%`;
      }
      if (timecode.current) {
        timecode.current.textContent = formatFrames(progress * 60 * FPS);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 h-8 border-t border-line bg-base/85 backdrop-blur-sm"
      aria-hidden="true"
    >
      <div className="ruler absolute inset-0 opacity-60" />
      <div
        ref={playhead}
        className="absolute bottom-0 top-0 w-px bg-accent"
        style={{ left: "0%" }}
      >
        <span className="absolute -left-[3px] top-0 h-[7px] w-[7px] bg-accent" />
      </div>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.25em] text-muted">
        Timeline
      </span>
      <span
        ref={timecode}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-base/70 px-1 text-[10px] tabular-nums tracking-[0.15em] text-muted"
      >
        00:00:00:00
      </span>
    </div>
  );
}
