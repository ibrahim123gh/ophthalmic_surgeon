"use client";

import Link from "next/link";
import { LuArrowRight, LuCalendarDays, LuSparkles } from "react-icons/lu";

export default function AppointmentsHero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(63,132,184,0.14),_transparent_42%)]" />

      <div className="relative mx-auto max-w-[1600px] px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
          <LuSparkles size={14} />
          Appointments & Surgical Care
        </span>

        <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
          International ophthalmology expertise with advanced surgical care.
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-foreground/70 sm:text-lg">
          Dr. Bachir Abiad provides specialized eye care across leading medical
          centers in Lebanon and the Gulf region, with expertise in cornea,
          cataract, and refractive surgery.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#booking"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_-24px_rgba(63,132,184,0.9)] transition hover:-translate-y-0.5"
          >
            Book Appointment
            <LuArrowRight size={16} />
          </Link>

          <Link
            href="#availability"
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