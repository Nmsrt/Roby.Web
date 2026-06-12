import Timecode from "@/components/editor/Timecode";

/**
 * Camera/NLE viewfinder chrome for the hero: corner brackets,
 * a pulsing REC tally and a running timecode.
 */
export default function ViewfinderOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-x-4 bottom-4 top-20 z-10 md:inset-x-8 md:bottom-8"
      aria-hidden="true"
    >
      {/* Corner brackets */}
      <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-ink/30" />
      <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-ink/30" />
      <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-ink/30" />
      <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-ink/30" />

      <div className="absolute left-8 top-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-ink/60">
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse motion-reduce:animate-none" />
        Rec
      </div>

      <Timecode className="absolute right-8 top-1 text-[10px] tracking-[0.2em] text-ink/60" />

      <span className="absolute bottom-1 left-8 hidden text-[10px] uppercase tracking-[0.25em] text-ink/40 md:block">
        1.85:1 — 23.976 fps
      </span>
      <span className="absolute bottom-1 right-8 hidden text-[10px] uppercase tracking-[0.25em] text-ink/40 md:block">
        A001_C012_RDV
      </span>
    </div>
  );
}
