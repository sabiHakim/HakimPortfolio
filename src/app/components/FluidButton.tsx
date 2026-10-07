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
  wrapperClassName = "inline-block",
  ...props
}: {
  as?: "button" | "a";
  children: React.ReactNode;
  className?: string;
  circleClassName?: string;
  wrapperClassName?: string;
} & React.ComponentPropsWithoutRef<"button"> &
  React.ComponentPropsWithoutRef<"a">) {
  const circleRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const ensureTimeline = () => {
    if (!tlRef.current && circleRef.current) {
      tlRef.current = gsap
        .timeline({ paused: true })
        .fromTo(
          circleRef.current,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.55, ease: "power2.out" }
        );
    }
    return tlRef.current;
  };

  const onEnter = () => ensureTimeline()?.play();
  const onLeave = () => ensureTimeline()?.reverse();

  const Comp = Tag as "button";

  return (
    <MagneticButton className={wrapperClassName}>
      <Comp
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        className={`group relative isolate overflow-hidden ${className}`}
        {...props}
      >
        <span
          ref={circleRef}
          aria-hidden
          style={{ transform: "scaleY(0)", transformOrigin: "bottom" }}
          className={`pointer-events-none absolute inset-0 rounded-[inherit] ${circleClassName}`}
        />
        <span className="relative z-10 inline-flex items-center justify-center gap-3">
          {children}
        </span>
      </Comp>
    </MagneticButton>
  );
}
