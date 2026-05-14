"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Video } from "lucide-react";

const videos = Array.from({ length: 17 }, (_, i) => {
  const index = i + 1;
  const spotlight = index === 1;

  return {
    title: spotlight ? "Clinic introduction" : `Clinic video ${index}`,
    src: `/video/video${index}.mp4`,
    category:
      index <= 4
        ? "Patient care"
        : index <= 8
          ? "Treatment room"
          : index <= 12
            ? "Equipment"
            : "Consultation",
    summary:
      index === 1
        ? "A calm introduction to the clinic, the medical team, and the patient-first experience."
        : "A short visual glimpse into modern ophthalmology care and the clinic environment.",
  };
});

const stats = [
  { value: "17", label: "Curated clips" },
  { value: "4", label: "Care categories" },
  { value: "1", label: "Featured story" },
];

export default function VideoGalleryPage() {
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [isVisible, setIsVisible] = useState(false);
  const [featuredAnimKey, setFeaturedAnimKey] = useState(0);

  useEffect(() => {
    const enterFrame = window.requestAnimationFrame(() => setIsVisible(true));

    return () => window.cancelAnimationFrame(enterFrame);
  }, []);

  useEffect(() => {
    const enterFrame = window.requestAnimationFrame(() =>
      setFeaturedAnimKey((current) => current + 1),
    );

    return () => window.cancelAnimationFrame(enterFrame);
  }, [activeVideo.src]);

  return (
    <main className="relative overflow-hidden bg-background">
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(63,132,184,0.12),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.08),_transparent_28%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-border/60" />

        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <div
              className={`max-w-3xl transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                <Video size={14} />
                Video gallery
              </span>

              <h1 className="mt-5 text-3xl font-semibold leading-[1.06] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
                A polished look at the clinic, the care, and the patient journey.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/70 sm:mt-5 sm:text-lg sm:leading-8">
                This page is designed like a proper media library, not a plain
                grid. The featured clip sets the tone, while the rest of the
                collection stays easy to browse and professional.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="#library"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_-24px_rgba(63,132,184,0.9)] transition hover:-translate-y-0.5 hover:opacity-95 sm:w-auto"
                >
                  Browse library
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background/75 px-6 py-3.5 text-sm font-semibold text-foreground/80 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary sm:w-auto"
                >
                  Book consultation
                </Link>
              </div>
            </div>

            <div
              className={`grid gap-3 transition-all duration-700 ease-out delay-150 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.5rem] border border-border/70 bg-background/80 p-4 shadow-[0_16px_45px_-32px_rgba(15,23,42,0.3)] backdrop-blur sm:p-5"
                >
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-foreground/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <article
              className={`group overflow-hidden rounded-[2rem] border border-border/70 bg-background/85 shadow-[0_20px_70px_-44px_rgba(15,23,42,0.38)] backdrop-blur transition-all duration-700 ease-out delay-300 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <div className="flex flex-col gap-3 border-b border-border/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                    Featured clip
                  </p>
                  <h2 className="mt-1 text-base font-semibold tracking-[-0.03em] text-foreground sm:text-xl">
                    {activeVideo.title}
                  </h2>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-xs">
                  <Sparkles size={14} />
                  Highlight
                </span>
              </div>

              <div className="px-4 pb-4 pt-5 sm:px-6 sm:pb-6 sm:pt-8">
                <div
                  key={featuredAnimKey}
                  className="soft-rise relative overflow-hidden rounded-[1.6rem] border border-border/70 bg-surface/80 sm:rounded-[1.8rem]"
                >
                  <video
                    key={activeVideo.src}
                    src={activeVideo.src}
                    className="aspect-[16/10] w-full object-cover sm:aspect-[21/8.8] sm:object-contain"
                    muted
                    playsInline
                    controls
                    preload="metadata"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.32)_0%,rgba(15,23,42,0)_34%)]" />

                  <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground shadow-[0_14px_30px_-20px_rgba(15,23,42,0.35)] backdrop-blur sm:left-4 sm:top-4 sm:text-xs sm:tracking-[0.18em]">
                    <Play size={14} className="text-primary" />
                    Watch intro
                  </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-border/70 bg-surface px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/65">
                        {activeVideo.category}
                      </span>
                      <span className="rounded-full border border-border/70 bg-surface px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/65">
                        Clinic overview
                      </span>
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/68">
                      {activeVideo.summary}
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background/75 px-5 py-3 text-sm font-semibold text-foreground/80 transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary lg:w-auto"
                  >
                    Ask about videos
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          </div>

          <div id="library" className="mt-10">
            <div
              className={`flex flex-col gap-3 transition-all duration-700 ease-out delay-500 md:flex-row md:items-end md:justify-between md:gap-4 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
            >
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Select a clip
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
                  Tap any video to feature it above
                </h2>
              </div>
              <p className="text-sm leading-7 text-foreground/60 md:max-w-md">
                The player updates instantly, so the selected clip always takes
                center stage.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {videos.map((video, index) => (
                <button
                  key={video.src}
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  className={`group overflow-hidden rounded-[1.7rem] border bg-background/85 text-left shadow-[0_18px_60px_-44px_rgba(15,23,42,0.34)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-44px_rgba(63,132,184,0.18)] ${
                    activeVideo.src === video.src
                      ? "border-primary/40 ring-2 ring-primary/20"
                      : "border-border/70 hover:border-primary/30"
                  }`}
                  style={{
                    transitionDelay: `${isVisible ? index * 45 : 0}ms`,
                  }}
                >
                  <div className="relative aspect-video overflow-hidden bg-surface">
                    <video
                      src={video.src}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                      muted
                      playsInline
                      controls
                      preload="metadata"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.28)_0%,rgba(15,23,42,0)_42%)]" />
                    <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-foreground shadow-sm backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                      {video.category}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-foreground">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-foreground/62">
                      {video.summary}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
