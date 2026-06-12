export const FPS = 24;

/** SMPTE-style HH:MM:SS:FF from a total frame count */
export function formatFrames(totalFrames: number, fps: number = FPS): string {
  const f = Math.max(0, Math.floor(totalFrames));
  const frames = f % fps;
  const totalSeconds = Math.floor(f / fps);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  return [hours, minutes, seconds, frames]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

export function msToTimecode(ms: number, fps: number = FPS): string {
  return formatFrames((ms / 1000) * fps, fps);
}
