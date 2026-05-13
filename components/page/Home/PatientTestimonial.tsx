"use client";

import { ArrowRight, Quote, Sparkles, Star } from "lucide-react";
import { Autoplay, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const stats = [
  { value: "4.9/5", label: "Average patient rating" },
  { value: "120+", label: "Feedback notes reviewed" },
  { value: "98%", label: "Would recommend the clinic" },
];

const testimonials = [
  {
    name: "Maya K.",
    service: "Eye consultation",
    procedure: "Initial diagnosis",
    rating: 5,
    text: "The visit felt calm from start to finish. Everything was explained clearly, and I left with a plan I could actually understand.",
  },
  {
    name: "Karim H.",
    service: "Comprehensive eye exam",
    procedure: "Vision assessment",
    rating: 5,
    text: "Very professional clinic. The examination was organized, detailed, and efficient without ever feeling rushed.",
  },
  {
    name: "Rana A.",
    service: "Follow-up care",
    procedure: "Post-treatment review",
    rating: 5,
    text: "The follow-up was thoughtful and precise. I felt supported at every step and confident about the next stage.",
  },
  {
    name: "Omar S.",
    service: "Specialist review",
    procedure: "Treatment planning",
    rating: 5,
    text: "A clean and reassuring experience with a strong focus on clarity, patient comfort, and the medical details that matter.",
  },
  {
    name: "Lea N.",
    service: "Routine checkup",
    procedure: "Preventive care",
    rating: 5,
    text: "The whole experience was smooth and reassuring. I appreciated the careful explanation and the gentle pace of the appointment.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={14}
          fill={index < rating ? "currentColor" : "none"}
          className={index < rating ? "text-amber-400" : "text-muted"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(63,132,184,0.1),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.08),_transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-border/60" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            <Sparkles size={14} />
            Patient testimonials
          </span>

          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.05em] text-foreground sm:text-4xl lg:text-5xl">
            Trusted feedback from patients who value clarity, comfort, and care.
          </h2>

          <p className="mt-4 text-sm leading-7 text-foreground/70 sm:text-base">
            A polished Swiper-based carousel that keeps the section professional,
            easy to scan, and aligned with the rest of the homepage.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.5rem] border border-border/70 bg-background/80 p-5 shadow-[0_16px_45px_-32px_rgba(15,23,42,0.35)] backdrop-blur"
            >
              <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground/68">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-border/70 bg-background/75 shadow-[0_20px_70px_-44px_rgba(15,23,42,0.4)] backdrop-blur">
          <div className="flex items-center justify-between gap-4 border-b border-border/70 px-5 py-4 sm:px-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Feedback rail
              </p>
              <p className="mt-1 text-sm text-foreground/60">
                Swipe or drag to browse patient notes
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <ArrowRight size={14} />
              Scroll horizontally
            </div>
          </div>

          <div className="px-4 py-5 sm:px-6 sm:py-6">
            <Swiper
              modules={[Autoplay, Mousewheel]}
              autoplay={{
                delay: 2200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 0.7,
              }}
              grabCursor
              spaceBetween={16}
              slidesPerView={1.05}
              slidesPerGroup={1}
              loop
              breakpoints={{
                640: {
                  slidesPerView: 1.35,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2.1,
                  spaceBetween: 18,
                },
                1024: {
                  slidesPerView: 2.8,
                  spaceBetween: 18,
                },
                1280: {
                  slidesPerView: 3.1,
                  spaceBetween: 18,
                },
              }}
              className="testimonials-swiper"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.name} className="h-auto">
                  <article className="flex h-full min-h-[420px] flex-col rounded-[1.75rem] border border-border/70 bg-surface/90 p-6 text-foreground shadow-[0_14px_40px_-30px_rgba(15,23,42,0.3)] transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_55px_-32px_rgba(63,132,184,0.2)]">
                    <div className="flex items-start justify-between gap-4">
                      <Stars rating={item.rating} />
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-primary/10 text-primary backdrop-blur">
                        <Quote size={20} />
                      </div>
                    </div>

                    <p className="mt-5 flex-1 text-[1.02rem] leading-8 text-foreground/72">
                      {item.text}
                    </p>

                    <div className="mt-6 rounded-[1.25rem] border border-border/70 bg-surface-strong/70 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold tracking-[-0.03em] text-foreground">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-xs font-medium uppercase tracking-[0.22em] text-foreground/50">
                            {item.service}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Visit focus
                          </p>
                          <p className="mt-1 text-sm text-foreground/68">
                            {item.procedure}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
