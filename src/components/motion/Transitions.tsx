"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  enableParallax?: boolean;
}

export function SectionTransition({
  children,
  id,
  className = "",
  delay = 0,
  enableParallax = true,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax subtle offset: saat masuk dari bawah bergerak -25px, saat scroll ke atas +25px
  const yParallax = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);

  if (shouldReduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div style={enableParallax ? { y: yParallax } : undefined}>
        {children}
      </motion.div>
    </motion.section>
  );
}

interface AnimatedObjectProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedObject({
  children,
  className = "",
  delay = 0.1,
}: AnimatedObjectProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
