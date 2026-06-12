"use client";

import { useRef } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/projects";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
          gsap.from(card, {
            y: 56,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              once: true,
            },
          });
        });

        // Trigger positions are measured before fonts/images settle under
        // the 100svh hero; re-measure once everything has loaded so cards
        // never get stuck at opacity 0.
        const refresh = () => ScrollTrigger.refresh();
        if (document.readyState === "complete") {
          refresh();
        } else {
          window.addEventListener("load", refresh, { once: true });
        }
        const settle = window.setTimeout(refresh, 800);
        return () => {
          window.removeEventListener("load", refresh);
          window.clearTimeout(settle);
        };
      });
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20"
    >
      {projects.map((project, i) => (
        <div key={project.id} className={i % 2 === 1 ? "md:mt-16" : ""}>
          <ProjectCard project={project} index={i} priority={i < 2} />
        </div>
      ))}
    </div>
  );
}
