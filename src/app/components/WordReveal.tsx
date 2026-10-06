"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal mot par mot (chaque mot masqué puis glissé vers le haut), déclenché
 * au scroll — la technique "Description" du tuto Awwwards d'Olivier Larose.
 * Texte brut uniquement (pas de JSX imbriqué).
 */
const WordReveal = forwardRef<HTMLParagraphElement, {
  text: string;
  className?: string;
  start?: string;
}>(function WordReveal({ text, className = "", start = "top 85%" }, forwardedRef) {
  const ref = useRef<HTMLParagraphElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLParagraphElement);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-word]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.6,
          stagger: 0.025,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [start, text]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pb-[0.15em]">
          <span data-word className="inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </p>
  );
});

export default WordReveal;
