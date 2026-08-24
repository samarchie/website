import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 6.006 0c2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.303 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const inputClasses =
  "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-500";

type Status = "idle" | "sending" | "sent" | "error";

const TURNSTILE_SITE_KEY = "0x4AAAAAAEY0rK_BSslvZUzv";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; action?: string },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
    __turnstileReady?: Promise<void>;
  }
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    window.__turnstileReady?.then(() => {
      if (cancelled || !turnstileContainerRef.current) return;
      turnstileWidgetIdRef.current = window.turnstile!.render(turnstileContainerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        action: "contact",
      });
    });
    return () => {
      cancelled = true;
      if (turnstileWidgetIdRef.current) window.turnstile?.remove(turnstileWidgetIdRef.current);
    };
  }, []);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      if (turnstileWidgetIdRef.current) window.turnstile?.reset(turnstileWidgetIdRef.current);
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center sm:py-32"
    >
      <img
        src="/contact.webp"
        alt="Sam Archie"
        loading="lazy"
        className="size-120 rounded-[3.5rem] object-cover"
      />
      <h2 className="text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
        Let's get in touch.
      </h2>
      <div className="flex w-full max-w-3xl flex-col items-center gap-8">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-3 text-left"
        >
          {/* honeypot: bots fill hidden fields, humans never see this */}
          <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
          <input type="hidden" name="subject" value="New message from website contact form" />
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className={inputClasses}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            className={inputClasses}
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows={4}
            className={inputClasses}
          />
          <div ref={turnstileContainerRef} className="self-center" />
          <Button
            type="submit"
            size="lg"
            disabled={status === "sending"}
            className="h-auto self-center px-6 py-2.5"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </Button>
          {status === "sent" && (
            <p className="text-center text-sm text-green-600">
              Message sent. Thanks for getting in touch!
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-red-600">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
      <div className="flex items-center gap-6 text-sm text-neutral-500">
        <a
          href="https://www.linkedin.com/in/sam-archie/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-neutral-900"
        >
          <LinkedinIcon className="size-4" />
          LinkedIn
          <ArrowUpRight className="size-3.5" />
        </a>
        <a
          href="https://github.com/samarchie"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-neutral-900"
        >
          <GithubIcon className="size-4" />
          GitHub
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
      <p className="pt-8 text-xs text-neutral-400">
        © {new Date().getFullYear()} Sam Archie
      </p>
    </section>
  );
}
