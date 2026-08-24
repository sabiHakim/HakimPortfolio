"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    const setX = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3.out" });
    const setY = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);
      gsap.to(glow, { opacity: 1, duration: 0.6, overwrite: "auto" });
    };

    const onLeave = () => gsap.to(glow, { opacity: 0, duration: 0.6 });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(168,85,247,0.16) 0%, rgba(168,85,247,0) 70%)",
      }}
    />
  );
}
