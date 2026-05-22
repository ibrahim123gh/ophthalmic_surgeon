"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LuCalendarDays, LuMapPin, LuSparkles } from "react-icons/lu";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api/v1";

type ClinicScheduleItem = {
  title: string;
  description: string;
  workDays: string;
};

type ClinicScheduleEntry = {
  _id: string;
  title: string;
  data?: ClinicScheduleItem[];
};

type CityGroup = {
  city: string;
  locations: ClinicScheduleItem[];
  accent: string;
};

type SettingsRecord = {
  ClinicSchedule?: {
    title?: string;
    description?: string;
  };
};

const groupAccents = [
  "from-primary via-sky-300 to-cyan-200",
  "from-sky-400 via-primary to-cyan-200",
  "from-cyan-400 via-sky-300 to-primary",
];

export default function AvailabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scheduleEntries, setScheduleEntries] = useState<ClinicScheduleEntry[]>([]);
  const [sectionCopy, setSectionCopy] = useState<SettingsRecord["ClinicSchedule"] | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadClinicSchedule = async () => {
      try {
        const [scheduleResponse, settingsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/clinic-schedule`, { cache: "no-store" }),
          fetch(`${API_BASE_URL}/settings`, { cache: "no-store" }),
        ]);

        if (scheduleResponse.ok) {
          const data = (await scheduleResponse.json()) as ClinicScheduleEntry[];
          if (!ignore) {
            setScheduleEntries(Array.isArray(data) ? data : []);
          }
        }

        if (settingsResponse.ok) {
          const settings = (await settingsResponse.json()) as SettingsRecord[];
          if (!ignore && Array.isArray(settings) && settings.length > 0) {
            setSectionCopy(settings[0].ClinicSchedule ?? null);
          }
        }
      } catch {
        if (!ignore) {
          setScheduleEntries([]);
          setSectionCopy(null);
        }
      }
    };

    void loadClinicSchedule();

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
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const cityGroups = useMemo<CityGroup[]>(() => {
    return scheduleEntries.map((entry, index) => ({
      city: entry.title?.trim() || `Clinic schedule ${index + 1}`,
      locations: (entry.data ?? [])
        .map((item) => ({
          title: item.title?.trim() ?? "",
          description: item.description?.trim() ?? "",
          workDays: item.workDays?.trim() ?? "",
        }))
        .filter(
          (item) =>
            item.title.length > 0 ||
            item.description.length > 0 ||
            item.workDays.length > 0,
        ),
      accent: groupAccents[index % groupAccents.length],
    }));
  }, [scheduleEntries]);

  const centersCount = cityGroups.reduce(
    (count, group) => count + group.locations.length,
    0,
  );
  const citiesCount = cityGroups.length;

  return (
    <section
      id="availability"
      ref={sectionRef}
      className="relative overflow-hidden py-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(63,132,184,0.12),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.08),_transparent_35%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-border/60" />
      <div className="absolute -left-20 top-24 h-44 w-44 rounded-full bg-primary/10 blur-3xl sm:h-56 sm:w-56" />
      <div className="absolute -right-20 bottom-10 h-52 w-52 rounded-full bg-sky-300/10 blur-3xl sm:h-64 sm:w-64" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            <LuSparkles size={14} />
            Clinic schedule
          </span>

          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.05em] text-foreground sm:text-4xl lg:text-5xl">
            {sectionCopy?.title?.trim() || "A cleaner view of when and where appointments are available."}
          </h2>

          <p className="mt-4 text-sm leading-7 text-foreground/70 sm:text-base">
            {sectionCopy?.description?.trim() || "Availability is organized by city so patients can scan the week faster without repeating the same visual pattern."}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
              {centersCount} centers
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
              {citiesCount} cities
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 md:justify-items-stretch xl:grid-cols-2 xl:max-w-7xl xl:mx-auto">
          {cityGroups.length > 0 ? (
            cityGroups.map((group, groupIndex) => (
              <article
                key={group.city}
                className={`group relative overflow-hidden rounded-[2rem] border border-border/70 bg-background/85 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.3)] backdrop-blur transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_26px_80px_-46px_rgba(63,132,184,0.2)] md:last:col-span-2 md:last:mx-auto md:last:max-w-[calc(50%-0.625rem)] xl:last:col-span-2 xl:last:mx-auto xl:last:max-w-[calc(50%-0.625rem)] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${groupIndex * 120}ms` : "0ms",
                }}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${group.accent}`}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(63,132,184,0.08),_transparent_36%)]" />

                <div className="relative p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/70">
                        City atlas
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
                        {group.city}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-foreground/60">
                        {group.locations.length} center
                        {group.locations.length > 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <LuMapPin size={18} />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {group.locations.map((location, locationIndex) => (
                      <div
                        key={`${location.title}-${location.description}-${location.workDays}-${locationIndex}`}
                        className={`grid gap-4 rounded-[1.25rem] border border-border/70 bg-surface/60 p-4 transition-all duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none md:grid-cols-[1fr_auto] md:items-center ${
                          isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                        style={{
                          transitionDelay: isVisible
                            ? `${(groupIndex * 3 + locationIndex) * 90}ms`
                            : "0ms",
                        }}
                      >
                        <div className="min-w-0 flex items-start gap-3">
                          <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                            <LuCalendarDays size={16} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-base font-semibold tracking-[-0.03em] text-foreground sm:text-lg">
                              {location.title}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-foreground/60">
                              {location.description}
                            </p>
                          </div>
                        </div>

                        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary md:justify-self-end">
                          <LuCalendarDays size={15} />
                          {location.workDays}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full rounded-[2rem] border border-border/70 bg-background/85 p-8 text-center text-sm text-foreground/60 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.3)] backdrop-blur">
              No clinic schedules available yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
