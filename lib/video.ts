import type { Project } from "@/data/projects";

export function youtubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/
  );
  return match?.[1] ?? null;
}

export function vimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\w+)/);
  return match?.[1] ?? null;
}

export function driveId(url: string): string | null {
  const match = url.match(
    /drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([\w-]{10,})/
  );
  return match?.[1] ?? null;
}

const FALLBACK_THUMB = "/thumbs/project-01.svg";

/**
 * Explicit thumbnail wins; otherwise derive one from the video URL.
 * Self-hosted videos have no thumbnail service, so they fall back to a
 * placeholder until one is set.
 */
export function projectThumbnail(project: Project): string {
  if (project.thumbnail?.trim()) return project.thumbnail;

  if (project.type === "youtube") {
    const id = youtubeId(project.videoUrl);
    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  if (project.type === "vimeo") {
    const id = vimeoId(project.videoUrl);
    if (id) return `https://vumbnail.com/${id}.jpg`;
  }
  if (project.type === "gdrive") {
    const id = driveId(project.videoUrl);
    if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w1280`;
  }
  return FALLBACK_THUMB;
}
