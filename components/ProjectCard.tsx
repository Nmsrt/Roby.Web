"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/data/projects";
import { projectThumbnail } from "@/lib/video";

export default function ProjectCard({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const scrubLine = useRef<HTMLDivElement>(null);

  const playPreview = () => {
    video.current?.play().catch(() => {});
  };

  const stopPreview = () => {
    const el = video.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  // Playhead-style line tracks the cursor across the thumbnail, like
  // scrubbing a clip in a bin.
  const onScrub = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrubLine.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    scrubLine.current.style.left = `${Math.min(Math.max(x, 0), 100)}%`;
  };

  const clipNumber = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/portfolio/${project.id}`}
      data-card
      className="group block"
      onMouseEnter={project.previewUrl ? playPreview : undefined}
      onMouseLeave={project.previewUrl ? stopPreview : undefined}
      onFocus={project.previewUrl ? playPreview : undefined}
      onBlur={project.previewUrl ? stopPreview : undefined}
    >
      <div
        className="relative aspect-video overflow-hidden bg-surface"
        onPointerMove={onScrub}
      >
        <Image
          src={projectThumbnail(project)}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {project.previewUrl && (
          <video
            ref={video}
            src={project.previewUrl}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Clip in/out edge marks */}
        <span className="absolute inset-y-0 left-0 w-[3px] bg-accent/0 transition-colors duration-300 group-hover:bg-accent/80" />
        <span className="absolute inset-y-0 right-0 w-[3px] bg-accent/0 transition-colors duration-300 group-hover:bg-accent/80" />

        {/* Scrub playhead following the cursor */}
        <div
          ref={scrubLine}
          className="pointer-events-none absolute inset-y-0 w-px bg-ink/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ left: "50%" }}
        />

        <span className="absolute left-3 top-3 bg-base/70 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-ink/80 backdrop-blur-sm">
          Clip {clipNumber}
        </span>
        <span className="absolute bottom-3 left-3 bg-base/70 px-2 py-1 text-[10px] tabular-nums tracking-[0.15em] text-ink/80 backdrop-blur-sm">
          {project.duration}
        </span>
        <span className="absolute bottom-3 right-3 text-xs uppercase tracking-widest text-ink opacity-0 transition-all duration-500 group-hover:opacity-100">
          Watch <span className="text-accent">→</span>
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-accent md:text-2xl">
          <span className="mr-3 text-sm font-normal text-muted">
            {clipNumber}
          </span>
          {project.title}
        </h3>
        <span className="shrink-0 text-sm text-muted">{project.year}</span>
      </div>
      <p className="mt-1 text-sm text-muted">{project.role}</p>
    </Link>
  );
}
