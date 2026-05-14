"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";

const socialLinks = [
  { label: "Instagram", href: "#", icon: FaInstagram },
  { label: "Facebook", href: "#", icon: FaFacebookF },
  { label: "YouTube", href: "#", icon: FaYoutube },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Availability", href: "/availability" },
  { label: "Videos", href: "/videos" },
  { label: "Research", href: "/re-searsh" },
];

const contactLinks = [
  {
    label: "WhatsApp / SMS",
    value: "+961 81 778 142",
    href: "https://wa.me/96181778142",
    icon: Phone,
  },
  {
    label: "Email",
    value: "info@drbachirabiad.com",
    href: "mailto:info@drbachirabiad.com",
    icon: Mail,
  },
  {
    label: "Main Location",
    value: "CMC Beirut, Lebanon",
    href: "/availability",
    icon: MapPin,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(63,132,184,0.08),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.06),_transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-border/60" />

      <div className="relative mx-auto max-w-[1600px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.9fr] lg:gap-16">
          <section className="max-w-xl">
            <Link
              href="/"
              className="relative block h-[68px] w-[176px] sm:h-[72px] sm:w-[190px]"
            >
              <Image
                src="/logoLight.png"
                alt="Dr. Bachir Abiad"
                fill
                className="theme-logo-light object-contain object-left"
                priority
              />
              <Image
                src="/logoDark2.png"
                alt=""
                fill
                aria-hidden="true"
                className="theme-logo-dark object-contain object-left"
                priority
              />
            </Link>

            <p className="mt-5 max-w-lg text-sm leading-7 text-foreground/68 sm:text-base">
              Specialized ophthalmology care led by Dr. Bachir Abiad, focusing
              on cornea, cataract, anterior segment reconstruction, and
              refractive surgery across Lebanon and the Gulf region.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-surface/80 text-foreground/72 transition hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon size={16} />
                  </Link>
                );
              })}
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Quick links
            </p>

            <nav className="mt-6 grid gap-4">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center py-0.5 text-sm font-semibold tracking-wide text-foreground/78 transition hover:translate-x-0.5 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Contact
            </p>

            <div className="mt-6 grid gap-4">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="inline-flex items-center gap-3 text-sm text-foreground/78 transition hover:text-primary"
                  >
                    <div className="min-w-0 flex flex-col gap-2 bg-background/40 p-3 transition hover:border-primary/20 hover:bg-primary/5">
                      <p className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/45">
                        {item.label}
                      </p>
                      <div className="flex items-center gap-2">
                        <Icon
                          size={16}
                          className="mt-1 shrink-0 text-foreground/58"
                        />
                        <p className="mt-1 text-sm font-medium text-foreground">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/70 pt-6 text-sm text-foreground/58 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Dr. Bachir Abiad. All rights
            reserved.
          </p>
          <p className="max-w-2xl">
            Advanced eye surgery, precise diagnosis, and patient-centered care
            across leading medical centers.
          </p>
        </div>
      </div>
    </footer>
  );
}
