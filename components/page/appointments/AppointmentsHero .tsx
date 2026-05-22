"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { LuArrowRight, LuCalendarDays, LuSparkles } from "react-icons/lu";
import { useClinicSettings } from "@/lib/redux/useClinicSettings";

export default function AppointmentsHero() {
  const { clinicSettings } = useClinicSettings();
  const sectionCopy = clinicSettings?.AppointmentsSurgicalCare ?? null;

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();

    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 96);

    if (prefersReducedMotion) {
      window.scrollTo(0, targetY);
      return;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1200;
    let startTime: number | null = null;

    const easeInOutCubic = (value: number) =>
      value < 0.5
        ? 4 * value * value * value
        : 1 - Math.pow(-2 * value + 2, 3) / 2;

    const animateScroll = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const nextY = startY + distance * easeInOutCubic(progress);

      window.scrollTo(0, nextY);

      if (progress < 1) {
        window.requestAnimationFrame(animateScroll);
      }
    };

    window.requestAnimationFrame(animateScroll);
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(63,132,184,0.14),_transparent_42%)]" />

      <div className="relative mx-auto max-w-[1600px] px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
          <LuSparkles size={14} />
          Appointments & Surgical Care
        </span>

        <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
          {sectionCopy?.title?.trim() || "International ophthalmology expertise with advanced surgical care."}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-foreground/70 sm:text-lg">
          {sectionCopy?.description?.trim() || "Dr. Bachir Abiad provides specialized eye care across leading medical centers in Lebanon and the Gulf region, with expertise in cornea, cataract, and refractive surgery."}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#booking"
            onClick={(event) => scrollToSection(event, "booking")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_-24px_rgba(63,132,184,0.9)] transition hover:-translate-y-0.5"
          >
            Book Appointment
            <LuArrowRight size={16} />
          </Link>

          <Link
            href="#availability"
            onClick={(event) => scrollToSection(event, "availability")}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3.5 text-sm font-semibold text-foreground/80 shadow-sm transition hover:border-primary/40 hover:text-primary"
          >
            <LuCalendarDays size={16} />
            View Availability
          </Link>
        </div>
      </div>
    </section>
  );
}
