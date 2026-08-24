
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { withBasePath } from "../lib/basePath";
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
        gsap.set([photoRef.current, textRef.current], { opacity: 1, y: 0, scale: 1 });
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

        tl.fromTo(
          textRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: "power3.out" },
          "-=1.2"
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

      // Pause douce + petit glow violet au hover
      onEnter = () => {
        gsap.to(marquee, { timeScale: 0.15, ease: "power2.out" });
        gsap.to(marquee.querySelectorAll("svg"), {
          filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))",
          color: "#a855f7",
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
      className="text-white py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="w-full max-w-sm mb-12 md:mb-20">
          <div ref={lineRef} className="h-px bg-white/20 origin-left" />
        </div>

        <h2
          ref={titleRef}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[0.08em] leading-none mb-12 md:mb-16 select-none"
          style={{ perspective: 1200 }}
        >
          À propos
        </h2>

        <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16 lg:items-start">
          <div
            ref={photoRef}
            className="relative mx-auto aspect-[484/1145] w-full max-w-[220px] lg:mx-0"
            style={{
              maskImage:
                "radial-gradient(ellipse 60% 55% at 50% 38%, black 25%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 55% at 50% 38%, black 25%, transparent 100%)",
            }}
          >
            <Image
              src={withBasePath("/hakim-portrait-tight.jpg")}
              alt="RAKOTOALIMANANA Ny Harijaona Hakim Sabi"
              fill
              className="object-contain object-top"
              sizes="220px"
            />
          </div>

          <div
            ref={textRef}
            className="space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed"
          >
            <p>
              Je suis{" "}
              <span className="text-white font-bold">
                RAKOTOALIMANANA Ny Harijaona Hakim Sabi
              </span>
              ,<br />
              développeur{" "}
              <span className="text-white font-bold">fullstack créatif</span> basé
              à Madagascar.
            </p>
            <p>
              Passionné par le code propre, les performances extrêmes et les
              interfaces qui marquent les esprits.
            </p>
            <p className="mt-10 text-xl sm:text-2xl md:text-3xl font-bold text-white/80">
              Mes stacks techniques :
            </p>
          </div>
        </div>

        {/* MARQUEE INFINI AVEC LOGOS BLANC/NOIR + GLOW VIOLET AU HOVER */}
        <div className="mt-20 overflow-hidden">
          <div
            ref={marqueeRef}
            className="flex items-center gap-20 md:gap-32 py-12 whitespace-nowrap"
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

        <p className="mt-32 text-2xl text-gray-500 italic text-center">
          Disponible immédiatement · Freelance ou CDI · Contacte-moi
        </p>
      </div>
    </section>
  );
}
