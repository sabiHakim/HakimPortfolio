"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Github, Mail, Send, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const titleRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
    });

    tl.from(titleRef.current, { y: 120, opacity: 0, duration: 1.2, ease: "power4.out" })
      .from(formRef.current, { y: 100, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.8")
      .from(socialRef.current, { y: 80, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.6");
  }, []);

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-24 sm:py-32 bg-black text-white"
    >
      <div className="max-w-2xl mx-auto w-full">

        {/* TITRE RESPONSIVE */}
        <h2
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter mb-16 sm:mb-24 text-center"
        >
          Contact
        </h2>

        {/* FORMULAIRE */}
        <form
          ref={formRef}
          action="https://formspree.io/f/meonarjp"
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-10 relative"
        >
          <input
            type="text"
            name="name"
            placeholder="Ton nom"
            required
            className="w-full bg-transparent border-b-2 border-gray-700 text-xl sm:text-3xl py-4 sm:py-5 focus:border-white outline-none transition-all duration-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Ton email"
            required
            className="w-full bg-transparent border-b-2 border-gray-700 text-xl sm:text-3xl py-4 sm:py-5 focus:border-white outline-none transition-all duration-500"
          />

          <textarea
            name="message"
            rows={5}
            placeholder="Ton message…"
            required
            className="w-full bg-transparent border-b-2 border-gray-700 text-xl sm:text-3xl py-4 sm:py-5 focus:border-white outline-none transition-all duration-500 resize-none"
          ></textarea>

          {/* BOUTON RESPONSIVE */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="group flex items-center justify-center gap-3 text-xl sm:text-2xl border-2 border-white px-8 sm:px-12 py-4 sm:py-6 
                       hover:bg-white hover:text-black disabled:opacity-60 transition-all duration-500 font-medium w-full sm:w-auto"
          >
            {status === "sending" ? "Envoi en cours…" : "Envoyer"}
            <Send className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
          </button>

          {/* Messages */}
          {status === "success" && (
            <div className="absolute -bottom-14 left-0 flex items-center gap-3 text-green-400 text-lg sm:text-xl animate-pulse">
              <CheckCircle /> Message envoyé !
            </div>
          )}

          {status === "error" && (
            <div className="absolute -bottom-14 left-0 text-red-400 text-lg sm:text-xl">
              Erreur d’envoi. Réessaie 🙂
            </div>
          )}
        </form>

        {/* SOCIAL ICONS RESPONSIVE */}
        <div ref={socialRef} className="flex justify-center gap-8 sm:gap-12 mt-28 sm:mt-32 text-4xl sm:text-5xl">
          <a href="https://www.linkedin.com/in/sabi-rakotoalimanana-7326a0312" target="_blank"
            className="hover:text-purple-400 transition-all hover:scale-110"><Linkedin /></a>

          <a href="https://github.com/sabiHakim" target="_blank"
            className="hover:text-purple-400 transition-all hover:scale-110"><Github /></a>

          <a href="mailto:srakotoalimanana@gmail.com"
            className="hover:text-purple-400 transition-all hover:scale-110"><Mail /></a>
        </div>

        <p className="text-center mt-10 text-gray-500 text-base sm:text-lg">
          Ou écris-moi →{" "}
          <a href="mailto:srakotoalimanana@gmail.com" className="underline underline-offset-4 hover:text-white">
            srakotoalimanana@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
