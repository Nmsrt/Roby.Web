import { content } from "@/lib/content";

const FALLBACK = ["Edit", "Color", "Motion", "Sound Design", "Story", "Rhythm"];

/**
 * Scrolling ticker strip between sections — reads like a timeline ruler.
 * Items are managed from /studio (content.marquee). Pure CSS animation;
 * stops under prefers-reduced-motion.
 */
export default function RulerMarquee() {
  const base = content.marquee?.length ? content.marquee : FALLBACK;
  // Each half of the track must be wider than the viewport for a seamless
  // loop, so short lists (e.g. a single phrase) get repeated.
  const items = Array<string[]>(Math.max(1, Math.ceil(6 / base.length)))
    .fill(base)
    .flat();

  return (
    <div
      className="overflow-hidden border-y border-line py-4"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-10 pr-10">
            {items.map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-10">
                <span className="text-sm uppercase tracking-[0.35em] text-muted">
                  {item}
                </span>
                <span className="text-accent">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
