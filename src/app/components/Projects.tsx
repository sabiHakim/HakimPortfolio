"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { withBasePath } from "../lib/basePath";

gsap.registerPlugin(ScrollTrigger);

interface ProjectType {
  id: number;
  title: string;
  tech: string;
  image: string;
  liveUrl?: string;
}

const projects: ProjectType[] = [
  {
    id: 1,
    title: "Times261",
    tech: "Laravel · PHP · React",
    image: "/ordi.jfif",
    liveUrl: "https://times261.com",
  },
  {
    id: 2,
    title: "Rental System",
    tech: "Next.js · SpringBoot · Java",
    image: "/ordi.jfif",
    liveUrl: "https://rental.mg-transp.com",
  },
  {
    id: 3,
    title: "C.A.R Platform",
    tech: "Next.js · TypeScript · Tailwind",
    image: "/ordi.jfif",
    liveUrl: "https://cartaxaudit.com",
  },
  {
    id: 4,
    title: "ERP C.A.R",
    tech: "React · SpringBoot · Java",
    image: "/ordi.jfif",
    liveUrl: "https://erp.cartaxaudit.com",
  },
  { id: 5, title: "Pointage RH", tech: "Laravel · PHP", image: "/ordi.jfif" },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Entrée des lignes au scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = rowsRef.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(rows, { opacity: 0, y: 40 });

      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Aperçu flottant qui suit le curseur (desktop uniquement)
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const preview = previewRef.current;
    if (!preview) return;

    const setX = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
    const setY = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      setX(e.clientX);
      setY(e.clientY);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    gsap.to(preview, {
      opacity: activeIndex !== null ? 1 : 0,
      scale: activeIndex !== null ? 1 : 0.85,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [activeIndex]);

  const activeProject = activeIndex !== null ? projects[activeIndex] : null;

  return (
    <section
      ref={sectionRef}
      id="projets"
      className="relative bg-surface-dark px-6 py-20 text-white md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center justify-center gap-4 md:mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            from karts to full-stack
          </span>
          <div className="h-px w-24 bg-white/20 md:w-40" />
        </div>

        <h2 className="font-display mb-16 text-center text-3xl font-bold tracking-[0.02em] sm:text-4xl md:mb-24 md:text-5xl lg:text-6xl">
          Projets
        </h2>

        <div className="border-t border-white/10">
          {projects.map((project, i) => {
            const Row = (
              <div
                ref={(el) => {
                  rowsRef.current[i] = el;
                }}
                data-cursor="hover"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex((cur) => (cur === i ? null : cur))}
                className="group flex items-center justify-between gap-6 border-b border-white/10 py-8 transition-colors duration-300 hover:bg-white/[0.03] md:py-10"
              >
                <div className="flex min-w-0 items-baseline gap-4 md:gap-8">
                  <span className="shrink-0 font-display text-sm text-white/30 md:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display truncate text-3xl font-bold tracking-[0.01em] transition-transform duration-300 group-hover:translate-x-3 group-hover:text-accent sm:text-4xl md:text-5xl lg:text-6xl">
                    {project.title}
                  </h3>
                </div>

                <div className="flex shrink-0 items-center gap-4 md:gap-8">
                  <span className="hidden text-sm text-white/45 sm:block md:text-base">
                    {project.tech}
                  </span>
                  {project.liveUrl ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-black md:px-4 md:py-2">
                      LIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-white/70 md:px-4 md:py-2">
                      PRIVÉ
                    </span>
                  )}
                  <ArrowUpRight
                    className={`h-6 w-6 transition-all duration-300 md:h-8 md:w-8 ${
                      project.liveUrl
                        ? "text-white/30 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                        : "text-white/10"
                    }`}
                  />
                </div>
              </div>
            );

            return project.liveUrl ? (
              <a
                key={project.id}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {Row}
              </a>
            ) : (
              <div key={project.id} className="cursor-default">
                {Row}
              </div>
            );
          })}
        </div>
      </div>

      {/* Aperçu flottant qui suit le curseur */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-56 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm border border-white/10 opacity-0 shadow-2xl shadow-black/50 md:block"
      >
        {activeProject && (
          <Image
            src={withBasePath(activeProject.image)}
            alt=""
            fill
            className="object-cover"
            sizes="320px"
          />
        )}
      </div>
    </section>
  );
}
