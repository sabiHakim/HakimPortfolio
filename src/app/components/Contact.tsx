"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  Download,
  Send,
} from "lucide-react";
import { withBasePath } from "../lib/basePath";

gsap.registerPlugin(ScrollTrigger);

type FormStatus = "idle" | "sending" | "success" | "error";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sabi-rakotoalimanana-7326a0312",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/sabiHakim",
    icon: Github,
  },
  {
    label: "Email",
    href: "mailto:srakotoalimanana@gmail.com",
    icon: Mail,
  },
] as const;

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(titleRef.current, {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          introRef.current,
          {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          formRef.current,
          {
            y: 36,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .from(
          socialsRef.current,
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
      window.setTimeout(() => setStatus("idle"), 4500);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-6 py-24 text-foreground md:px-8 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(2,210,227,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(9,10,11,0.04),transparent_30%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="space-y-8">
          <div ref={titleRef} className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
              Contact
            </p>
            <h2 className="font-display max-w-xl text-5xl font-bold tracking-[0.01em] text-balance sm:text-6xl lg:text-8xl">
              Let&apos;s build something great together.
            </h2>
          </div>

          <div ref={introRef} className="max-w-xl space-y-5 text-base leading-8 text-foreground/65 sm:text-lg">
            <p>
              Si tu as un projet, une idee a concretiser ou juste envie
              d&apos;echanger, je suis disponible pour en parler.
            </p>
            <p>
              Je privilegie des interfaces propres, rapides et adaptatives pour
              que ton site reste beau sur mobile comme sur grand ecran.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-sm border border-foreground/10 bg-foreground/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/40">
                Reply time
              </p>
              <p className="mt-3 text-lg font-semibold">Sous 24h si possible</p>
            </div>
            <div className="rounded-sm border border-foreground/10 bg-foreground/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/40">
                Location
              </p>
              <p className="mt-3 text-lg font-semibold">Madagascar, remote friendly</p>
            </div>
          </div>

          <div ref={socialsRef} className="flex flex-wrap gap-3 pt-2">
            <a
              href={withBasePath("/cv_Hakim.pdf")}
              download
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-all duration-300 hover:scale-[1.02] hover:bg-accent hover:text-black"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Télécharger CV
            </a>
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-3 rounded-full border border-foreground/10 bg-foreground/[0.03] px-5 py-3 text-sm font-medium text-foreground/80 transition-all duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-foreground"
              >
                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-sm border border-foreground/10 bg-foreground/[0.02] p-6 shadow-xl shadow-foreground/5 sm:p-8 lg:p-10">
          <form
            ref={formRef}
            action="https://formspree.io/f/meonarjp"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-3 text-sm font-medium text-foreground/70">
                <span>Nom</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Ton nom"
                  required
                  className="w-full rounded-sm border border-foreground/15 bg-background px-4 py-4 text-base text-foreground outline-none transition-all duration-300 placeholder:text-foreground/30 focus:border-accent"
                />
              </label>

              <label className="space-y-3 text-sm font-medium text-foreground/70">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="ton@email.com"
                  required
                  className="w-full rounded-sm border border-foreground/15 bg-background px-4 py-4 text-base text-foreground outline-none transition-all duration-300 placeholder:text-foreground/30 focus:border-accent"
                />
              </label>
            </div>

            <label className="space-y-3 text-sm font-medium text-foreground/70">
              <span>Message</span>
              <textarea
                name="message"
                rows={7}
                placeholder="Parle-moi de ton projet..."
                required
                className="w-full resize-none rounded-sm border border-foreground/15 bg-background px-4 py-4 text-base text-foreground outline-none transition-all duration-300 placeholder:text-foreground/30 focus:border-accent"
              />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-black shadow-lg shadow-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-accent/30 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                  {status === "sending" ? "Envoi en cours..." : "Envoyer"}
                </span>
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="text-sm text-foreground/45">
                Ou ecris directement a{" "}
                <a
                  href="mailto:srakotoalimanana@gmail.com"
                  className="font-medium text-foreground/80 underline underline-offset-4 transition-colors hover:text-accent"
                >
                  srakotoalimanana@gmail.com
                </a>
              </p>
            </div>

            <div aria-live="polite" className="min-h-8 text-sm">
              {status === "success" && (
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Message envoye. Je reviens vers toi tres vite.
                </div>
              )}

              {status === "error" && (
                <div className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-red-700">
                  Oups, l&apos;envoi a echoue. Reessaie ou contacte-moi par email.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
