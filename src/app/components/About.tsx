
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { withBasePath } from "../lib/basePath";
import WordReveal from "./WordReveal";
import type { IconType } from "react-icons";
import {
  SiOpenjdk,
  SiPhp,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiPostgresql,
  SiTailwindcss,
  SiGit,
  SiDocker,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Stack technique — icônes locales (react-icons), pas de dépendance CDN externe
  const stack: { name: string; Icon: IconType }[] = [
    { name: "Java", Icon: SiOpenjdk },
    { name: "PHP", Icon: SiPhp },
    { name: "JavaScript", Icon: SiJavascript },
    { name: "TypeScript", Icon: SiTypescript },
    { name: "Next.js", Icon: SiNextdotjs },
    { name: "React", Icon: SiReact },
    { name: "PostgreSQL", Icon: SiPostgresql },
    { name: "Tailwind", Icon: SiTailwindcss },
    { name: "Git", Icon: SiGit },
    { name: "Docker", Icon: SiDocker },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const marquee = marqueeRef.current;
    let onEnter: (() => void) | undefined;
    let onLeave: (() => void) | undefined;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(lineRef.current, { scaleX: 1 });
        gsap.set(photoRef.current, { opacity: 1, y: 0, scale: 1 });
      } else {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        });
        tl.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.6, ease: "power4.out" }
        );

        if (titleRef.current) {
          titleRef.current.innerHTML = titleRef.current.textContent!.replace(
            /\S/g,
            "<span class='inline-block'>$&</span>"
          );
          tl.fromTo(
            titleRef.current.querySelectorAll("span"),
            { y: 300, rotationX: -100, opacity: 0 },
            {
              y: 0,
              rotationX: 0,
              opacity: 1,
              duration: 1.6,
              ease: "power4.out",
              stagger: 0.06,
            },
            "-=1.2"
          );
        }

        tl.fromTo(
          photoRef.current,
          { y: 80, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
          "-=1"
        );
      }

      // MARQUEE INFINI AVEC LOGOS
      if (!marquee) return;

      if (marquee.dataset.duplicated !== "true") {
        const items = marquee.innerHTML;
        marquee.innerHTML = items + items + items; // duplication x3
        marquee.dataset.duplicated = "true";
      }

      const totalWidth = marquee.scrollWidth / 3;

      if (!prefersReducedMotion) {
        gsap.to(marquee, {
          x: -totalWidth,
          duration: 50,
          ease: "none",
          repeat: -1,
        });
      }

      // Pause douce + petit glow cyan au hover
      onEnter = () => {
        gsap.to(marquee, { timeScale: 0.15, ease: "power2.out" });
        gsap.to(marquee.querySelectorAll("svg"), {
          filter: "drop-shadow(0 0 20px rgba(2, 210, 227, 0.6))",
          color: "#02d2e3",
          duration: 0.6,
        });
      };
      onLeave = () => {
        gsap.to(marquee, { timeScale: 1, ease: "power2.out" });
        gsap.to(marquee.querySelectorAll("svg"), {
          filter: "none",
          color: "rgba(255,255,255,0.9)",
          duration: 0.8,
        });
      };
      marquee.addEventListener("mouseenter", onEnter);
      marquee.addEventListener("mouseleave", onLeave);
    }, containerRef);

    return () => {
      if (marquee && onEnter && onLeave) {
        marquee.removeEventListener("mouseenter", onEnter);
        marquee.removeEventListener("mouseleave", onLeave);
      }
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="apropos"
      ref={containerRef}
      className="relative min-h-screen bg-surface-dark text-white pt-28 pb-32 md:pt-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-4 flex items-center gap-4 md:mb-6">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            the season so far
          </span>
          <div ref={lineRef} className="h-px w-24 bg-white/20 origin-left md:w-40" />
        </div>

        <h2
          ref={titleRef}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.02em] leading-none mb-6 md:mb-8 select-none"
          style={{ perspective: 1200 }}
        >
          À propos
        </h2>

        <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16 lg:items-start">
          <div
            ref={photoRef}
            className="relative mx-auto aspect-[4/5] w-64 overflow-hidden rounded-sm bg-black/40 p-2 lg:mx-0 lg:w-80"
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={withBasePath("/hakim-headshot-about.jpg")}
                alt="RAKOTOALIMANANA Ny Harijaona Hakim Sabi"
                fill
                className="object-cover object-top"
                sizes="320px"
              />
            </div>
            {[
              "left-2 top-2",
              "right-2 top-2 -scale-x-100",
              "left-2 bottom-2 -scale-y-100",
              "right-2 bottom-2 -scale-x-100 -scale-y-100",
            ].map((pos) => (
              <svg
                key={pos}
                viewBox="0 0 10.5 10.5"
                className={`pointer-events-none absolute h-3.5 w-3.5 text-accent ${pos}`}
                aria-hidden="true"
              >
                <path d="M0 0.5H10V10.5" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            ))}
          </div>

          <div ref={textRef} className="space-y-6 leading-relaxed">
            <WordReveal
              text="Je suis RAKOTOALIMANANA Ny Harijaona Hakim Sabi, développeur fullstack créatif basé à Madagascar."
              className="text-lg font-semibold text-white sm:text-xl md:text-2xl lg:text-3xl"
            />
            <WordReveal
              text="Passionné par le code propre, les performances extrêmes et les interfaces qui marquent les esprits."
              className="text-base text-white/60 sm:text-lg md:text-xl"
              start="top 90%"
            />
          </div>
        </div>

        {/* MARQUEE INFINI AVEC LOGOS + GLOW CYAN AU HOVER */}
        <div className="mt-24 md:mt-32">
          <div className="mb-8 flex items-center gap-4 md:mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
              stack technique
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="overflow-hidden">
            <div
              ref={marqueeRef}
              data-cursor="hover"
              className="flex items-center gap-20 md:gap-32 py-4 whitespace-nowrap"
            >
              {stack.map(({ name, Icon }, i) => (
                <div
                  key={i}
                  title={name}
                  className="flex shrink-0 flex-col items-center gap-3"
                >
                  <Icon className="h-16 w-16 text-white/90 transition-all duration-500 md:h-20 md:w-20 lg:h-24 lg:w-24" />
                  <span className="text-xs tracking-[0.2em] text-white/40">
                    {name.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 flex justify-center md:mt-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/50">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Disponible immédiatement · Freelance ou CDI
          </span>
        </div>
      </div>
    </section>
  );
}
