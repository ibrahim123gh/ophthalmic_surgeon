"use client";

import { LuMoonStar, LuSunMedium } from "react-icons/lu";
import { useTheme } from "../theme/ThemeProvider";

export default function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color mode"
      className="group inline-flex h-10 cursor-pointer w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:border-primary hover:text-primary hover:shadow-[0_10px_24px_-16px_rgba(63,132,184,0.8)] active:scale-95"
    >
      <LuMoonStar className="theme-icon-light transition-transform duration-300 group-hover:scale-110" size={18} />
      <LuSunMedium className="theme-icon-dark transition-transform duration-300 group-hover:scale-110" size={18} />
    </button>
  );
}
