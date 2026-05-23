"use client";

import { useEffect, useRef, useState } from "react";

import {
  LuArrowRight,
  LuActivity,
  LuEye,
  LuGlobe,
  LuLayers,
  LuScanEye,
  LuShieldCheck,
  LuSparkles,
  LuStar,
  LuZap,
} from "react-icons/lu";
import { FiX } from "react-icons/fi";
import { useClinicSettings } from "@/lib/redux/useClinicSettings";

type ServiceRecord = {
  _id: string;
  title: string;
  description: string;
  details?: string;
  category?: string;
  icon: string;
  order?: number;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.drbachirabiad.com/api/v1";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  LuActivity,
  LuEye,
  LuGlobe,
  LuLayers,
  LuScanEye,
  LuShieldCheck,
  LuSparkles,
  LuStar,
  LuZap,
  activity: LuActivity,
  eye: LuEye,
  globe: LuGlobe,
  shield: LuShieldCheck,
  star: LuStar,
  layers: LuLayers,
  zap: LuZap,
};

function resolveIcon(name: string) {
  return iconMap[name] ?? iconMap[`Lu${name.charAt(0).toUpperCase()}${name.slice(1)}`] ?? LuActivity;
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeService, setActiveService] = useState<ServiceRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { clinicSettings } = useClinicSettings();
  const sectionCopy = clinicSettings?.ourServices ?? null;

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
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    const loadServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services`, {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as ServiceRecord[];

        if (!ignore) {
          setServices(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!ignore) {
          setServices([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void loadServices();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsModalOpen(Boolean(activeService));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeService]);

  useEffect(() => {
    if (isModalOpen || !activeService) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveService(null);
    }, 260);

    return () => window.clearTimeout(timeout);
  }, [activeService, isModalOpen]);

  const openService = (service: ServiceRecord) => {
    setActiveService(service);
  };

  const closeService = () => {
    setIsModalOpen(false);
  };

  const sortedServices = [...services].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const visibleServices = sortedServices.length > 0 ? sortedServices : [];
  const sectionTitle =
    sectionCopy?.title?.trim() || "Advanced ophthalmology services focused on precision eye surgery.";
  const sectionDescription =
    sectionCopy?.description?.trim() ||
    "Explore specialized surgical care in cataract, cornea, anterior segment reconstruction, and refractive vision correction.";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(63,132,184,0.12),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.08),_transparent_35%)]" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-primary sm:text-[11px]">
            <LuSparkles size={14} />
            Our Services
          </span>

          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
            {sectionTitle}
          </h2>

          <p className="mt-4 text-sm leading-7 text-foreground/70 sm:text-base">
            {sectionDescription}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <article
                  key={`service-skeleton-${index}`}
                  className="rounded-[1.5rem] border border-border/70 bg-background/80 p-5 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)] backdrop-blur"
                >
                  <div className="flex items-start gap-4">
                    <div className="size-12 shrink-0 rounded-2xl bg-foreground/10 animate-pulse" />
                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="h-5 w-3/4 rounded-full bg-foreground/10 animate-pulse" />
                      <div className="h-4 w-full rounded-full bg-foreground/10 animate-pulse" />
                      <div className="h-4 w-[86%] rounded-full bg-foreground/10 animate-pulse" />
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
                    <div className="h-3 w-24 rounded-full bg-foreground/10 animate-pulse" />
                    <div className="size-4 rounded-full bg-foreground/10 animate-pulse" />
                  </div>
                </article>
              ))
            : visibleServices.map((service, index) => {
                const Icon = resolveIcon(service.icon);

                return (
                  <button
                    key={service._id}
                    type="button"
                    onClick={() => openService(service)}
                    className={`group rounded-[1.5rem] border border-border/70 bg-background/80 p-5 text-left shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)] backdrop-blur will-change-transform transition-[transform,border-color,box-shadow] duration-150 ease-out motion-reduce:transform-none motion-reduce:transition-none motion-safe:hover:-translate-y-1 motion-safe:hover:border-primary motion-safe:hover:bg-primary motion-safe:hover:text-primary-foreground motion-safe:hover:shadow-[0_18px_35px_-24px_rgba(63,132,184,0.28)] ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${index * 90}ms` : "0ms",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition-transform duration-150 motion-safe:group-hover:scale-105 motion-safe:group-hover:bg-white motion-safe:group-hover:text-primary">
                        <Icon size={20} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground group-hover:text-white">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-foreground/68 group-hover:text-white/80">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45 group-hover:text-primary-foreground/80">
                        Tap for details
                      </span>
                      <LuArrowRight
                        size={16}
                        className="text-primary transition duration-300 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:text-white"
                      />
                    </div>
                  </button>
                );
              })}
        </div>
      </div>

      {activeService ? (
        <div
          className={`fixed inset-0 z-50 flex items-end justify-center bg-slate-950/55 p-4 backdrop-blur-sm transition-opacity duration-300 ease-out sm:items-center sm:p-6 ${
            isModalOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeService}
        >
          <div
            className={`relative w-full max-w-[980px] max-h-[min(80vh,760px)] overflow-y-auto rounded-[2rem] border border-border/70 bg-background px-4 pb-6 pt-5 shadow-[0_24px_60px_rgba(15,23,42,0.28)] transition-all duration-300 ease-out sm:px-6 sm:pb-8 sm:pt-6 ${
              isModalOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={activeService.title}
          >
            <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-foreground/10" />

            <div className="flex items-start gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                {(() => {
                  const Icon = resolveIcon(activeService.icon);
                  return <Icon size={20} />;
                })()}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/75">
                  {activeService.category || "Specialized care"}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
                  {activeService.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground/70 sm:text-base">
                  {activeService.details || activeService.description}
                </p>
              </div>

              <button
                type="button"
                onClick={closeService}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-border/70 text-foreground/70 transition hover:bg-foreground/5 hover:text-foreground"
                aria-label="Close details"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
