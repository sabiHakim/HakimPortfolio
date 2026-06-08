
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const firstLineRef = useRef<HTMLHeadingElement>(null);
  const typewriterRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Mots qui tournent en boucle
    const words = [
      "BACK-END",
      "FRONT-END",
      "FULLSTACK",
      "INNOVATEUR",
    ];
    let currentWordIndex = 0;

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
      const word = words[currentWordIndex];
      let i = 0;

      // Écriture du mot
      const write = () => {
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
  }, []);

  return (
    <section className="h-screen flex items-center justify-center relative px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        {/* Ligne */}
        <div className="w-full max-w-md mx-auto mb-8 md:mb-12">
          <div ref={lineRef} className="h-px bg-white/30 origin-left" />
        </div>

        {/* CRÉATIF fixe */}
        <h1
          ref={firstLineRef}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[0.08em] leading-none select-none"
          style={{ perspective: 1000 }}
        >
          DÉVELOPPEUR
        </h1>

        {/* Mot qui change en boucle + curseur */}
        <div className="flex justify-center items-center mt-4 md:mt-8">
          <h1
            ref={typewriterRef}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[0.08em] leading-none"
            style={{ perspective: 1000 }}
          />
          <span
            ref={cursorRef}
            className="inline-block w-1.5 h-12 sm:h-14 md:h-16 lg:h-20 bg-white ml-3 opacity-100"
          />
        </div>

        <p
          ref={subtitleRef}
          className="mt-10 md:mt-14 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-light tracking-wide max-w-3xl mx-auto"
        >
          Je transforme des idées en applications fonctionnelles, élégantes et performantes.
        </p>
      </div>
    </section>
  );
}
