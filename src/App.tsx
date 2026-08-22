import ReactLenis from "lenis/react";
import { Nav } from "@/components/Nav";
import { About } from "@/components/About";
import { ProjectStack } from "@/components/ProjectStack";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

function App() {
  return (
    <ReactLenis root>
      <div className="relative isolate bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage: `url(/contours.webp)`,
            backgroundRepeat: "repeat",
            backgroundSize: "420px auto",
          }}
        />
        <Nav />
        <About />
        <ProjectStack />
        <Experience />
        <Contact />
      </div>
    </ReactLenis>
  );
}



export default App;
