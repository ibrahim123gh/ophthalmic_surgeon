"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import {
  LuArrowRight,
  LuClock3,
  LuShieldCheck,
  LuSparkles,
} from "react-icons/lu";

const slides = [
  {
    eyebrow: "Anterior segment & refractive surgeon",
    title: "Advanced eye surgery led by Dr. Bachir Abiad.",
    text: "Chief of Ophthalmology at Clemenceau Medical Center, specializing in cornea, cataract, anterior segment reconstruction, and refractive surgery.",
    image: "/dummy/hero2.jpg",
    highlight: "Cornea, cataract & refractive expertise",
  },
  {
    eyebrow: "US fellowship-trained ophthalmologist",
    title: "Precision vision care with international expertise.",
    text: "Trained at AUB and UT Southwestern Medical Center in the USA, with clinical experience across Lebanon, the UAE, and Bahrain.",
    image: "/dummy/hero1.jpg",
    highlight: "US-trained surgical specialist",
  },
];

const quickStats = [
  { label: "Hospitals in Lebanon", value: "5+" },
  { label: "Publications", value: "10+" },
  { label: "International practice", value: "3 Countries" },
];

function AnimatedPhrase({
  text,
  active,
  className = "",
  letterClassName = "",
  enterDelay = 12,
  exitDelay = 8,
  enterDuration = 420,
  exitDuration = 260,
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
  const words = text.trim().split(/\s+/);
  const totalLetters = words.reduce(
    (count, word) => count + Array.from(word).length,
    0,
  );
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
                  className={`hero-letter ${
                    active ? "hero-letter-in" : "hero-letter-out"
                  } ${letterClassName}`}
                  style={{
                    animationDelay: `${delay}ms`,
                    animationDuration: `${active ? enterDuration : exitDuration}ms`,
                  }}
                >
                  {char}
                </span>
              );
            })}

            {wordIndex < words.length - 1 ? (
              <span aria-hidden="true" className="inline-block w-[0.24em]" />
            ) : null}
          </span>
        ))}
      </span>
    </span>
  );
}

function GsapTitle({
  text,
  active,
}: {
  text: string;
  active: boolean;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const textEl = root.querySelector<HTMLElement>("[data-title-text]");
    if (!textEl) return;

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
        duration: Math.max(chars.length * 0.05, 2),
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
      duration: Math.max(chars.length * 0.018, 0.22),
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
    <span
      ref={rootRef}
      className="relative block w-full"
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible block text-balance">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden text-balance"
      >
        <span data-title-text className="hero-typewriter-text" />
        <span
          className={`hero-caret ${active ? "hero-caret-active" : "hero-caret-hidden"}`}
        />
      </span>
    </span>
  );
}

export default function HeroSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="hero-shell hero-carousel relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="hero-orb hero-orb-one absolute left-[-6rem] top-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="hero-orb hero-orb-two absolute right-[-4rem] top-40 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="hero-orb hero-orb-three absolute bottom-[-7rem] left-1/3 h-64 w-64 rounded-full bg-white/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-4 pt-6 sm:px-6 sm:py-10 lg:min-h-[calc(90svh-90px)] lg:px-8 xl:px-10">
        <div className="relative lg:min-h-[calc(90svh-110px)]">
          <div className="relative">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <article
                  key={slide.title}
                  aria-hidden={!isActive}
                  className={`hero-carousel-slide grid items-start gap-6 transition-all duration-700 ease-out sm:gap-8 lg:absolute lg:inset-0 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 ${
                    isActive
                      ? "hero-carousel-slide-active pointer-events-auto opacity-100 translate-y-0 scale-100"
                      : "hidden pointer-events-none opacity-0 translate-y-3 scale-[0.985] lg:grid"
                  }`}
                >
                  <div className="hero-copy-shell relative z-10 max-w-2xl">
                    <div
                      data-hero-reveal
                      data-hero-step="0"
                      className="hero-fade inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary shadow-sm backdrop-blur sm:text-[11px]"
                    >
                      <LuSparkles size={14} />
                      <AnimatedPhrase
                        text={slide.eyebrow}
                        active={isActive}
                        enterDelay={14}
                        exitDelay={10}
                        enterDuration={360}
                        exitDuration={240}
                      />
                    </div>

                    <h1
                      data-hero-reveal
                      data-hero-step="1"
                      className="hero-fade mt-5 max-w-xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl"
                    >
                      <GsapTitle
                        text={slide.title}
                        active={isActive}
                      />
                    </h1>

                    <p
                      data-hero-reveal
                      data-hero-step="2"
                      className="hero-fade mt-6 max-w-xl text-base leading-8 text-foreground/70 sm:text-lg"
                    >
                      {slide.text}
                    </p>

                    <div
                      data-hero-reveal
                      data-hero-step="3"
                      className="hero-fade hero-actions mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                    >
                      <Link
                        href="#"
                        className="hero-action-link inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_-22px_rgba(63,132,184,0.9)] transition hover:-translate-y-0.5 hover:opacity-95"
                      >
                        Book Consultation
                        <LuArrowRight size={16} />
                      </Link>
                      <Link
                        href="#"
                        className="hero-action-link inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3.5 text-sm font-semibold text-foreground/80 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                      >
                        Learn More
                      </Link>
                    </div>

                    <div
                      data-hero-reveal
                      data-hero-step="4"
                      className="hero-fade hero-stats mt-10 grid gap-3 sm:grid-cols-3"
                    >
                      {quickStats.map((stat) => (
                        <div
                          key={stat.label}
                          className="hero-stat-card rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm backdrop-blur"
                        >
                          <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                            {stat.value}
                          </p>
                          <p className="mt-1 text-xs font-medium uppercase tracking-[0.22em] text-foreground/55">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
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
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority={index === 0}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="hero-image object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
                          <span
                            aria-hidden="true"
                            className="hero-image-sheen pointer-events-none absolute inset-y-0 left-[-35%] w-[35%] bg-gradient-to-r from-transparent via-white/25 to-transparent"
                          />
                        </div>
                      </div>

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
                              Specialized Care
                            </p>
                            <p className="text-xs text-foreground/60">
                              {slide.highlight}
                            </p>
                          </div>
                        </div>
                      </div>

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
                              International Expertise
                            </p>
                            <p className="text-xs text-foreground/60">
                              Lebanon, UAE & Bahrain
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="hero-dots relative z-20 mt-6 mx-auto flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-2 shadow-sm backdrop-blur lg:absolute lg:left-1/2 lg:bottom-0 lg:mt-0 lg:-translate-x-1/2">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-primary/25 hover:bg-primary/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
