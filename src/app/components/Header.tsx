"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [isOpen, lenis]);

  const sections = [
    { name: "Projets", id: "projets" },
    { name: "À propos", id: "apropos" },
    { name: "Contact", id: "contact" },
  ];

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      lenis?.scrollTo(id, {
        offset: -100,
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }, 600);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-6 md:py-8 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col leading-tight">
            <h1 className="font-display text-xl md:text-2xl lg:text-3xl font-normal tracking-[0.12em] text-white">
              RAKOTOALIMANANA
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-300 -mt-1">
              Ny Harijaona Hakim Sabi
            </p>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-10 h-10 md:hidden z-50"
            aria-label="Menu"
          >
            <span className={`block absolute h-0.5 w-8 bg-white transform transition-all duration-300 ${isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"}`} />
            <span className={`block absolute h-0.5 w-8 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`block absolute h-0.5 w-8 bg-white transform transition-all duration-300 ${isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"}`} />
          </button>

          <nav className="hidden md:flex gap-12 lg:gap-16 text-lg">
            {sections.map((s) => (
              <button key={s.id} onClick={() => scrollTo(`#${s.id}`)} className="hover:text-gray-400 transition">
                {s.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-40 bg-black flex items-center justify-center"
      >
        <div className="flex flex-col gap-12 text-7xl font-light tracking-tight text-center">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(`#${s.id}`)}
              className="text-white hover:text-gray-500 transition duration-500"
            >
              {s.name}
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
