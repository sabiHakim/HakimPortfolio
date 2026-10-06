"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Bouton "magnétique" : suit le curseur avec un ressort (elastic.out),
 * technique signature du tutoriel Awwwards d'Olivier Larose.
 */
export default function MagneticButton({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const setX = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.3)" });
    const setY = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.3)" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      setX(relX * strength);
      setY(relY * strength);
    };

    const onLeave = () => {
      setX(0);
      setY(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} data-cursor="hover" className={className}>
      {children}
    </div>
  );
}
