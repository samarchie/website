import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEGREES = [
  {
    title: "Master of Engineering (Civil), University of Canterbury",
    period: "Jul 2021 – Dec 2022",
    points: [
      "Thesis: Guiding sustainable long-term future growth of New Zealand cities using multi-objective spatial optimisation.",
      "Developed and benchmarked computational optimisation algorithms (weighted sum and NSGA-II genetic algorithm) for large-scale geospatial decision-making.",
    ],
    thesisUrl: "http://dx.doi.org/10.26021/14341",
  },
  {
    title: "Bachelor of Engineering (Civil; First Class Honours), University of Canterbury",
    period: "Feb 2017 – Nov 2020",
    points: [
      "GPA 7.9/9.",
      "Honours research project applying data-driven computational methods to urban planning through a systems engineering approach.",
    ],
  },
];

export function Education() {
  return (
    <section id="education" className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-24 sm:py-32">
      <h2 className="text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
        Education.
      </h2>
      {DEGREES.map((degree) => (
        <div key={degree.title} className="flex flex-col gap-6 rounded-[2rem] bg-neutral-50 p-8 sm:p-10">
          <div className="flex items-center gap-3">
            <img
              src="/university_of_canterbury_logo.webp"
              alt=""
              className="h-11 w-auto max-w-[200px] object-contain object-left"
            />
            <div className="space-y-1">
              <h3 className="text-xl font-medium text-neutral-900">{degree.title}</h3>
              <p className="text-sm text-neutral-500">{degree.period}</p>
            </div>
          </div>
          <ul className="space-y-3 text-left">
            {degree.points.map((point) => (
              <li key={point} className="flex gap-3 text-base text-neutral-700 sm:text-lg">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-neutral-400" />
                {point}
              </li>
            ))}
          </ul>
          {degree.thesisUrl && (
            <div className="flex items-center gap-3">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-auto border-[#214d65]/30 px-6 py-3 text-primary hover:border-[#214d65]/60 hover:bg-background hover:text-primary"
              >
                <a href={degree.thesisUrl} target="_blank" rel="noopener noreferrer">
                  Read thesis
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
