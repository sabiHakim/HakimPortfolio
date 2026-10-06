"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import MagneticButton from "./MagneticButton";

/**
 * Bouton avec cercle qui monte en fondu au survol (timeline GSAP), puis
 * ressort à la sortie — même signature que les CTA du tuto Awwwards.
 * `className` doit poser un fond transparent/bordé (le remplissage vient du
 * cercle) ; mets les couleurs de survol du texte via `group-hover:*`.
 */
export default function FluidButton({
  as: Tag = "button",
  children,
  className = "",
  circleClassName = "bg-accent",
  ...props
}: {
  as?: "button" | "a";
  children: React.ReactNode;
  className?: string;
  circleClassName?: string;
} & React.ComponentPropsWithoutRef<"button"> &
  React.ComponentPropsWithoutRef<"a">) {
  const circleRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const ensureTimeline = () => {
    if (!tlRef.current && circleRef.current) {
      tlRef.current = gsap
        .timeline({ paused: true })
        .fromTo(circleRef.current, { yPercent: 125 }, { yPercent: 25, duration: 0.4, ease: "power3.in" })
        .to(circleRef.current, { yPercent: 0, duration: 0.25 });
    }
    return tlRef.current;
  };

  const onEnter = () => ensureTimeline()?.play();
  const onLeave = () => ensureTimeline()?.reverse();

  const Comp = Tag as "button";

  return (
    <MagneticButton>
      <Comp
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        className={`group relative isolate overflow-hidden ${className}`}
        {...props}
      >
        <span
          ref={circleRef}
          aria-hidden
          className={`pointer-events-none absolute inset-0 translate-y-full rounded-[inherit] ${circleClassName}`}
        />
        <span className="relative z-10 inline-flex items-center justify-center gap-3">
          {children}
        </span>
      </Comp>
    </MagneticButton>
  );
}
