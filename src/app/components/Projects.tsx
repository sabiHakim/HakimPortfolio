"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(cards, {
        opacity: 0,
        y: 60,
        scale: 0.97,
        filter: "blur(6px)",
        transformOrigin: "center center",
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projets"
      className="bg-surface-dark px-6 py-20 text-white md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center justify-center gap-4 md:mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            from karts to full-stack
          </span>
          <div className="h-px w-24 bg-white/20 md:w-40" />
        </div>

        <h2 className="font-display mb-16 text-center text-4xl font-bold tracking-[0.02em] sm:text-5xl md:mb-24 md:text-6xl lg:text-7xl">
          Projets
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group overflow-hidden rounded-sm border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-accent/15"
            >
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <ProjectCard project={project} hasLink />
                </a>
              ) : (
                <div className="cursor-default">
                  <ProjectCard project={project} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  hasLink = false,
}: {
  project: ProjectType;
  hasLink?: boolean;
}) {
  return (
    <>
      <div className="relative aspect-video overflow-hidden bg-zinc-950">
        <Image
          src={withBasePath(project.image)}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

        {hasLink ? (
          <div className="absolute right-4 top-4 rounded-full bg-accent px-3 py-2 text-[10px] font-bold tracking-[0.25em] text-black backdrop-blur md:right-6 md:top-6 md:px-4">
            <span className="relative mr-2 inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/60 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-black/80" />
            </span>
            LIVE
          </div>
        ) : (
          <div className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-2 text-[10px] font-bold tracking-[0.25em] backdrop-blur md:right-6 md:top-6 md:px-4">
            PRIVÉ
          </div>
        )}
      </div>

      <div className="space-y-3 p-6 md:p-8 lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-tight transition-colors duration-500 group-hover:text-accent sm:text-3xl md:text-4xl">
            {project.title}
          </h3>
          {hasLink && (
            <ExternalLink className="h-5 w-5 shrink-0 text-accent opacity-0 translate-y-3 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:h-6 sm:w-6" />
          )}
        </div>
        <p className="text-sm font-medium text-white/50 sm:text-base md:text-lg">
          {project.tech}
        </p>
      </div>
    </>
  );
}
