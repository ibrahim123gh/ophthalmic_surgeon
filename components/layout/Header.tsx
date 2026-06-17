"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";
import gsap from "gsap";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../theme/ThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "LASIK", href: "/lasik-beirut" },
  { label: "CATARACT", href: "/cataract-surgery-beirut" },
  { label: "SURGERIES", href: "/surgeries" },
  { label: "CORNEAL TRANSPLANT", href: "/corneal-transplant-lebanon" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);

    return () => window.clearTimeout(timer);
  }, []);

  const logoSrc =
    mounted && theme === "dark" ? "/logoDark2.png" : "/logoLight.png";

  const isActiveLink = (href: string) => pathname === href;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("[data-header-reveal]", {
        opacity: 0,
        y: -10,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.12,
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`${poppins.className} sticky top-0 z-50 w-full border-b border-border bg-background/90 py-2 backdrop-blur-xl`}
      >
        <div className="mx-auto flex min-h-16 w-full max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="relative flex h-[50px] w-[150px] items-center gap-2"
            data-header-reveal
          >
            <Image
              src={logoSrc}
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-5 xl:flex 2xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                data-header-reveal
                className={`relative whitespace-nowrap text-[13px] font-semibold tracking-[0.14em] transition-colors after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-primary after:transition-all hover:after:w-full ${
                  isActiveLink(link.href)
                    ? "text-primary after:w-full"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex" data-header-reveal>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 xl:hidden" data-header-reveal>
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary sm:size-11"
              aria-label="Open menu"
            >
              <HiMenuAlt3 size={22} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-[60] h-full w-[82%] max-w-sm transform border-l border-border bg-background p-5 shadow-2xl transition-transform duration-300 xl:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6  flex items-center justify-between">
          <div className="relative h-[60px] w-[100px]">
            <Image src={logoSrc} alt="Logo" fill className="object-contain" />
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-10 place-items-center rounded-full bg-muted text-foreground"
            aria-label="Close menu"
          >
            <HiX size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3 text-sm font-semibold tracking-wide transition ${
                isActiveLink(link.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-muted hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
