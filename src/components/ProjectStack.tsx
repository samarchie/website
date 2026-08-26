"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

import projectsData from "@/data/projects.json";

const images: Record<string, string> = {
  rexLogo: "/resilience_explorer_logo.webp",
  resilienceExplorer: "/resilience_explorer.webp",
  accessExplorerLogo: "/access_explorer_logo.webp",
  accessExplorer: "/access_explorer.webp",
  ucLogo: "/university_of_canterbury_logo.webp",
  covy: "/covy.webp",
  covyLogo: "covy_logo.webp",
  haere: "/haere.webp",
  favicon: "/favicon.webp",
  lonboard: "/climate.webp",
  lonboardLogo: "/lonboard_logo.webp",
  optimalSpatialPlans: "/optimal_spatial_plans.webp",
};

export type ProjectButton = {
  style: "cta" | "secondary";
  text: string;
  url: string;
};

export type Project = {
  eyebrow: string;
  title: string;
  description?: string;
  logo?: string;
  color: string;
  buttons?: ProjectButton[];
  visual?: { src: string; alt: string; fit?: "cover" | "contain" };
};

function lookupImage(key: string): string {
  const src = images[key];
  if (!src) console.error(`Unknown image key "${key}" in projects.json`);
  return src ?? "";
}

export const projects: Project[] = (projectsData as Array<Omit<Project, "logo" | "visual"> & {
  logo?: string;
  visual?: { src: string; alt: string; fit?: "cover" | "contain" };
}>).map((project) => ({
  ...project,
  logo: project.logo ? lookupImage(project.logo) : undefined,
  visual: project.visual ? { ...project.visual, src: lookupImage(project.visual.src) } : undefined,
}));

function ProjectCardContent({ project }: { project: Project }) {
  return (
    <div className="relative z-10 flex min-h-0 flex-1 flex-col items-start gap-8 text-left">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {project.logo && (
            <img
              src={project.logo}
              alt=""
              loading="lazy"
              className="h-9 w-auto max-w-[200px] object-contain object-left"
            />
          )}
          <h3 className="text-3xl font-medium leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl">
            {project.title}
          </h3>
        </div>
        <span className="inline-block rounded-full bg-black/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-600">
          {project.eyebrow}
        </span>
        {project.description && (
          <p className="text-lg text-neutral-600">{project.description}</p>
        )}
      </div>
      {project.buttons && project.buttons.length > 0 && (
        <div className="flex items-center gap-3">
          {project.buttons.map((button) => (
            <Button
              key={button.text}
              asChild
              size="lg"
              variant={button.style === "cta" ? "default" : "outline"}
              className={
                button.style === "cta"
                  ? "h-auto px-6 py-3"
                  : "h-auto border-[#214d65]/30 bg-transparent px-6 py-3 text-primary hover:border-[#214d65]/60 hover:bg-black/5 hover:text-primary"
              }
            >
              <a href={button.url} target="_blank" rel="noopener noreferrer">
                {button.text}
                <ArrowUpRight />
              </a>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectVisual({ project, className }: { project: Project; className: string }) {
  return (
    <div className={className}>
      {project.visual ? (
        <img
          src={project.visual.src}
          alt={project.visual.alt}
          loading="lazy"
          className={`h-full max-h-full w-full ${
            project.visual.fit === "cover" ? "object-cover" : "object-contain"
          }`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-black/5">
          <img src={project.logo} alt="" loading="lazy" className="h-20 w-auto opacity-40" />
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  i,
  project,
  progress,
  range,
  targetScale,
}: {
  i: number;
  project: Project;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-[100vh] items-start justify-center px-4 pt-30 [@media(max-height:500px)]:pt-14">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 20}px)`,
          width: "min(clamp(90rem, 75vw, 125rem), calc(100vw - 2rem))",
        }}
        className="relative flex h-auto min-h-[380px] shrink-0 origin-top flex-col gap-10 overflow-hidden rounded-[3.5rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25),0_10px_20px_-8px_rgba(0,0,0,0.15)] min-[1000px]:flex-row min-[1000px]:items-center min-[1000px]:gap-16 min-[1000px]:p-16"
      >
        <div
          className="absolute inset-0 rounded-[3.5rem]"
          style={{ backgroundColor: project.color }}
        />
        <ProjectCardContent project={project} />
        <ProjectVisual
          project={project}
          className="relative z-10 hidden min-h-[260px] flex-[1.5] items-center justify-center min-[450px]:flex [@media(max-height:500px)]:!hidden"
        />
      </motion.div>
    </div>
  );
}

function PlainProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="relative flex h-auto flex-col gap-8 overflow-hidden rounded-[2rem] p-8"
      style={{ backgroundColor: project.color }}
    >
      <ProjectCardContent project={project} />
      <ProjectVisual project={project} className="relative z-10 flex min-h-[200px] items-center justify-center" />
    </div>
  );
}

export function ProjectStack() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={container}
      className="relative flex w-full flex-col items-center pb-24 sm:pb-32"
    >
      <h2 className="mx-auto max-w-3xl px-6 pt-24 text-3xl font-medium tracking-tight text-neutral-900 sm:pt-32 sm:text-4xl">
        Projects.
      </h2>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10 min-[450px]:motion-safe:hidden">
        {projects.map((project) => (
          <PlainProjectCard key={project.title} project={project} />
        ))}
      </div>
      <div className="hidden w-full flex-col items-center min-[450px]:motion-safe:flex">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i - 1) * 0.08;
          return (
            <ProjectCard
              key={project.title}
              i={i}
              project={project}
              progress={scrollYProgress}
              range={[i / projects.length, Math.min((i + 1.5) / projects.length, 1)]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
