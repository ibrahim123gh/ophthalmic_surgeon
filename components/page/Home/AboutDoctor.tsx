 "use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuCircleCheck, LuSparkles } from "react-icons/lu";

const highlights = [
  "Chief of Ophthalmology at Clemenceau Medical Center",
  "Anterior segment, cornea, and refractive surgery specialist",
  "Fellowship-trained at UT Southwestern Medical Center",
];

export default function AboutDoctor() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(63,132,184,0.08),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.08),_transparent_26%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-border/60" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:gap-12">
          <div
            className={`relative transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-12 opacity-0"
            }`}
          >
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-3xl sm:h-32 sm:w-32" />
            <div className="absolute -bottom-6 -right-4 h-28 w-28 rounded-full bg-sky-300/12 blur-3xl sm:h-36 sm:w-36" />

            <div className="relative overflow-hidden rounded-[1.9rem] border border-border/70 bg-background/90 p-3 shadow-[0_28px_80px_-50px_rgba(15,23,42,0.45)] sm:p-4">
              <div className="relative aspect-[5/5] overflow-hidden rounded-[1.45rem] bg-surface">
                <Image
                  src="/dummy/doctor.jpg"
                  alt="Dr. Bachir Abiad"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/14 via-transparent to-transparent" />
              </div>

              <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-[1.25rem] border border-white/15 bg-slate-950/82 p-4 text-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.5)] backdrop-blur-md sm:inset-x-6 sm:bottom-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-300">
                  Profile highlight
                </p>
                <p className="mt-2 text-sm leading-6 text-white/88">
                  Trusted surgical care with calm, precise follow-up.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`relative z-10 max-w-3xl transition-all duration-700 ease-out delay-150 motion-reduce:transform-none motion-reduce:transition-none ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-12 opacity-0"
            }`}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary sm:text-[11px]">
              <LuSparkles size={14} />
              About doctor
            </p>

            <h2 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-foreground sm:text-4xl lg:text-5xl">
              Meet Dr. Bachir Abiad, a specialist in advanced eye surgery.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-foreground/70 sm:text-base sm:leading-8">
              Dr. Bachir Abiad is the Chief of the Department of Ophthalmology
              at Clemenceau Medical Center in Beirut. He is a highly
              specialized anterior segment, cornea, and refractive surgeon with
              advanced fellowship training from UT Southwestern Medical Center
              in the United States.
            </p>

            <div className="mt-8 space-y-3 rounded-[1.5rem] border border-border/70 bg-background/80 p-5 shadow-sm backdrop-blur sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Core expertise
              </p>

              <div className="grid gap-3">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[1.1rem] border border-border/60 bg-surface/70 px-4 py-3"
                  >
                    <LuCircleCheck
                      size={18}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <p className="text-sm leading-6 text-foreground/72 sm:text-[0.95rem]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_-24px_rgba(63,132,184,0.85)] transition hover:-translate-y-0.5 hover:opacity-95"
              >
                Read full About page
                <LuArrowRight size={16} />
              </Link>

              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/80 px-6 py-3.5 text-sm font-semibold text-foreground/80 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
              >
                Contact clinic
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
