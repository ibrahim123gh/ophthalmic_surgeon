"use client";
import { LuCalendarDays, LuFileText } from "react-icons/lu";
import { useGetPublicationsQuery } from "@/lib/redux/api";
import { useClinicSettings } from "@/lib/redux/useClinicSettings";

type PublicationGroup = {
  year: string;
  items: Array<{
    _id: string;
    year: string;
    date: string;
    title: string;
    journal: string;
    meta?: string;
    doi?: string;
  }>;
};

export default function ResearchPage() {
  const { data: publications = [], isLoading, isError } = useGetPublicationsQuery();
  const { clinicSettings } = useClinicSettings();
  const sectionCopy = clinicSettings?.research ?? null;

  const sectionTitle =
    sectionCopy?.title?.trim() || "Publications and academic work.";

  const sectionDescription =
    sectionCopy?.description?.trim() ||
    "A direct list of the research data we have, organized by year and kept intentionally minimal for easy reading.";

  const archiveGroups: PublicationGroup[] = Object.entries(
    publications.reduce<Record<string, typeof publications>>((acc, publication) => {
      if (!acc[publication.year]) {
        acc[publication.year] = [];
      }

      acc[publication.year].push(publication);
      return acc;
    }, {}),
  )
    .sort(([leftYear], [rightYear]) => Number(rightYear) - Number(leftYear))
    .map(([year, items]) => ({ year, items }));

  return (
    <main className="overflow-hidden bg-background">
      <section className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(63,132,184,0.12),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.08),_transparent_32%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-border/60" />

        <div className="relative mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              <LuFileText size={14} />
              Research publications
            </p>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.06em] text-foreground sm:text-5xl lg:text-6xl">
              {sectionTitle}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-foreground/70 sm:text-base sm:leading-8">
              {sectionDescription}
            </p>
          </div>

          <div className="mt-14 space-y-8">
            {isLoading ? (
              <section className="rounded-[2.25rem] border border-border/70 bg-background/85 px-5 py-8 text-sm text-foreground/60 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.2)] backdrop-blur sm:px-6">
                Loading research publications...
              </section>
            ) : null}

            {isError ? (
              <section className="rounded-[2.25rem] border border-rose-200 bg-rose-50 px-5 py-8 text-sm text-rose-700 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.2)] sm:px-6">
                Failed to load research publications.
              </section>
            ) : null}

            {!isLoading && !isError && archiveGroups.length === 0 ? (
              <section className="rounded-[2.25rem] border border-border/70 bg-background/85 px-5 py-8 text-sm text-foreground/60 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.2)] backdrop-blur sm:px-6">
                No research publications found.
              </section>
            ) : null}

          {archiveGroups.map((group) => (
            <section
              key={group.year}
                className="overflow-hidden rounded-[2.25rem] border border-border/70 bg-background/85 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.2)] backdrop-blur"
              >
                <div className="flex items-center justify-between gap-4 border-b border-border/70 px-5 py-4 sm:px-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/70">
                      Year
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                      {group.year}
                    </h2>
                  </div>

                  <span className="rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/55">
                    {group.items.length} papers
                  </span>
                </div>

                <div className="divide-y divide-border/60">
                  {group.items.map((publication) => (
                    <article
                      key={publication._id}
                      className="grid gap-4 px-5 py-5 md:grid-cols-[110px_1fr_auto] md:items-start sm:px-6"
                    >
                      <div>
                        <p className="text-2xl font-semibold tracking-[-0.05em] text-primary">
                          {publication.year}
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-foreground/50">
                          <LuCalendarDays size={14} />
                          {publication.date}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-semibold leading-7 tracking-[-0.03em] text-foreground">
                          {publication.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium text-primary">
                          {publication.journal}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {publication.meta && (
                            <span className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-foreground/60">
                              {publication.meta}
                            </span>
                          )}

                          {publication.doi && (
                            <span className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs text-primary">
                              DOI: {publication.doi}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary md:justify-self-end">
                        <LuFileText size={17} />
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
