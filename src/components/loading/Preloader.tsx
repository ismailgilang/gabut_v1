"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const NAME = "Ismail Gilang Maulana";
const TYPE_MS = 65;
const HOLD_MS = 700;

function useTypewriter(text: string, speed: number) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, reduced]);

  return reduced ? text.length : count;
}

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();
  const count = useTypewriter(NAME, TYPE_MS);
  const progress = Math.min(1, count / NAME.length);
  const complete = progress >= 1;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!complete) return;
    const t = window.setTimeout(() => setVisible(false), reduced ? 300 : HOLD_MS);
    return () => window.clearTimeout(t);
  }, [complete, reduced]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
      }}
    >
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden="true"
          className="fixed inset-0 z-[100] overflow-hidden bg-neutral text-on-dark"
          exit={{ y: "-100%" }}
          transition={{
            y: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
            animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.8, 0.45] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative flex h-full flex-col items-center justify-center gap-7 px-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-dim-dark">
              Loading portfolio
            </span>

            <p className="min-h-[2.4em] text-balance text-center font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {NAME.slice(0, count)}
              <span className="ml-1 inline-block animate-[caret-blink_1s_steps(1)_infinite] text-secondary">
                |
              </span>
            </p>

            <div className="h-px w-56 overflow-hidden bg-white/15 sm:w-64">
              <div
                className="h-full bg-secondary transition-[width] duration-100 ease-linear"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <span className="font-mono text-xs tabular-nums text-dim-dark">
              {Math.round(progress * 100)}%
            </span>
          </motion.div>

          <motion.span
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Fullstack Developer
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
