import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const contactItems = [
  {
    title: "Main Hospital",
    detail: "Clemenceau Medical Center (CMC), Beirut",
    subdetail: "Available Monday till Thursday",
    icon: MapPin,
    iconColor: "text-primary",
  },
  {
    title: "WhatsApp / SMS",
    detail: "+961 81 778 142",
    subdetail: "For appointments, please send an SMS or WhatsApp message",
    icon: MessageCircle,
    iconColor: "text-sky-500",
  },
  {
    title: "Multiple Locations",
    detail: "Beirut, Tripoli & Dubai",
    subdetail: "Consultations across leading medical centers",
    icon: Phone,
    iconColor: "text-emerald-500",
  },
];

const hours = [
  { day: "CMC Beirut", time: "Monday – Thursday" },
  { day: "LAU Rizk / Makassed", time: "Wednesday" },
  { day: "Rosary Sisters Hospital", time: "Thursday" },
  { day: "Abyad Medical Center", time: "Saturday" },
  { day: "CMC Dubai", time: "By appointment" },
];

export default function ClinicInfo() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(63,132,184,0.08),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.06),_transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-border/60" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            <MapPin size={14} />
            Clinic information
          </span>

          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.05em] text-foreground sm:text-4xl lg:text-5xl">
            Book your visit across Lebanon and the Gulf region.
          </h2>

          <p className="mt-4 text-sm leading-7 text-foreground/70 sm:text-base">
            Dr. Bachir Abiad is available across several medical centers in
            Beirut, Tripoli, and Dubai. Appointments can be booked by SMS or
            WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <div className="rounded-[2rem] border border-border/70 bg-background/85 p-4 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.32)] backdrop-blur sm:p-6">
            <div className="rounded-[1.5rem] border border-border/70 bg-surface/80 p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                    Contact details
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    Everything you need to reach us.
                  </h3>
                </div>

                <p className="max-w-sm text-sm leading-6 text-foreground/60">
                  Use the schedule below to choose the most convenient medical center before booking.
                </p>
              </div>

              <div className="mt-6 grid gap-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[1.35rem] border border-border/70 bg-background/80 p-4 transition duration-300 hover:border-primary/30 hover:shadow-[0_14px_35px_-28px_rgba(63,132,184,0.18)]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-surface">
                          <Icon size={22} className={item.iconColor} />
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                            {item.title}
                          </h4>
                          <p className="mt-2 text-base font-medium text-foreground/85">
                            {item.detail}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-foreground/60">
                            {item.subdetail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-4 rounded-[1.35rem] border border-border/70 bg-surface-strong/50 p-4 md:grid-cols-[1fr_auto] md:items-center">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Clock3 size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                      Working hours
                    </p>
                    <p className="mt-1 text-sm leading-6 text-foreground/60">
                      Plan your visit around our clinic schedule.
                    </p>
                  </div>
                </div>

                <div className="grid gap-2 text-sm">
                  {hours.map((item) => (
                    <div
                      key={item.day}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-background/80 px-3 py-2 text-foreground sm:gap-6"
                    >
                      <span className="text-foreground/65">{item.day}</span>
                      <span
                        className={
                          item.time === "Closed"
                            ? "font-semibold text-rose-500"
                            : "font-semibold text-foreground"
                        }
                      >
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="tel:+96181778142"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_-24px_rgba(63,132,184,0.8)] transition hover:-translate-y-0.5 hover:opacity-95"
                >
                  Call now
                  <ArrowUpRight size={16} />
                </Link>

                <Link
                  href="https://wa.me/96181778142"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/80 px-5 py-3 text-sm font-semibold text-foreground/80 transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                >
                  WhatsApp us
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-background/85 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.32)] backdrop-blur">
            <div className="flex items-center justify-between gap-4 border-b border-border/70 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Location map
                </p>
                <p className="mt-1 text-sm text-foreground/60">
                  Find us across Lebanon and Dubai
                </p>
              </div>

              <Link
                href="https://www.google.com/maps"
                className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition hover:-translate-y-0.5"
              >
                Open maps
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="relative min-h-[420px] bg-surface/40 sm:min-h-[540px] lg:min-h-[700px]">
              <div className="absolute left-4 top-4 z-10 rounded-full border border-border/70 bg-background/95 px-3 py-2 text-xs font-semibold text-foreground shadow-[0_14px_28px_-22px_rgba(15,23,42,0.35)] backdrop-blur sm:left-6 sm:top-6">
                <span className="text-primary">Open in Maps</span>
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d101812.71501028587!2d35.85930967678838!3d34.316036604901356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slb!4v1778605300048!5m2!1sen!2slb"
                title="Clinic location map"
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />

              <div className="pointer-events-none absolute inset-x-4 top-16 rounded-[1.25rem] border border-border/70 bg-background/92 px-4 py-3 shadow-[0_16px_35px_-26px_rgba(15,23,42,0.42)] backdrop-blur sm:inset-x-6 sm:top-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      Clinic address
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      Clemenceau Medical Center (CMC), Beirut
                    </p>
                  </div>

                  <p className="text-sm text-foreground/60">
                    Main weekly location
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
