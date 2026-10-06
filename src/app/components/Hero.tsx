
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { withBasePath } from "../lib/basePath";
import WordReveal from "./WordReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const firstLineRef = useRef<HTMLSpanElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoPlateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mots qui tournent en boucle
    const words = [
      "BACK-END",
      "FRONT-END",
      "FULLSTACK",
      "INNOVATEUR",
    ];
    let currentWordIndex = 0;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(lineRef.current, { scaleX: 1 });
      gsap.set([subtitleRef.current, photoRef.current], { opacity: 1, y: 0 });
      if (typewriterRef.current) typewriterRef.current.textContent = words[0];
      return;
    }

    let cancelled = false;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Ligne qui se dessine
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: "power4.out" }
      );

      // 2. CRÉATIF → flip 3D (tu kiffes ça)
      if (firstLineRef.current) {
        const text = firstLineRef.current.textContent!;
        firstLineRef.current.innerHTML = text.replace(
          /\S/g,
          "<span class='inline-block'>$&</span>"
        );

        tl.fromTo(
          firstLineRef.current.querySelectorAll("span"),
          { y: 400, rotationX: -100, opacity: 0 },
          {
            y: 0,
            rotationX: 0,
            opacity: 1,
            duration: 1.6,
            ease: "power4.out",
            stagger: 0.05,
          },
          "-=1"
        );
      }

      // 3. Boucle Typewriter infinie
      const typeWord = () => {
        if (cancelled) return;
        const word = words[currentWordIndex];
        let i = 0;

        // Écriture du mot
        const write = () => {
          if (cancelled) return;
          if (i <= word.length) {
            typewriterRef.current!.innerHTML = word.substring(0, i);
            i++;
            gsap.delayedCall(0.08, write);
          } else {
            // Pause à la fin
            gsap.delayedCall(2, deleteWord);
          }
        };

        // Suppression du mot
        const deleteWord = () => {
          if (cancelled) return;
          if (i >= 0) {
            typewriterRef.current!.innerHTML = word.substring(0, i);
            i--;
            gsap.delayedCall(0.05, deleteWord);
          } else {
            currentWordIndex = (currentWordIndex + 1) % words.length;
            gsap.delayedCall(0.5, typeWord);
          }
        };

        write();
      };

      // Démarre le typewriter après CRÉATIF
      gsap.delayedCall(1.8, typeWord);
      // Curseur clignotant permanent
      gsap.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: "steps(1)",
      });

      // Parallax subtitle
      gsap.to(subtitleRef.current, {
        y: -120,
        ease: "none",
        scrollTrigger: { trigger: subtitleRef.current, scrub: 1 },
      });

      // Photo : fondu + léger parallax
      tl.fromTo(
        photoRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" },
        "-=1.2"
      );
      gsap.to(photoRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: photoRef.current, scrub: 1 },
      });
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  // Tilt de la photo vers le curseur (pas de depth map : approximation CSS)
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const plate = photoPlateRef.current;
    if (!plate) return;

    const setRotX = gsap.quickTo(plate, "rotationX", { duration: 0.6, ease: "power3.out" });
    const setRotY = gsap.quickTo(plate, "rotationY", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setRotY(nx * 6);
      setRotX(-ny * 4);
    };
    const onLeave = () => {
      setRotX(0);
      setRotY(0);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center relative px-8 py-28 overflow-hidden bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-16 xl:flex-row xl:items-center xl:justify-between xl:gap-12">
        <div className="text-center xl:min-w-0 xl:flex-1 xl:text-left">
          {/* Eyebrow + ligne */}
          <div className="mb-8 flex items-center justify-center gap-4 md:mb-12 xl:justify-start">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/50">
              developer_01
            </span>
            <div ref={lineRef} className="h-px w-24 bg-foreground/20 origin-left md:w-40" />
          </div>

          <h1 className="font-display">
            {/* CRÉATIF fixe */}
            <span
              ref={firstLineRef}
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.02em] leading-none select-none text-foreground"
              style={{ perspective: 1000 }}
            >
              DÉVELOPPEUR
            </span>

            <span className="sr-only">
              Back-end, Front-end, Fullstack, Innovateur
            </span>

            {/* Mot qui change en boucle + curseur */}
            <span
              aria-hidden="true"
              className="flex justify-center items-center mt-4 md:mt-8 xl:justify-start"
            >
              <span
                ref={typewriterRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.02em] leading-none text-accent"
                style={{ perspective: 1000 }}
              />
              <span
                ref={cursorRef}
                className="inline-block w-1.5 h-12 sm:h-14 md:h-16 lg:h-20 bg-accent ml-3 opacity-100"
              />
            </span>
          </h1>

          <WordReveal
            ref={subtitleRef}
            text="Je transforme des idées en applications fonctionnelles, élégantes et performantes."
            className="mt-10 md:mt-14 text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/55 font-normal tracking-wide max-w-3xl mx-auto xl:mx-0"
          />
        </div>

        {/* Photo : plaque à coins, ne recouvre jamais le texte */}
        <div
          ref={photoRef}
          className="relative shrink-0"
          style={{ perspective: 1200 }}
        >
          <div
            ref={photoPlateRef}
            className="relative aspect-[4/5] w-64 overflow-hidden rounded-sm border border-foreground/10 bg-surface-dark-raised p-2 xl:w-80"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={withBasePath("/hakim-headshot.jpg")}
                alt="Hakim Sabi"
                fill
                priority
                className="object-cover object-top"
                sizes="320px"
              />
            </div>

            {/* Coins (bracket panel) */}
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
                <path
                  d="M0 0.5H10V10.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
