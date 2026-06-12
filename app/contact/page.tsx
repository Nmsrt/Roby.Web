import type { Metadata } from "next";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Roby De Vera for editing, color and motion work.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:pb-36 md:pt-44">
      <div className="mb-16 md:mb-24">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">
          Slate — Contact
        </p>
        <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight md:text-8xl">
          Let&apos;s talk<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {content.contact.intro}
        </p>
      </div>

      <div>
        <h2 className="text-sm uppercase tracking-widest text-muted">Email</h2>
        <a
          href={`mailto:${content.contact.email}`}
          className="mt-4 inline-block font-display text-2xl font-bold break-all tracking-tight transition-colors hover:text-accent md:text-5xl"
        >
          {content.contact.email}
        </a>
      </div>
    </div>
  );
}
