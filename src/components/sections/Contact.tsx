"use client";

import { useState, useRef, useEffect } from "react";
import { SectionTransition, AnimatedObject } from "@/components/motion/Transitions";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "ismailgilangm@gmail.com";
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const onCopy = () => {
    navigator.clipboard?.writeText(email).catch(() => undefined);
    setCopied(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionTransition id="contact" className="bg-tertiary text-white py-16 sm:py-24 lg:py-30 text-center" aria-labelledby="ct-h">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center">
        <AnimatedObject delay={0.1}>
          <h2 id="ct-h" className="font-display font-semibold text-4xl sm:text-6xl lg:text-7xl leading-[0.95] max-w-[20ch] mx-auto text-balance">
            Let's build something exceptional together.
          </h2>
          <p className="mt-6 max-w-[36rem] mx-auto text-[#E2EBE5] text-lg sm:text-xl leading-relaxed">
            Have a project in mind, need architectural guidance, or looking to scale your engineering team? I typically respond within 24 hours.
          </p>
        </AnimatedObject>
        <AnimatedObject delay={0.2}>
          <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center mt-10">
            <a
              className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl tracking-tight underline underline-offset-8 decoration-3 decoration-secondary hover:text-secondary transition-colors"
              href={`mailto:${email}`}
            >
              {email}
            </a>
            <button
              className="inline-flex items-center justify-center font-body font-semibold text-base px-6 py-3 rounded-full border-2 border-white text-white bg-transparent hover:bg-white hover:text-tertiary transition-colors cursor-pointer"
              type="button"
              onClick={onCopy}
              aria-live="polite"
            >
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
        </AnimatedObject>
      </div>
    </SectionTransition>
  );
}
