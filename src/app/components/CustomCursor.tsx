"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Curseur personnalisé : un point qui suit exactement, un anneau qui suit
 * avec un léger retard et grossit sur tout élément marqué data-cursor="hover".
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const setDotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let hoverCount = 0;

    const onMove = (e: PointerEvent) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
      gsap.to([dot, ring], { opacity: 1, duration: 0.3, overwrite: "auto" });
    };

    const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const el = target.closest('[data-cursor="hover"]');
      if (!el) return;
      hoverCount++;
      gsap.to(ring, { scale: 2.4, duration: 0.4, ease: "power3.out" });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const onOut = (e: Event) => {
      const target = e.target as HTMLElement;
      const el = target.closest('[data-cursor="hover"]');
      if (!el) return;
      hoverCount = Math.max(0, hoverCount - 1);
      if (hoverCount === 0) {
        gsap.to(ring, { scale: 1, duration: 0.4, ease: "power3.out" });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent opacity-0 will-change-transform hidden md:block"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0 will-change-transform hidden md:block"
      />
    </>
  );
}
