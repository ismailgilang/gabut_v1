"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Tech Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#services", label: "Services" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("alpinejs").then(({ default: Alpine }) => {
        const win = window as unknown as { Alpine?: typeof Alpine };
        if (!win.Alpine) {
          win.Alpine = Alpine;
          Alpine.start();
        }
        if (navRef.current) {
          Alpine.initTree(navRef.current);
        }
      });
    }
  }, []);

  return (
    <header
      ref={navRef}
      {...{
        "x-data": "{ mobileOpen: false, scrolled: false }",
        "x-init": "window.addEventListener('scroll', () => { scrolled = window.scrollY > 8 })",
        "x-bind:class": "scrolled ? 'bg-neutral/95 shadow-sm border-b border-[#3A332E]' : 'bg-neutral/90 border-b border-[#3A332E]'",
      }}
      className="sticky top-0 z-40 backdrop-blur-md text-on-dark transition-colors duration-200"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 h-[62px] flex items-center justify-between gap-6">
        <a
          className="font-display font-bold text-lg tracking-tight text-on-dark hover:text-secondary transition-colors"
          href="#top"
        >
          Ismail Gilang M.
        </a>
        <nav
          aria-label="Main"
          {...{
            "x-bind:class": "mobileOpen ? 'flex' : 'hidden md:flex'",
          }}
          className="md:static absolute top-[62px] left-0 right-0 bg-neutral/95 md:bg-transparent border-b md:border-b-0 border-[#3A332E] p-6 md:p-0 flex-col md:flex-row gap-6 md:items-center"
        >
          <ul className="flex flex-col md:flex-row gap-5 md:gap-6.5 list-none p-0 m-0">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...{
                    "x-on:click": "mobileOpen = false",
                  }}
                  className="text-[0.95rem] text-dim-dark hover:text-on-dark transition-colors py-1.5 border-b-2 border-transparent hover:border-secondary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <a
            className="inline-flex items-center justify-center font-body text-[0.95rem] font-semibold px-4.5 py-2 rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-neutral transition-colors cursor-pointer"
            href="#contact"
          >
            Get in touch
          </a>
          <button
            className="md:hidden flex items-center justify-center p-2 text-on-dark text-xl cursor-pointer"
            aria-label="Toggle menu"
            {...{
              "x-on:click": "mobileOpen = !mobileOpen",
              "x-text": "mobileOpen ? '✕' : '☰'",
            }}
          >
            ☰
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-secondary"
        style={{ scaleX: reduced ? scrollYProgress : progress }}
      />
    </header>
  );
}
