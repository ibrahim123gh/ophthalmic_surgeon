"use client";

import { useEffect, useRef, useState } from "react";

import {
  LuArrowRight,
  LuEye,
  LuGlasses,
  LuScanEye,
  LuShieldCheck,
  LuSparkles,
} from "react-icons/lu";

const services = [
  {
    title: "Complex Cataract Surgery",
    description:
      "Advanced cataract procedures, including complex cases and customized surgical planning.",
    icon: LuScanEye,
  },
  {
    title: "Corneal Transplantation",
    description:
      "Specialized corneal procedures including DMEK, DSAEK, DALK, and PKP.",
    icon: LuEye,
  },
  {
    title: "Refractive Surgery",
    description:
      "Vision correction options including PRK, Trans-PRK, Femto-LASIK, SMILE, and CLEAR.",
    icon: LuGlasses,
  },
  {
    title: "Anterior Segment Reconstruction",
    description:
      "Advanced reconstruction procedures for complex anterior segment conditions.",
    icon: LuShieldCheck,
  },
  {
    title: "FemtoRings",
    description:
      "Femto-assisted ring segment implantation for selected corneal and refractive cases.",
    icon: LuSparkles,
  },
  {
    title: "Specialized Consultation",
    description:
      "Expert evaluation for cornea, cataract, and refractive surgery treatment planning.",
    icon: LuEye,
  },
];

export default function ServicesSection() {
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
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(63,132,184,0.12),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.08),_transparent_35%)]" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-primary sm:text-[11px]">
            <LuSparkles size={14} />
            Our Services
          </span>

          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
            Advanced ophthalmology services focused on precision eye surgery.
          </h2>

          <p className="mt-4 text-sm leading-7 text-foreground/70 sm:text-base">
            Explore specialized surgical care in cataract, cornea, anterior
            segment reconstruction, and refractive vision correction.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className={`group rounded-[1.5rem] border border-border/70 bg-background/80 p-5 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)] backdrop-blur transition-all duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none motion-safe:hover:-translate-y-1 motion-safe:hover:border-primary motion-safe:hover:bg-primary motion-safe:hover:text-primary-foreground motion-safe:hover:shadow-[0_22px_45px_-28px_rgba(63,132,184,0.35)] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 90}ms` : "0ms",
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition duration-300 motion-safe:group-hover:scale-105 motion-safe:group-hover:bg-white motion-safe:group-hover:text-primary">
                    <Icon size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground transition group-hover:text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-foreground/68 transition group-hover:text-white/80">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45 transition group-hover:text-primary-foreground/80">
                    Specialized care
                  </span>
                  <LuArrowRight
                    size={16}
                    className="text-primary transition duration-300 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:text-white"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
