
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { withBasePath } from "../lib/basePath";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const firstLineRef = useRef<HTMLSpanElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

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

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
        },
        "-=0.5"
      );

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

  return (
    <section className="min-h-screen flex items-center relative px-8 py-28 overflow-hidden">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-16 xl:flex-row xl:items-center xl:justify-between xl:gap-12">
        <div className="text-center xl:min-w-0 xl:flex-1 xl:text-left">
          {/* Ligne */}
          <div className="w-full max-w-md mx-auto mb-8 md:mb-12 xl:mx-0">
            <div ref={lineRef} className="h-px bg-white/30 origin-left" />
          </div>

          <h1 className="font-display">
            {/* CRÉATIF fixe */}
            <span
              ref={firstLineRef}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[0.08em] leading-none select-none"
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
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[0.08em] leading-none"
                style={{ perspective: 1000 }}
              />
              <span
                ref={cursorRef}
                className="inline-block w-1.5 h-12 sm:h-14 md:h-16 lg:h-20 bg-white ml-3 opacity-100"
              />
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-10 md:mt-14 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-light tracking-wide max-w-3xl mx-auto xl:mx-0"
          >
            Je transforme des idées en applications fonctionnelles, élégantes et performantes.
          </p>
        </div>

        {/* Photo : colonne dédiée, ne recouvre jamais le texte */}
        <div
          ref={photoRef}
          className="relative hidden h-[480px] w-[200px] shrink-0 xl:block xl:h-[600px] xl:w-[240px]"
          style={{
            maskImage:
              "radial-gradient(ellipse 65% 55% at 50% 42%, black 25%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 55% at 50% 42%, black 25%, transparent 100%)",
          }}
        >
          <Image
            src={withBasePath("/hakim-full-tight.jpg")}
            alt="Hakim Sabi"
            fill
            priority
            className="object-contain object-bottom"
            sizes="240px"
          />
        </div>
      </div>
    </section>
  );
}
