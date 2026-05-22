"use client";

import Link from "next/link";
import { LuMail, LuMessageCircle } from "react-icons/lu";
import { useClinicSettings } from "@/lib/redux/useClinicSettings";

export default function BookingCTA() {
  const { clinicSettings: contact } = useClinicSettings();

  const whatsappNumber = contact?.whatsappNumber || "+961 81 778 142";
  const email = contact?.email || "info@drbachir.com";
  const whatsappDigits = whatsappNumber.replace(/\D/g, "");

  return (
    <section
      id="booking"
      className="relative overflow-hidden py-10"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-primary px-8 py-14 text-center shadow-[0_35px_80px_-40px_rgba(63,132,184,0.6)] sm:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_35%)]" />

          <div className="relative z-10">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-primary-foreground sm:text-4xl">
              Book your appointment today.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-primary-foreground/80">
              To schedule a consultation, please send a WhatsApp message or email.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`https://wa.me/${whatsappDigits}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-lg transition hover:-translate-y-0.5"
              >
                <LuMessageCircle size={18} />
                WhatsApp Booking
              </Link>

              <Link
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                <LuMail size={18} />
                Email us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
