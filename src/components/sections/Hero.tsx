"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const PHRASES = [
  "specializing in modern TypeScript architectures, scalable backend services, and snappy interactive user interfaces.",
  "turning complex distributed systems into fast, reliable products that people actually enjoy using.",
  "shipping end to end — database schema, APIs, and pixel-perfect interfaces.",
  "obsessed with performance, clean architecture, and motion that feels effortless.",
];

function useRotatingTypewriter(texts: string[]) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const current = texts[index];
    let delay: number;
    let action: () => void;

    if (!deleting && length < current.length) {
      delay = 55;
      action = () => setLength((n) => n + 1);
    } else if (!deleting) {
      delay = 1800;
      action = () => setDeleting(true);
    } else if (length > 0) {
      delay = 28;
      action = () => setLength((n) => n - 1);
    } else {
      delay = 320;
      action = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % texts.length);
      };
    }

    const t = window.setTimeout(action, delay);
    return () => window.clearTimeout(t);
  }, [texts, index, length, deleting, reduced]);

  const current = texts[index];
  return reduced ? current : current.slice(0, length);
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const typed = useRotatingTypewriter(PHRASES);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);

  return (
    <section
      ref={containerRef}
      className="bg-neutral text-on-dark min-h-[100svh] flex items-center pt-12 sm:pt-16 lg:pt-24 pb-16 sm:pb-24 lg:pb-32 overflow-hidden"
      aria-label="Introduction"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.5fr_0.7fr] gap-8 sm:gap-12 lg:gap-24 items-end">
        <motion.div style={{ y: yText, opacity }}>
          <motion.h1
            className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.94] text-balance"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          >
            I build resilient, high-
            <span className="rounded-[0.12em] bg-secondary px-[0.08em] text-neutral [box-decoration-break:clone]">
              performance
            </span>{" "}
            web systems.
          </motion.h1>
          <motion.p
            className="max-w-[34rem] mt-8 min-h-[8.5rem] sm:min-h-[7rem] text-lg sm:text-xl text-dim-dark leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <span className="sr-only">
              Fullstack Developer &amp; Software Engineer specializing in modern
              TypeScript architectures, scalable backend services, and snappy
              interactive user interfaces.
            </span>
            <span aria-hidden="true">
              <b className="font-medium text-on-dark">
                Fullstack Developer &amp; Software Engineer
              </b>{" "}
              {typed}
              <span className="ml-0.5 inline-block animate-[caret-blink_1s_steps(1)_infinite] text-secondary">
                |
              </span>
            </span>
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 mt-9"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <a
              className="inline-flex items-center gap-2.5 font-body font-semibold text-[1.05rem] px-6 py-3.5 rounded-full bg-primary border-2 border-primary text-white hover:bg-[#A94824] hover:border-[#A94824] transition-colors cursor-pointer"
              href="#projects"
            >
              Explore projects
            </a>
            <a
              className="inline-flex items-center gap-2.5 font-body font-semibold text-[1.05rem] px-6 py-3.5 rounded-full border-2 border-current text-inherit bg-transparent hover:bg-on-dark hover:text-neutral hover:border-on-dark transition-colors cursor-pointer"
              href="cv.pdf"
              download
            >
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        <motion.figure
          style={{ y: yPortrait, opacity }}
          className="relative max-w-[320px] lg:max-w-none w-full self-center"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {/* Offset border frame */}
          <div className="absolute inset-0 translate-x-[18px] translate-y-[18px] border-2 border-secondary rounded-[6px] pointer-events-none" />
          <div className="relative z-1 aspect-[4/5] bg-primary rounded-[6px] overflow-hidden grid place-items-center">
            <span className="font-display font-bold text-7xl text-white/90 select-none" aria-hidden="true">IG</span>
            <img
              src="gue.jpg"
              alt="Portrait of Ismail Gilang Maulana"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
