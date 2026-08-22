import { useLenis } from "lenis/react";

export function useScrollToSection() {
  const lenis = useLenis();

  return (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    lenis?.scrollTo(href, { offset: 0, duration: 1.5 });
  };
}
