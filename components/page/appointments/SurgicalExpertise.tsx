"use client";

import { useEffect, useRef, useState } from "react";

import { LuEye, LuScanEye, LuShieldCheck, LuSparkles } from "react-icons/lu";
import { useClinicSettings } from "@/lib/redux/useClinicSettings";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.drbachirabiad.com/api/v1";

type SurgicalExpertiseItem = {
  title: string;
};

type SurgicalExpertiseEntry = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  orderNumber?: number;
  data?: SurgicalExpertiseItem[];
};

type SurgicalExpertiseGroup = {
  title: string;
  summary: string;
  icon: "eye" | "scan-eye" | "shield-check";
  accent: string;
  items: string[];
};

const fallbackGroups: SurgicalExpertiseGroup[] = [
  {
    title: "Corneal Transplantation",
    summary:
      "Full-thickness and lamellar corneal procedures for advanced corneal disease.",
    icon: "scan-eye",
    accent: "from-sky-400 via-primary to-cyan-200",
    items: ["PKP", "DALK", "DSAEK", "Ultra-thin DSAEK", "Nano-thin DSAEK", "DMEK"],
  },
  {
    title: "Cataract & Reconstruction",
    summary:
      "Complex cataract surgery with anterior segment reconstruction and lens support.",
    icon: "shield-check",
    accent: "from-primary via-sky-300 to-cyan-200",
    items: [
      "Complex cataract surgery",
      "Anterior segment reconstruction",
      "Secondary intraocular lenses",
    ],
  },
  {
    title: "Refractive Surgery",
    summary:
      "Vision correction options selected to match the cornea and the visual goal.",
    icon: "eye",
    accent: "from-cyan-400 via-sky-300 to-primary",
    items: ["PRK", "Femto-LASIK", "SMILE", "CLEAR", "Cross-linking", "ICL", "Intra-stromal rings"],
  },
];

const iconMap = {
  eye: LuEye,
  "scan-eye": LuScanEye,
  "shield-check": LuShieldCheck,
} as const;

const accentMap = [
  "from-sky-400 via-primary to-cyan-200",
  "from-primary via-sky-300 to-cyan-200",
  "from-cyan-400 via-sky-300 to-primary",
];

const normalizeIcon = (icon: string): SurgicalExpertiseGroup["icon"] => {
  if (icon in iconMap) {
    return icon as SurgicalExpertiseGroup["icon"];
  }

  return "eye";
};

export default function SurgicalExpertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [groups, setGroups] = useState<SurgicalExpertiseGroup[]>(fallbackGroups);
  const { clinicSettings } = useClinicSettings();
  const sectionCopy = clinicSettings?.SurgicalExpertise ?? null;

  useEffect(() => {
    let ignore = false;

    const loadSurgicalExpertise = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/surgical-expertise`, { cache: "no-store" });

        if (response.ok) {
          const data = (await response.json()) as SurgicalExpertiseEntry[];

          if (!ignore && Array.isArray(data) && data.length > 0) {
            setGroups(
              data
                .slice()
                .sort((left, right) => (left.orderNumber ?? 0) - (right.orderNumber ?? 0))
                .map((item, index) => ({
                  title: item.title,
                  summary: item.description,
                  icon: normalizeIcon(item.icon),
                  accent: accentMap[index % accentMap.length],
                  items: (item.data ?? [])
                    .map((row) => row.title?.trim())
                    .filter((value): value is string => Boolean(value)),
                })),
            );
          }
        }
      } catch {
        if (!ignore) {
          setGroups(fallbackGroups);
        }
      }
    };

    void loadSurgicalExpertise();

    return () => {
      ignore = true;
    };
  }, []);

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
        threshold: 0.16,
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
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(63,132,184,0.12),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.08),_transparent_32%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-border/60" />
      <div className="absolute -left-20 top-16 h-44 w-44 rounded-full bg-primary/10 blur-3xl sm:h-56 sm:w-56" />
      <div className="absolute -right-20 bottom-10 h-52 w-52 rounded-full bg-sky-300/10 blur-3xl sm:h-64 sm:w-64" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            <LuSparkles size={14} />
            Surgical expertise
          </span>

          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.05em] text-foreground sm:text-4xl lg:text-5xl">
            {sectionCopy?.title?.trim() || "Specialized procedures in cornea, cataract, and refractive surgery."}
          </h2>

          <p className="mt-4 text-base leading-7 text-foreground/72 sm:text-lg">
            {sectionCopy?.description?.trim() || "A clean overview of the surgical domains, organized to stay readable and professional at every screen size."}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {groups.map((group, index) => {
            const Icon = iconMap[group.icon];

            return (
              <article
                key={`${group.title}-${index}`}
                className={`group relative overflow-hidden rounded-[2rem] border border-border/70 bg-background/85 shadow-[0_18px_60px_-38px_rgba(15,23,42,0.24)] backdrop-blur transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_24px_70px_-42px_rgba(63,132,184,0.18)] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 120}ms` : "0ms",
                }}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${group.accent}`}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(63,132,184,0.06),_transparent_38%)]" />

                <div className="relative p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>

                    <span className="rounded-full border border-border bg-background/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-foreground/55">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-[1.75rem]">
                    {group.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-foreground/68">
                    {group.summary}
                  </p>

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 rounded-full border border-border/70 bg-surface/60 px-3 py-2 text-sm text-foreground/75"
                      >
                        <span className="mt-1 size-2 rounded-full bg-primary/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
