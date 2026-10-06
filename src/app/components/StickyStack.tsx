"use client";

import { useEffect, useRef } from "react";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";

// Combien le calque recouvert rétrécit et s'assombrit une fois entièrement couvert.
const RECEDE_SCALE = 0.92;
const RECEDE_SHADE = 0.55;

export default function StickyStack() {
  const heroOuterRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const heroShadeRef = useRef<HTMLDivElement>(null);

  const aboutOuterRef = useRef<HTMLDivElement>(null);
  const aboutInnerRef = useRef<HTMLDivElement>(null);
  const aboutShadeRef = useRef<HTMLDivElement>(null);

  const projectsOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 639px)").matches) return; // pas d'empilement sur mobile
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const apply = () => {
      const view = window.innerHeight || 1;

      const layers = [
        {
          inner: heroInnerRef.current,
          shade: heroShadeRef.current,
          next: aboutOuterRef.current,
        },
        {
          inner: aboutInnerRef.current,
          shade: aboutShadeRef.current,
          next: projectsOuterRef.current,
        },
      ];

      for (const { inner, shade, next } of layers) {
        if (!inner || !shade || !next) continue;
        const p = Math.min(
          1,
          Math.max(0, 1 - next.getBoundingClientRect().top / view)
        );
        const shrink = 1 - RECEDE_SCALE;
        inner.style.transform = p > 0 ? `scale(${1 - shrink * p})` : "";
        inner.style.willChange = p > 0 ? "transform" : "";
        shade.style.opacity = `${RECEDE_SHADE * p}`;
      }

      raf = requestAnimationFrame(apply);
    };

    raf = requestAnimationFrame(apply);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative bg-surface-dark">
      <div ref={heroOuterRef} className="sticky top-0 z-0">
        <div ref={heroInnerRef} className="origin-center">
          <Hero />
        </div>
        <div
          ref={heroShadeRef}
          className="pointer-events-none absolute inset-0 bg-black opacity-0"
        />
      </div>

      <div ref={aboutOuterRef} className="sticky top-0 z-10">
        <div ref={aboutInnerRef} className="origin-center">
          <About />
        </div>
        <div
          ref={aboutShadeRef}
          className="pointer-events-none absolute inset-0 bg-black opacity-0"
        />
      </div>

      <div ref={projectsOuterRef} className="relative z-20">
        <Projects />
      </div>
    </div>
  );
}
