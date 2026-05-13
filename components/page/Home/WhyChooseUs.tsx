"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

const items = [
  {
    title: "US Fellowship Training",
    text: "Advanced subspecialty training in cornea, anterior segment, and refractive surgery at UT Southwestern Medical Center in the USA.",
    image: "/dummy/whyChooseUs.jpg",
  },
  {
    title: "Advanced Surgical Expertise",
    text: "Specialized care in complex cataract surgery, corneal transplantation, and modern refractive procedures including SMILE and CLEAR.",
    image: "/dummy/whyChooseUs1.jpg",
  },
  {
    title: "Academic & International Leadership",
    text: "Chief of Ophthalmology at CMC Beirut, Assistant Professor at LAU, and consultant ophthalmologist across Lebanon, UAE, and Bahrain.",
    image: "/dummy/whyChooseUs2.jpg",
  },
];

export default function WhyChooseUs() {
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
        threshold: 0.2,
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
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(63,132,184,0.1),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.08),_transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-border/60" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            <Sparkles size={14} />
            Why choose us
          </span>

          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.05em] text-foreground sm:text-4xl lg:text-5xl">
            International expertise combined with advanced ophthalmic surgical
            care.
          </h2>

          <p className="mt-4 text-sm leading-7 text-foreground/70 sm:text-base">
            A patient-centered approach supported by modern surgical techniques,
            academic leadership, and specialized international training.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={index}
              className={`group overflow-hidden rounded-[1.75rem] border border-border/70 bg-background/80 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur transition-all duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none motion-safe:hover:-translate-y-1 motion-safe:hover:border-primary/40 motion-safe:hover:shadow-[0_24px_70px_-40px_rgba(63,132,184,0.25)] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 110}ms` : "0ms",
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition duration-700 motion-safe:group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/28 to-transparent" />

                <div className="absolute left-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/12 text-sm font-semibold text-white/90 backdrop-blur-md">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <div className="h-[2px] w-12 bg-primary/60" />

                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-foreground">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-foreground/70">
                  {item.text}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                    Specialized ophthalmology
                  </span>

                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-primary transition duration-300 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:bg-primary motion-safe:group-hover:text-primary-foreground">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
