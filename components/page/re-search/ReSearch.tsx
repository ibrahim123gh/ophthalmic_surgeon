import { LuCalendarDays, LuFileText } from "react-icons/lu";

type Publication = {
  year: string;
  date: string;
  title: string;
  journal: string;
  meta?: string;
  doi?: string;
};

const publications: Publication[] = [
  {
    year: "2026",
    date: "Feb 2026",
    title:
      "Validity of a Questionnaire Assessing Preparedness and Self-Reported Confidence of Lebanese Emergency Department Personnel in Managing Ophthalmic Emergencies and Mass Ocular Trauma.",
    journal: "Maedica (Bucur)",
    meta: "2026;21(1):129-136",
    doi: "10.26574/maedica.2026.21.1.129",
  },
  {
    year: "2026",
    date: "Feb 2026",
    title:
      "Surgical management of acute choroidal neovascularization related submacular hemorrhage: Three case reports.",
    journal: "World Journal of Clinical Cases",
    meta: "2026;14(6):118545",
    doi: "10.12998/wjcc.v14.i6.11854",
  },
  {
    year: "2021",
    date: "Jul 2021",
    title:
      "Morphological changes in amblyopic eyes in choriocapillaris and Sattler's layer in comparison to healthy eyes.",
    journal: "PLOS ONE",
    meta: "PONE-D-21-10099",
  },
  {
    year: "2020",
    date: "Aug 2020",
    title:
      "Five-Year Results of Combined Small-Aperture Corneal Inlay Implantation and LASIK for the Treatment of Hyperopic Presbyopic Eyes.",
    journal: "Journal of Refractive Surgery",
    meta: "2020;36(8):498-505",
  },
  {
    year: "2018",
    date: "Mar 2018",
    title:
      "A Comparison of Visual Outcomes of Deep Anterior Lamellar Keratoplasty versus Penetrating Keratoplasty in Patients with Keratoconus.",
    journal: "Journal of Ophthalmic Clinical Research",
    meta: "4:045",
  },
  {
    year: "2018",
    date: "Mar 2018",
    title:
      "Changing Trends in Eye-Related Complaints Presenting to the Emergency Department in Beirut, Lebanon, over 15 Years.",
    journal: "Journal of Ophthalmology",
    meta: "Article ID 4739865",
  },
  {
    year: "2017",
    date: "Aug 2017",
    title:
      "Ocular Rosacea Causing Corneal Melt in an African American Patient and a Hispanic Patient.",
    journal: "Case Reports in Ophthalmological Medicine",
  },
  {
    year: "2017",
    date: "Jul 2017",
    title:
      "Single-step transepithelial versus alcohol-assisted photorefractive keratectomy in the treatment of high myopia.",
    journal: "British Journal of Ophthalmology",
    doi: "10.1136/bjophthalmol-2017-310943",
  },
  {
    year: "2016",
    date: "Apr 2016",
    title:
      "Central Corneal Thickness After Cross-linking Using High-Definition Optical Coherence Tomography, Ultrasound, and Dual Scheimpflug Tomography.",
    journal: "American Journal of Ophthalmology",
    doi: "10.1016/j.ajo.2016.04.004",
  },
  {
    year: "2015",
    date: "May 2015",
    title: "Uveitis in the Aging Eye: Review of Incidence and Patterns.",
    journal: "Journal of Ophthalmology",
  },
  {
    year: "2014",
    date: "Oct 2014",
    title: "Adult Ocular Toxocariasis Mimicking Ciliary Body Malignancy.",
    journal: "Case Reports in Medicine",
    doi: "10.1155/2014/368907",
  },
  {
    year: "2008",
    date: "Oct 2008",
    title: "Pathophysiology of Migraine.",
    journal: "Middle East Journal of Family Medicine",
    meta: "2008, 6, 7, 29-30",
  },
] ;

type ArchiveGroup = {
  year: string;
  items: Publication[];
};

const archiveGroups: ArchiveGroup[] = Object.entries(
  publications.reduce<Record<string, Publication[]>>((acc, publication) => {
    if (!acc[publication.year]) {
      acc[publication.year] = [];
    }

    acc[publication.year].push(publication);
    return acc;
  }, {}),
)
  .sort(([leftYear], [rightYear]) => Number(rightYear) - Number(leftYear))
  .map(([year, items]) => ({ year, items }));

export default function ResearchPage() {
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
              Publications and academic work.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-foreground/70 sm:text-base sm:leading-8">
              A direct list of the research data we have, organized by year and
              kept intentionally minimal for easy reading.
            </p>
          </div>

          <div className="mt-14 space-y-8">
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
                      key={`${publication.year}-${publication.date}-${publication.title}`}
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
  );
}
