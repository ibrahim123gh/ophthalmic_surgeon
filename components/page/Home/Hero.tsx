"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuClock3, LuShieldCheck, LuSparkles } from "react-icons/lu";
import { useClinicSettings } from "@/lib/redux/useClinicSettings";

type HeroSectionRecord = {
  _id: string;
  badge?: string;
  title: string;
  subtitle: string;
  ButtonLink?: {
    text?: string;
  };
  stats?: Array<{ value?: string; label?: string }>;
  image?: string;
  floatingCards?: Array<{ title?: string; subtitle?: string }>;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.drbachirabiad.com/api/v1";

function resolveImageUrl(image?: string | null) {
  if (!image) {
    return "";
  }

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  const assetsBase = process.env.NEXT_PUBLIC_ASSETS_URL?.replace(/\/$/, "");
  const normalizedPath = image.startsWith("/") ? image : `/${image}`;

  return assetsBase ? `${assetsBase}${normalizedPath}` : normalizedPath;
}

function normalizeButtonHref(value?: string | null) {
  const rawValue = value?.trim() || "";

  if (!rawValue) {
    return "";
  }

  if (/^https?:\/\//i.test(rawValue) || rawValue.startsWith("/")) {
    return rawValue;
  }

  return `https://${rawValue}`;
}

function AnimatedPhrase({
  text,
  active,
  className = "",
  letterClassName = "",
  enterDelay = 18,
  exitDelay = 12,
  enterDuration = 560,
  exitDuration = 340,
}: {
  text: string;
  active: boolean;
  className?: string;
  letterClassName?: string;
  enterDelay?: number;
  exitDelay?: number;
  enterDuration?: number;
  exitDuration?: number;
}) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const totalLetters = words.reduce((count, word) => count + Array.from(word).length, 0);
  let letterIndex = 0;

  return (
    <span className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {words.map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`} className="inline-flex whitespace-nowrap">
            {Array.from(word).map((char) => {
              const currentIndex = letterIndex++;
              const delay = active
                ? currentIndex * enterDelay
                : (totalLetters - 1 - currentIndex) * exitDelay;

              return (
                <span
                  key={`${word}-${wordIndex}-${currentIndex}`}
                  className={`hero-letter ${active ? "hero-letter-in" : "hero-letter-out"} ${letterClassName}`}
                  style={{
                    animationDelay: `${delay}ms`,
                    animationDuration: `${active ? enterDuration : exitDuration}ms`,
                  }}
                >
                  {char}
                </span>
              );
            })}

            {wordIndex < words.length - 1 ? <span aria-hidden="true" className="inline-block w-[0.24em]" /> : null}
          </span>
        ))}
      </span>
    </span>
  );
}

function GsapTitle({ text, active }: { text: string; active: boolean }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const textEl = root.querySelector<HTMLElement>("[data-title-text]");
    if (!textEl) {
      return;
    }

    timelineRef.current?.kill();
    timelineRef.current = null;

    if (active) {
      const chars = Array.from(text);
      const state = { count: 0 };

      textEl.textContent = "";

      const render = () => {
        textEl.textContent = chars.slice(0, Math.round(state.count)).join("");
      };

      render();

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
      });

      timeline.to(state, {
        count: chars.length,
        duration: Math.max(chars.length * 0.08, 3),
        onUpdate: render,
      });

      timelineRef.current = timeline;
      return () => {
        timeline.kill();
      };
    }

    const currentText = textEl.textContent ?? "";
    if (!currentText) {
      return;
    }

    const chars = Array.from(currentText);
    const state = { count: chars.length };

    const render = () => {
      textEl.textContent = chars.slice(0, Math.round(state.count)).join("");
    };

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
    });

    timeline.to(state, {
      count: 0,
      duration: Math.max(chars.length * 0.03, 0.32),
      onUpdate: render,
      onComplete: () => {
        textEl.textContent = "";
      },
    });

    timelineRef.current = timeline;
    return () => {
      timeline.kill();
    };
  }, [active, text]);

  return (
    <span ref={rootRef} className="relative block w-full" aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible block text-balance">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0 overflow-hidden text-balance">
        <span data-title-text className="hero-typewriter-text" />
        <span className={`hero-caret ${active ? "hero-caret-active" : "hero-caret-hidden"}`} />
      </span>
    </span>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid min-h-[60vh] items-center gap-10 lg:absolute lg:inset-0 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
      <div className="hero-copy-shell relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 backdrop-blur">
          <span className="h-3 w-3 rounded-full bg-primary/35 animate-pulse" />
          <span className="h-3 w-44 rounded-full bg-foreground/10 animate-pulse" />
        </div>

        <div className="mt-5 space-y-3">
          <div className="h-10 w-[92%] rounded-full bg-foreground/10 animate-pulse sm:h-12 lg:h-16" />
          <div className="h-10 w-[78%] rounded-full bg-foreground/10 animate-pulse sm:h-12 lg:h-16" />
        </div>

        <div className="mt-6 space-y-2">
          <div className="h-4 w-full rounded-full bg-foreground/10 animate-pulse" />
          <div className="h-4 w-[92%] rounded-full bg-foreground/10 animate-pulse" />
          <div className="h-4 w-[84%] rounded-full bg-foreground/10 animate-pulse" />
        </div>

        <div className="mt-8 flex gap-3">
          <div className="h-12 w-40 rounded-full bg-foreground/10 animate-pulse" />
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`hero-stat-skeleton-${index}`}
              className="rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm backdrop-blur"
            >
              <div className="h-8 w-12 rounded-full bg-foreground/10 animate-pulse" />
              <div className="mt-3 h-3 w-24 rounded-full bg-foreground/10 animate-pulse" />
              <div className="mt-2 h-3 w-32 rounded-full bg-foreground/10 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      <div className="hero-media-shell relative z-10">
        <div className="relative mx-auto w-full max-w-[620px]">
          <div className="hero-image-frame relative overflow-hidden rounded-[1.75rem] p-3 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:rounded-[2rem]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-foreground/10 sm:aspect-[5/6] sm:rounded-[1.6rem]">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-foreground/10 via-foreground/5 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent" />
            </div>
          </div>

          <div className="hero-float-card absolute -bottom-3 left-3 right-3 rounded-2xl border border-border/70 px-4 py-3 shadow-lg backdrop-blur sm:right-auto sm:left-4">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                <LuClock3 size={18} />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-36 rounded-full bg-foreground/10 animate-pulse" />
                <div className="h-3 w-48 rounded-full bg-foreground/10 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function resolveEntries(records: HeroSectionRecord[]) {
  return records.map((record) => ({
    eyebrow: record.badge || "Hero section",
    title: record.title,
    text: record.subtitle,
    buttonText: "Book Consultation",
    learnMoreHref: normalizeButtonHref(record.ButtonLink?.text),
    image: resolveImageUrl(record.image),
    alt: record.title,
    stats: record.stats ?? [],
    floatingCards: record.floatingCards ?? [],
  }));
}

export default function HeroSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [heroRecords, setHeroRecords] = useState<HeroSectionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { clinicSettings: latestSettings } = useClinicSettings();
  const whatsappNumber = latestSettings?.whatsappNumber || "+961 81 778 142";
  const whatsappDigits = whatsappNumber.replace(/\D/g, "");
  const whatsappHref = `https://wa.me/${whatsappDigits}`;

  useEffect(() => {
    let ignore = false;

    const loadHeroSections = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/hero-section`, {
          cache: "no-store",
        });

        if (!response.ok) {
          if (!ignore) {
            setHeroRecords([]);
          }
          return;
        }

        const data = (await response.json()) as HeroSectionRecord[];

        if (!ignore) {
          setHeroRecords(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!ignore) {
          setHeroRecords([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void loadHeroSections();

    return () => {
      ignore = true;
    };
  }, []);

  const slides = useMemo(() => resolveEntries(heroRecords), [heroRecords]);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  const displayActiveIndex = slides.length > 0 ? activeIndex % slides.length : 0;
  const activeSlide = slides[displayActiveIndex] ?? null;

  return (
    <section className="hero-shell hero-carousel relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="hero-orb hero-orb-one absolute left-[-6rem] top-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="hero-orb hero-orb-two absolute right-[-4rem] top-40 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="hero-orb hero-orb-three absolute bottom-[-7rem] left-1/3 h-64 w-64 rounded-full bg-white/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-4 pt-6 pb-10 sm:px-6 sm:py-10 lg:min-h-[calc(100svh-90px)] lg:px-8 lg:pb-14 xl:px-10">
        <div className="relative lg:flex lg:min-h-[calc(100svh-110px)] lg:flex-col">
          {isLoading ? (
            <LoadingSkeleton />
          ) : !activeSlide ? (
            <div className="grid min-h-[60vh] place-items-center text-center">
              <p className="text-sm font-medium text-foreground/60">No hero content available yet.</p>
            </div>
          ) : (
            <>
              <article className="hero-carousel-slide hero-carousel-slide-active grid items-start gap-6 transition-all duration-700 ease-out sm:gap-8 lg:flex-1 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-8 xl:grid-cols-[1.12fr_0.88fr]">
                <div className="hero-copy-shell relative z-10 max-w-[46rem]">
                  <div
                    data-hero-reveal
                    data-hero-step="0"
                    className="hero-fade inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary shadow-sm backdrop-blur sm:text-[11px]"
                  >
                    <LuSparkles size={14} />
                    <AnimatedPhrase
                      text={activeSlide.eyebrow}
                      active
                      enterDelay={18}
                      exitDelay={12}
                      enterDuration={560}
                      exitDuration={340}
                    />
                  </div>

                  <h1
                    data-hero-reveal
                    data-hero-step="1"
                    className="hero-fade mt-4 max-w-[12ch] text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-5xl lg:max-w-[15ch] lg:text-[2.55rem] lg:leading-[1.02] xl:max-w-[16ch] xl:text-[3.15rem] xl:leading-[1.04]"
                  >
                    <GsapTitle text={activeSlide.title} active />
                  </h1>

                  <p
                    data-hero-reveal
                    data-hero-step="2"
                    className="hero-fade mt-4 max-w-xl text-sm leading-7 text-foreground/70 sm:text-base sm:leading-8"
                  >
                    {activeSlide.text}
                  </p>

                  <div
                    data-hero-reveal
                    data-hero-step="3"
                    className="hero-fade hero-actions mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                  >
                    <Link
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="hero-action-link inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_-22px_rgba(63,132,184,0.9)] transition hover:-translate-y-0.5 hover:opacity-95"
                    >
                      Book Now
                      <LuArrowRight size={16} />
                    </Link>
                    {activeSlide.learnMoreHref ? (
                      <Link
                        href={activeSlide.learnMoreHref}
                        target={/^https?:\/\//i.test(activeSlide.learnMoreHref) ? "_blank" : undefined}
                        rel={/^https?:\/\//i.test(activeSlide.learnMoreHref) ? "noreferrer" : undefined}
                        className="hero-action-link inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3.5 text-sm font-semibold text-foreground/80 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                      >
                        Online Consultation
                        <LuArrowRight size={16} />
                      </Link>
                    ) : null}
                  </div>

                  {activeSlide.stats.length > 0 ? (
                    <div
                      data-hero-reveal
                      data-hero-step="4"
                      className="hero-fade hero-stats mt-8 grid gap-3 sm:grid-cols-3"
                    >
                      {activeSlide.stats.map((stat, index) => (
                        <div
                          key={`${activeSlide.title}-stat-${index}`}
                          className="hero-stat-card rounded-2xl border border-border/70 bg-background/70 p-3 shadow-sm backdrop-blur lg:p-4"
                        >
                          <p className="text-xl font-semibold tracking-[-0.04em] text-foreground lg:text-2xl">
                            {stat.value || "-"}
                          </p>
                          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/55 lg:text-xs lg:tracking-[0.22em]">
                            {stat.label || "-"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="hero-media-shell relative z-10">
                  <div className="relative mx-auto w-full max-w-[620px]">
                    <div className="absolute -left-2 top-10 h-20 w-20 rounded-full bg-primary/20 blur-2xl sm:-left-8 sm:top-12 sm:h-32 sm:w-32" />
                    <div className="absolute -right-2 bottom-10 h-24 w-24 rounded-full bg-sky-300/20 blur-2xl sm:-right-8 sm:h-36 sm:w-36" />

                    <div
                      data-hero-reveal
                      data-hero-step="5"
                      className="hero-image-frame hero-media-frame relative overflow-hidden rounded-[1.75rem] p-3 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:rounded-[2rem]"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-slate-100 sm:aspect-[5/6] sm:rounded-[1.6rem]">
                        {activeSlide.image ? (
                          <Image
                            src={process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE + activeSlide.image}
                            alt={activeSlide.alt}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="hero-image object-cover object-center"
                          />
                        ) : (
                          <div className="absolute inset-0 grid place-items-center bg-slate-100 text-sm text-slate-400">
                            No image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
                        <span
                          aria-hidden="true"
                          className="hero-image-sheen pointer-events-none absolute inset-y-0 left-[-35%] w-[35%] bg-gradient-to-r from-transparent via-white/25 to-transparent"
                        />
                      </div>
                    </div>

                    {activeSlide.floatingCards[0] ? (
                      <div
                        data-hero-reveal
                        data-hero-step="6"
                        className="hero-float-card hero-float-card-primary absolute -bottom-3 left-3 right-3 rounded-2xl border border-border/70 px-4 py-3 shadow-lg backdrop-blur sm:right-auto sm:left-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                            <LuClock3 size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {activeSlide.floatingCards[0].title || "Specialized Care"}
                            </p>
                            <p className="text-xs text-foreground/60">
                              {activeSlide.floatingCards[0].subtitle || activeSlide.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {activeSlide.floatingCards[1] ? (
                      <div
                        data-hero-reveal
                        data-hero-step="7"
                        className="hero-float-card hero-float-card-secondary absolute -right-2 top-8 hidden rounded-2xl border border-border/70 px-4 py-3 shadow-lg backdrop-blur md:block"
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                            <LuShieldCheck size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {activeSlide.floatingCards[1].title || "International Expertise"}
                            </p>
                            <p className="text-xs text-foreground/60">
                              {activeSlide.floatingCards[1].subtitle || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>

              {slides.length > 1 ? (
                <div className="hero-dots relative z-20 mt-6 mx-auto flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-2 shadow-sm backdrop-blur lg:mt-8 lg:self-center">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.title}
                      type="button"
                      aria-label={`Show slide ${index + 1}`}
                      aria-pressed={index === displayActiveIndex}
                      onClick={() => setActiveIndex(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === displayActiveIndex ? "w-8 bg-primary" : "w-2.5 bg-primary/25 hover:bg-primary/45"
                      }`}
                    />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
