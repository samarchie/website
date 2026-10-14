import { Button } from "@/components/ui/button";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";

export function About() {
  const scrollToSection = useScrollToSection();

  return (
    <section id="about" className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 pb-20 pt-28 text-center sm:pt-36">
      <img
        src="/hero.webp"
        alt="Sam Archie"
        fetchPriority="high"
        decoding="async"
        className="h-90 aspect-[5/4] rounded-[3.5rem] object-cover sm:h-160"
      />
      <div className="space-y-4">
        <h1 className="text-4xl font-medium tracking-tight text-neutral-900 sm:text-6xl">
          Kia ora, I'm Sam Archie.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-neutral-500">
          I build software that helps people make decisions about sustainability and risk.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button asChild size="lg" className="h-auto px-6 py-2.5">
          <a href="#projects" onClick={(e) => scrollToSection(e, "#projects")}>
            See my work
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-auto border-neutral-300 px-6 py-2.5 text-primary hover:border-neutral-400 hover:bg-background hover:text-primary"
        >
          <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
            Get in touch
          </a>
        </Button>
      </div>
      <div className="space-y-6 pt-8 text-left text-xl leading-relaxed text-neutral-700 sm:text-2xl">
      <p>
        Hi, I'm Sam. I'm a backend software engineer working with data, Python and APIs. I like building things that help people plan sustainably for climate change and natural hazards, including where and how to build.
      </p>      
      <p>
        I'm a Software Engineer at <a href="https://resilience-explorer.com/urban-intelligence/team" target="_blank" rel="noopener noreferrer">Urban Intelligence</a>, where I work on our internal platforms and our external products, like the <a href="https://resilience-explorer.com" target="_blank" rel="noopener noreferrer">Resilience Explorer</a>. 
      </p>
      <p>
        These days I lead technical design across our engineering platform, from the plugin architecture that lets us extend data pipelines without touching core code, to the testing and code-quality standards the team works to.
      </p>
      <p>
        My master's research used optimisation to work out where new housing should go when coastal homes have to retreat from flooding. It was <a href="https://doi.org/10.1016/j.envsci.2024.103960" target="_blank" rel="noopener noreferrer">published in Environmental Science and Policy</a>.
      </p>
      <p>
        In my spare time, you can usually find me tramping, doing arts and crafts, DIY, travelling, tinkering with tech, cooking or reading.
      </p>
      </div>
    </section>
  );
}
