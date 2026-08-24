const RESPONSIBILITIES =
  "First dedicated engineer on a multi-tenant climate and natural-hazard risk platform, taking it from an analyst-built prototype to a production system serving 50+ clients across NZ and overseas. Own the core analysis pipeline, the PostgreSQL/PostGIS data models, and the AWS infrastructure behind it, plus the team's testing, code-quality, and engineering standards.";

const FEATURES = [
  "Rewrote and parallelised the core analysis pipeline, cutting the main run from several weeks to under 8 hours.",
  "Designed the PostgreSQL/PostGIS models behind the platform's spatial data, orchestrating 100GB–1TB+ of geospatial data per cycle.",
  "Introduced the team's testing and code-quality tooling, and wrote the code-review and coding standards the engineering org now works to.",
  "Co-designed the AWS infrastructure (Aurora, S3, EC2, Lambda) behind 1.5TB+ of spatial data, cutting cloud costs by 70%.",
];

export function Experience() {
  return (
    <section id="experience" className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-24 sm:py-32">
      <h2 className="text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
        Experience.
      </h2>
      <div className="flex flex-col gap-6 rounded-[2rem] bg-neutral-50 p-8 sm:p-10">
        <div className="flex items-center gap-3">
          <img
            src="/urban_intelligence_logo.webp"
            alt="Urban Intelligence logo"
            loading="lazy"
            className="h-11 w-auto max-w-[200px] object-contain object-left"
          />
          <div className="space-y-1">
            <h3 className="text-xl font-medium text-neutral-900">
              Software Engineer, Urban Intelligence
            </h3>
            <p className="text-sm text-neutral-500">Nov 2021 &ndash; Present | Full-time | Startup</p>
          </div>
        </div>
        <p className="text-base text-neutral-700 sm:text-lg">{RESPONSIBILITIES}</p>
        <ul className="space-y-3 text-left">
          {FEATURES.map((point) => (
            <li key={point} className="flex gap-3 text-base text-neutral-700 sm:text-lg">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-neutral-400" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
