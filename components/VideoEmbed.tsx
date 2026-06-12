import type { Project } from "@/data/projects";
import { driveId, projectThumbnail, vimeoId, youtubeId } from "@/lib/video";

export default function VideoEmbed({ project }: { project: Project }) {
  const { type, videoUrl, title } = project;

  if (type === "youtube") {
    const id = youtubeId(videoUrl);
    if (!id) return <EmbedFallback message="Invalid YouTube URL" />;
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-surface">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  if (type === "vimeo") {
    const id = vimeoId(videoUrl);
    if (!id) return <EmbedFallback message="Invalid Vimeo URL" />;
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-surface">
        <iframe
          src={`https://player.vimeo.com/video/${id}`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  if (type === "gdrive") {
    const id = driveId(videoUrl);
    if (!id) return <EmbedFallback message="Invalid Google Drive URL" />;
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-surface">
        <iframe
          src={`https://drive.google.com/file/d/${id}/preview`}
          title={title}
          allow="autoplay; fullscreen"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <video
      controls
      playsInline
      preload="metadata"
      poster={projectThumbnail(project)}
      className="aspect-video w-full bg-surface object-cover"
    >
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

function EmbedFallback({ message }: { message: string }) {
  return (
    <div className="flex aspect-video w-full items-center justify-center bg-surface text-sm text-muted">
      {message}
    </div>
  );
}
